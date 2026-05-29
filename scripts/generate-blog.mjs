import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItHighlightjs from 'markdown-it-highlightjs'

const ROOT = process.cwd()
const POSTS_DIR = path.join(ROOT, 'posts')
const DIARY_DIR = path.join(ROOT, 'diary')
const GENERATED_DIR = path.join(ROOT, 'src', '.generated')
const PUBLIC_DIR = path.join(ROOT, 'public')
const SITE_URL = 'https://piedpiper777.github.io'

function fail(message) {
  throw new Error(message)
}

function getSlugFromFileName(fileName) {
  const m = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/)
  if (!m) fail(`Invalid filename: ${fileName}. Expected YYYY-MM-DD-slug.md`)
  return { dateFromName: m[1], slug: m[2] }
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
}

function createMarkdownEngine() {
  const md = new MarkdownIt({ html: false, linkify: true, breaks: false })
  md.use(markdownItAnchor, {
    slugify: slugifyHeading
  })
  md.use(markdownItHighlightjs)
  return md
}

function normalizeTags(tags, fileName) {
  if (!Array.isArray(tags)) fail(`${fileName}: tags must be an array`)
  if (!tags.every((t) => typeof t === 'string')) fail(`${fileName}: every tag must be a string`)
  return tags.map((t) => t.trim()).filter(Boolean)
}

function extractToc(tokens) {
  const toc = []
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i]
    if (token.type !== 'heading_open' || !['h2', 'h3'].includes(token.tag)) continue
    const level = Number(token.tag.slice(1))
    const id = token.attrGet('id') || ''
    const inline = tokens[i + 1]
    const text = inline?.type === 'inline' ? inline.content : ''
    toc.push({ level, id, text })
  }
  return toc
}

function buildPost(fileName, md, usedSlugs, dir) {
  const fullPath = path.join(dir, fileName)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  const { dateFromName, slug } = getSlugFromFileName(fileName)

  if (usedSlugs.has(slug)) fail(`Duplicate slug detected: ${slug}`)
  usedSlugs.add(slug)

  const title = String(data.title || '').trim()
  const rawDate = data.date
  const date = rawDate instanceof Date
    ? rawDate.toISOString().slice(0, 10)
    : String(rawDate || '').trim()
  const summary = String(data.summary || '').trim()
  const tags = normalizeTags(data.tags, fileName)
  const draft = data.draft === undefined ? false : data.draft
  const category = String(data.category || '').trim()

  if (!title) fail(`${fileName}: title is required`)
  if (!date) fail(`${fileName}: date is required`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(`${fileName}: date must be YYYY-MM-DD`)
  if (date !== dateFromName) fail(`${fileName}: date must match filename date (${dateFromName})`)
  if (!summary) fail(`${fileName}: summary is required`)
  if (tags.length === 0) fail(`${fileName}: tags must contain at least one tag`)
  if (typeof draft !== 'boolean') fail(`${fileName}: draft must be boolean when provided`)

  const env = {}
  const tokens = md.parse(content, env)
  const toc = extractToc(tokens)
  const html = md.renderer.render(tokens, md.options, env)
  const excerpt = content.replace(/\s+/g, ' ').trim().slice(0, 180)
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length

  return {
    slug,
    title,
    date,
    tags,
    category,
    summary,
    draft,
    excerpt,
    wordCount,
    html,
    toc
  }
}

function buildDiaryEntry(fileName, md, usedSlugs) {
  const fullPath = path.join(DIARY_DIR, fileName)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  const { dateFromName, slug } = getSlugFromFileName(fileName)

  if (usedSlugs.has(slug)) fail(`Duplicate diary slug detected: ${slug}`)
  usedSlugs.add(slug)

  const title = String(data.title || '').trim()
  const rawDate = data.date
  const date = rawDate instanceof Date
    ? rawDate.toISOString().slice(0, 10)
    : String(rawDate || '').trim()
  const tags = Array.isArray(data.tags) ? data.tags.map(t => t.trim()).filter(Boolean) : []
  const draft = data.draft === undefined ? false : data.draft

  if (!date) fail(`${fileName}: date is required`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(`${fileName}: date must be YYYY-MM-DD`)
  if (date !== dateFromName) fail(`${fileName}: date must match filename date (${dateFromName})`)

  const env = {}
  const tokens = md.parse(content, env)
  const html = md.renderer.render(tokens, md.options, env)
  const excerpt = content.replace(/\s+/g, ' ').trim().slice(0, 180)

  return {
    slug,
    title: title || `${date} 学习日记`,
    date,
    tags,
    draft,
    excerpt,
    html
  }
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf8')
}

function writeRss(posts) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  const items = posts.slice(0, 50).map((p) => {
    const link = `${SITE_URL}/#/blog/${p.slug}`
    const pubDate = new Date(`${p.date}T00:00:00Z`).toUTCString()
    return `<item><title><![CDATA[${p.title}]]></title><link>${link}</link><guid>${link}</guid><description><![CDATA[${p.summary}]]></description><pubDate>${pubDate}</pubDate></item>`
  }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>100天刷题计划与学习记录</title>
    <link>${SITE_URL}</link>
    <description>学习计划与复盘博客</description>
    ${items}
  </channel>
</rss>`

  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rss, 'utf8')
}

function main() {
  const md = createMarkdownEngine()
  const usedSlugs = new Set()

  // --- Blog posts ---
  const postFiles = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md')).sort()
    : []

  const posts = postFiles.map((fileName) => buildPost(fileName, md, usedSlugs, POSTS_DIR))
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  const postIndex = posts.map(({ html, toc, ...meta }) => meta)
  const postContent = posts.map(({ slug, html, toc }) => ({ slug, html, toc }))

  writeJson(path.join(GENERATED_DIR, 'posts-index.json'), postIndex)
  writeJson(path.join(GENERATED_DIR, 'posts-content.json'), postContent)

  // --- Diary entries ---
  const diaryFiles = fs.existsSync(DIARY_DIR)
    ? fs.readdirSync(DIARY_DIR).filter((f) => f.endsWith('.md')).sort()
    : []

  const diaryEntries = diaryFiles.map((fileName) => buildDiaryEntry(fileName, md, usedSlugs))
    .filter((d) => !d.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  const diaryIndex = diaryEntries.map(({ html, ...meta }) => meta)
  const diaryContent = diaryEntries.map(({ slug, html }) => ({ slug, html }))

  writeJson(path.join(GENERATED_DIR, 'diary-index.json'), diaryIndex)
  writeJson(path.join(GENERATED_DIR, 'diary-content.json'), diaryContent)

  // --- RSS (blog only) ---
  writeRss(posts)

  console.log(`Generated ${posts.length} blog post(s) and ${diaryEntries.length} diary entry(ies)`)
}

main()
