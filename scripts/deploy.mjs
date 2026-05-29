import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DIST = path.join(ROOT, 'dist')

// Deployment artifacts to clean before copying dist
const ARTIFACTS = ['assets', 'index.html', 'rss.xml', '.nojekyll']

function main() {
  if (!fs.existsSync(DIST)) {
    console.error('dist/ not found. Run `npm run build` first.')
    process.exit(1)
  }

  // Save source index-dev.html
  const sourceDevHtml = path.join(ROOT, 'index-dev.html')
  let savedSource = null
  if (fs.existsSync(sourceDevHtml)) {
    savedSource = fs.readFileSync(sourceDevHtml, 'utf8')
  }

  // Remove old deployment artifacts
  for (const name of ARTIFACTS) {
    const full = path.join(ROOT, name)
    if (fs.existsSync(full)) {
      fs.rmSync(full, { recursive: true, force: true })
    }
  }

  // Copy dist to root (overwrites index-dev.html with built version)
  for (const entry of fs.readdirSync(DIST)) {
    fs.cpSync(path.join(DIST, entry), path.join(ROOT, entry), { recursive: true })
  }

  // Rename dist's index-dev.html to index.html for GitHub Pages
  const devHtml = path.join(ROOT, 'index-dev.html')
  const mainHtml = path.join(ROOT, 'index.html')
  if (fs.existsSync(devHtml)) {
    fs.renameSync(devHtml, mainHtml)
  }

  // Restore source index-dev.html for development
  if (savedSource) {
    fs.writeFileSync(sourceDevHtml, savedSource)
  }

  // .nojekyll for GitHub Pages
  fs.writeFileSync(path.join(ROOT, '.nojekyll'), '')

  console.log('Deployed dist/ to root for GitHub Pages.')
}

main()
