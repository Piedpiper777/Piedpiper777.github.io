# Blog Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace localStorage-based notes with a Markdown-driven static blog that supports list/detail pages, tags, search, TOC, prev/next links, and RSS on GitHub Pages.

**Architecture:** Build-time content generation scans `posts/*.md`, validates frontmatter, and emits JSON artifacts plus `public/rss.xml`. The React app switches to hash-based blog routes and reads generated JSON for list/detail rendering. Search runs client-side via Fuse.js over generated index data.

**Tech Stack:** React 18, Vite 5, Node ESM scripts, gray-matter, markdown-it, markdown-it-anchor, markdown-it-highlightjs, fuse.js

---

## File Structure and Responsibilities

- **Create:** `posts/2026-05-12-week1-review.md` — initial sample post content.
- **Create:** `posts/2026-05-19-week2-review.md` — second post to validate prev/next navigation.
- **Create:** `scripts/generate-blog.mjs` — scans markdown posts, validates schema, builds JSON and RSS artifacts.
- **Create:** `src/.generated/.gitkeep` — keeps generated folder in repo.
- **Create:** `src/data/blogRuntime.js` — typed runtime helpers for sorting/filtering/search input prep.
- **Create:** `src/components/blog/BlogView.jsx` — route shell for list vs detail rendering.
- **Create:** `src/components/blog/BlogList.jsx` — list page with tag filter + search box + archive grouping.
- **Create:** `src/components/blog/PostDetail.jsx` — detail page HTML render + TOC + prev/next.
- **Create:** `src/components/blog/TableOfContents.jsx` — reusable TOC renderer.
- **Create:** `src/components/blog/PostPager.jsx` — previous/next post navigation.
- **Modify:** `src/App.jsx` — replace notes tab with blog route entry.
- **Modify:** `src/index.css` — add blog list/detail/search/TOC styles.
- **Modify:** `package.json` — add dependencies and hook generator into build pipeline.
- **Modify:** `README.md` — document post authoring and build outputs.

---

### Task 1: Set up blog dependencies and build pipeline

**Files:**
- Modify: `package.json`
- Create: `src/.generated/.gitkeep`

- [ ] **Step 1: Write the failing test (build command without generator script)**

```bash
npm run build
```

Expected: PASS today, but no generated files for blog features exist yet.

- [ ] **Step 2: Add blog dependencies and scripts in `package.json`**

```json
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/generate-blog.mjs",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "fuse.js": "^7.0.0",
    "gray-matter": "^4.0.3",
    "markdown-it": "^14.1.0",
    "markdown-it-anchor": "^9.2.0",
    "markdown-it-highlightjs": "^4.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

- [ ] **Step 3: Ensure generated folder exists in repo**

Create file `src/.generated/.gitkeep` with empty content.

- [ ] **Step 4: Run install and verify lockfile updates**

Run: `npm install`  
Expected: `added ... packages` and `package-lock.json` updated.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/.generated/.gitkeep
git commit -m "chore: add blog build dependencies and prebuild hook"
```

---

### Task 2: Implement Markdown ingestion and artifact generation

**Files:**
- Create: `scripts/generate-blog.mjs`
- Create: `posts/2026-05-12-week1-review.md`
- Create: `posts/2026-05-19-week2-review.md`

- [ ] **Step 1: Write the failing test (generator absent)**

Run: `node scripts/generate-blog.mjs`  
Expected: FAIL with file not found (before script creation).

- [ ] **Step 2: Add two sample markdown posts with frontmatter**

```md
---
title: "Week 1 复盘：数组与双指针"
date: "2026-05-12"
tags: ["algorithm", "week1", "review"]
summary: "记录第一周的题型、错因与改进。"
draft: false
---

## 本周完成

- 两数之和
- 三数之和

## 易错点

双指针边界处理容易漏。
```

```md
---
title: "Week 2 复盘：滑动窗口与前缀和"
date: "2026-05-19"
tags: ["algorithm", "week2", "window"]
summary: "总结窗口收缩条件与前缀和哈希模板。"
draft: false
---

## 本周完成

- 无重复字符的最长子串
- 和为 K 的子数组

## 下周计划

继续链表与栈队列专题。
```

- [ ] **Step 3: Implement generator script**

```js
// scripts/generate-blog.mjs
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItHighlightjs from 'markdown-it-highlightjs'

const ROOT = process.cwd()
const POSTS_DIR = path.join(ROOT, 'posts')
const GENERATED_DIR = path.join(ROOT, 'src', '.generated')
const PUBLIC_DIR = path.join(ROOT, 'public')
const SITE_URL = 'https://piedpiper777.github.io'

const md = new MarkdownIt({ html: true, linkify: true })
md.use(markdownItAnchor)
md.use(markdownItHighlightjs)

function assertField(condition, message) {
  if (!condition) throw new Error(message)
}

function slugFromFilename(fileName) {
  const base = fileName.replace(/\.md$/, '')
  const m = base.match(/^\d{4}-\d{2}-\d{2}-(.+)$/)
  assertField(m, `Invalid post filename: ${fileName}`)
  return m[1]
}

function readPosts() {
  const files = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))
    : []
  assertField(files.length > 0, 'No markdown posts found in posts/')

  const slugSet = new Set()
  const posts = files.map((fileName) => {
    const fullPath = path.join(POSTS_DIR, fileName)
    const raw = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(raw)
    const slug = slugFromFilename(fileName)
    assertField(!slugSet.has(slug), `Duplicate slug: ${slug}`)
    slugSet.add(slug)

    assertField(typeof data.title === 'string' && data.title.trim(), `${fileName}: title is required`)
    assertField(typeof data.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(data.date), `${fileName}: date must be YYYY-MM-DD`)
    assertField(Array.isArray(data.tags), `${fileName}: tags must be an array`)
    assertField(typeof data.summary === 'string' && data.summary.trim(), `${fileName}: summary is required`)

    const draft = Boolean(data.draft)
    const tokens = md.parse(content, {})
    const toc = tokens
      .filter((t) => t.type === 'heading_open' && ['h2', 'h3'].includes(t.tag))
      .map((t, i) => ({ level: Number(t.tag.slice(1)), id: `h-${i}`, text: '' }))

    const html = md.render(content)
    const excerpt = content.replace(/\s+/g, ' ').trim().slice(0, 180)
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length

    return {
      slug,
      title: data.title,
      date: data.date,
      tags: data.tags,
      summary: data.summary,
      draft,
      excerpt,
      wordCount,
      html,
      toc
    }
  })

  return posts
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf8')
}

function writeRss(posts) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  const latest = posts.slice(0, 50)
  const items = latest
    .map((p) => `<item><title><![CDATA[${p.title}]]></title><link>${SITE_URL}/#/blog/${p.slug}</link><description><![CDATA[${p.summary}]]></description><pubDate>${new Date(p.date).toUTCString()}</pubDate><guid>${SITE_URL}/#/blog/${p.slug}</guid></item>`)
    .join('')
  const rss = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>100天刷题计划与学习记录</title><link>${SITE_URL}</link><description>学习计划与复盘博客</description>${items}</channel></rss>`
  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rss, 'utf8')
}

const posts = readPosts()
  .filter((p) => !p.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1))

const index = posts.map(({ html, toc, ...rest }) => rest)
const content = posts.map(({ slug, html, toc }) => ({ slug, html, toc }))

writeJson(path.join(GENERATED_DIR, 'posts-index.json'), index)
writeJson(path.join(GENERATED_DIR, 'posts-content.json'), content)
writeRss(posts)

console.log(`Generated blog artifacts for ${posts.length} posts`)
```

- [ ] **Step 4: Run generator and verify artifacts**

Run: `node scripts/generate-blog.mjs`  
Expected: `Generated blog artifacts for 2 posts`

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-blog.mjs posts src/.generated public/rss.xml
git commit -m "feat: generate blog index, content, and rss at build time"
```

---

### Task 3: Replace notes with blog route shell

**Files:**
- Modify: `src/App.jsx`
- Create: `src/components/blog/BlogView.jsx`

- [ ] **Step 1: Write the failing test (manual route smoke check)**

Run: `npm run dev` and open `#/blog`  
Expected: Route not found / no blog view yet.

- [ ] **Step 2: Add blog route container**

```jsx
// src/components/blog/BlogView.jsx
import BlogList from './BlogList'
import PostDetail from './PostDetail'

function BlogView() {
  const hash = window.location.hash || '#/blog'
  const postMatch = hash.match(/^#\/blog\/(.+)$/)
  const slug = postMatch ? postMatch[1] : null
  return slug ? <PostDetail slug={slug} /> : <BlogList />
}

export default BlogView
```

- [ ] **Step 3: Update `src/App.jsx` tabs**

```jsx
import { useEffect, useState } from 'react'
import { planData } from './data/planData'
import PlanView from './components/PlanView'
import BlogView from './components/blog/BlogView'

function App() {
  const [activeTab, setActiveTab] = useState(window.location.hash.startsWith('#/blog') ? 'blog' : 'plan')

  useEffect(() => {
    const onHashChange = () => {
      setActiveTab(window.location.hash.startsWith('#/blog') ? 'blog' : 'plan')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const toPlan = () => {
    window.location.hash = '#/plan'
    setActiveTab('plan')
  }
  const toBlog = () => {
    window.location.hash = '#/blog'
    setActiveTab('blog')
  }

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1>{planData.title}</h1>
          <p>{planData.startDate} 至 {planData.endDate} · 共 {planData.totalDays} 天</p>
          <nav>
            <button className={`nav-btn ${activeTab === 'plan' ? 'active' : ''}`} onClick={toPlan}><span>📅 训练计划</span></button>
            <button className={`nav-btn ${activeTab === 'blog' ? 'active' : ''}`} onClick={toBlog}><span>📝 博客</span></button>
          </nav>
        </div>
      </header>
      <main>{activeTab === 'plan' ? <PlanView /> : <BlogView />}</main>
    </div>
  )
}

export default App
```

- [ ] **Step 4: Verify route switching**

Run: `npm run dev`  
Expected: `#/plan` and `#/blog` switch correctly; no NotesView usage remains.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/components/blog/BlogView.jsx
git commit -m "feat: replace notes tab with hash-routed blog shell"
```

---

### Task 4: Build blog list with tags, archive, and search

**Files:**
- Create: `src/data/blogRuntime.js`
- Create: `src/components/blog/BlogList.jsx`

- [ ] **Step 1: Write the failing test (manual list render check)**

Run: `npm run dev`, open `#/blog`  
Expected: empty or missing component before implementation.

- [ ] **Step 2: Add runtime helpers**

```js
// src/data/blogRuntime.js
import Fuse from 'fuse.js'
import postsIndex from '../.generated/posts-index.json'

export const sortedPosts = [...postsIndex].sort((a, b) => (a.date < b.date ? 1 : -1))
export const allTags = [...new Set(sortedPosts.flatMap((p) => p.tags))].sort()
export const archiveMap = sortedPosts.reduce((acc, p) => {
  const key = p.date.slice(0, 7)
  acc[key] = acc[key] || []
  acc[key].push(p)
  return acc
}, {})

const fuse = new Fuse(sortedPosts, {
  keys: ['title', 'summary', 'tags', 'excerpt'],
  threshold: 0.35
})

export function searchPosts(query) {
  if (!query.trim()) return sortedPosts
  return fuse.search(query).map((r) => r.item)
}
```

- [ ] **Step 3: Implement list UI**

```jsx
// src/components/blog/BlogList.jsx
import { useMemo, useState } from 'react'
import { allTags, archiveMap, searchPosts } from '../../data/blogRuntime'

function BlogList() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('all')

  const posts = useMemo(() => {
    const searched = searchPosts(query)
    return tag === 'all' ? searched : searched.filter((p) => p.tags.includes(tag))
  }, [query, tag])

  return (
    <div className="blog-view">
      <h2>📝 博客</h2>
      <div className="blog-toolbar">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索标题/标签/摘要" />
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="all">全部标签</option>
          {allTags.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      {posts.length === 0 ? <p className="empty-state">没有匹配文章</p> : (
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.slug} className="post-card" onClick={() => (window.location.hash = `#/blog/${p.slug}`)}>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <div className="post-meta">{p.date} · {p.tags.join(' / ')}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="archive-block">
        <h3>归档</h3>
        {Object.entries(archiveMap).map(([month, list]) => (
          <div key={month}>{month} ({list.length})</div>
        ))}
      </div>
    </div>
  )
}

export default BlogList
```

- [ ] **Step 4: Verify search/filter**

Run: `npm run dev`  
Expected: keyword search and tag filter both take effect.

- [ ] **Step 5: Commit**

```bash
git add src/data/blogRuntime.js src/components/blog/BlogList.jsx
git commit -m "feat: add blog list with search, tags, and archive"
```

---

### Task 5: Implement post detail, TOC, and previous/next navigation

**Files:**
- Create: `src/components/blog/TableOfContents.jsx`
- Create: `src/components/blog/PostPager.jsx`
- Create: `src/components/blog/PostDetail.jsx`

- [ ] **Step 1: Write the failing test (detail route check)**

Run: open `#/blog/week2-review`  
Expected: article detail not rendered before implementation.

- [ ] **Step 2: Create TOC and pager components**

```jsx
// src/components/blog/TableOfContents.jsx
function TableOfContents({ toc }) {
  if (!toc?.length) return null
  return (
    <aside className="toc">
      <h4>目录</h4>
      <ul>{toc.map((item, idx) => <li key={idx} className={`lv-${item.level}`}>{item.text || `标题 ${idx + 1}`}</li>)}</ul>
    </aside>
  )
}
export default TableOfContents
```

```jsx
// src/components/blog/PostPager.jsx
function PostPager({ prevPost, nextPost }) {
  return (
    <div className="post-pager">
      {prevPost ? <button onClick={() => (window.location.hash = `#/blog/${prevPost.slug}`)}>← {prevPost.title}</button> : <span />}
      {nextPost ? <button onClick={() => (window.location.hash = `#/blog/${nextPost.slug}`)}>{nextPost.title} →</button> : <span />}
    </div>
  )
}
export default PostPager
```

- [ ] **Step 3: Implement detail page**

```jsx
// src/components/blog/PostDetail.jsx
import postsContent from '../../.generated/posts-content.json'
import { sortedPosts } from '../../data/blogRuntime'
import TableOfContents from './TableOfContents'
import PostPager from './PostPager'

function PostDetail({ slug }) {
  const post = sortedPosts.find((p) => p.slug === slug)
  const content = postsContent.find((p) => p.slug === slug)
  if (!post || !content) {
    return <div className="empty-state">文章不存在</div>
  }

  const idx = sortedPosts.findIndex((p) => p.slug === slug)
  const prevPost = idx > 0 ? sortedPosts[idx - 1] : null
  const nextPost = idx < sortedPosts.length - 1 ? sortedPosts[idx + 1] : null

  return (
    <article className="post-detail">
      <button className="back-btn" onClick={() => (window.location.hash = '#/blog')}>← 返回列表</button>
      <h1>{post.title}</h1>
      <div className="post-meta">{post.date} · {post.tags.join(' / ')}</div>
      <div className="post-layout">
        <div className="post-content" dangerouslySetInnerHTML={{ __html: content.html }} />
        <TableOfContents toc={content.toc} />
      </div>
      <PostPager prevPost={prevPost} nextPost={nextPost} />
    </article>
  )
}

export default PostDetail
```

- [ ] **Step 4: Verify detail UX**

Run: `npm run dev` and open both sample posts  
Expected: article HTML displays, TOC visible, prev/next works.

- [ ] **Step 5: Commit**

```bash
git add src/components/blog/TableOfContents.jsx src/components/blog/PostPager.jsx src/components/blog/PostDetail.jsx
git commit -m "feat: add post detail page with toc and prev-next navigation"
```

---

### Task 6: Styling, docs, and final verification

**Files:**
- Modify: `src/index.css`
- Modify: `README.md`

- [ ] **Step 1: Write the failing test (unstyled blog pages)**

Run: `npm run dev`  
Expected: list/detail look unstyled or inconsistent before CSS additions.

- [ ] **Step 2: Add blog styles in `src/index.css`**

```css
.blog-view,.post-detail{background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-xl);padding:1.5rem}
.blog-toolbar{display:flex;gap:.75rem;margin-bottom:1rem;flex-wrap:wrap}
.post-list{list-style:none;display:grid;gap:.75rem}
.post-card{padding:1rem;border:1px solid var(--border);border-radius:var(--radius-lg);cursor:pointer;background:var(--bg-secondary)}
.post-layout{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:1.25rem}
.toc{position:sticky;top:96px;align-self:start;background:var(--bg-secondary);border:1px solid var(--border);border-radius:var(--radius-lg);padding:.75rem}
.post-pager{display:flex;justify-content:space-between;gap:1rem;margin-top:1.5rem}
@media (max-width: 900px){.post-layout{grid-template-columns:1fr}.toc{position:static}}
```

- [ ] **Step 3: Update README blog authoring section**

```md
## 博客写作

1. 在 `posts/` 下新增 `YYYY-MM-DD-slug.md`
2. 填写 frontmatter：`title` `date` `tags` `summary` `draft`
3. 执行 `npm run build` 自动生成：
   - `src/.generated/posts-index.json`
   - `src/.generated/posts-content.json`
   - `dist/rss.xml`
```

- [ ] **Step 4: Run final verification**

Run:

```bash
npm run build
git --no-pager status --short
```

Expected:
- build 成功
- 产物包含 `dist/rss.xml`
- 工作区仅包含预期改动

- [ ] **Step 5: Commit**

```bash
git add src/index.css README.md src/.generated scripts posts public/rss.xml src/components/blog src/data/blogRuntime.js src/App.jsx
git commit -m "feat: upgrade notes to static markdown blog with search toc pager rss"
```

---

## Spec Coverage Self-Check

- Markdown 驱动内容：Task 2
- 博客列表/详情：Task 3, 4, 5
- 标签/搜索：Task 4
- TOC：Task 5
- 上一篇/下一篇：Task 5
- RSS：Task 2 + Task 6 验证
- 替换学习记录：Task 3
- README 更新：Task 6

## Placeholder Scan Self-Check

- No TODO/TBD placeholders
- Every code step includes concrete snippets
- Commands include expected behavior

## Type/Name Consistency Self-Check

- Generated data files: `posts-index.json`, `posts-content.json`
- Runtime names: `sortedPosts`, `searchPosts`, `PostDetail`, `BlogList`
- Route shape: `#/blog` and `#/blog/:slug`
