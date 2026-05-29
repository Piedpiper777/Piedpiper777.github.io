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

  // Remove old deployment artifacts
  for (const name of ARTIFACTS) {
    const full = path.join(ROOT, name)
    if (fs.existsSync(full)) {
      fs.rmSync(full, { recursive: true, force: true })
    }
  }

  // Copy dist to root
  for (const entry of fs.readdirSync(DIST)) {
    fs.cpSync(path.join(DIST, entry), path.join(ROOT, entry), { recursive: true })
  }

  // Rename index-dev.html to index.html for GitHub Pages
  const devHtml = path.join(ROOT, 'index-dev.html')
  const mainHtml = path.join(ROOT, 'index.html')
  if (fs.existsSync(devHtml)) {
    fs.renameSync(devHtml, mainHtml)
  }

  // .nojekyll for GitHub Pages
  fs.writeFileSync(path.join(ROOT, '.nojekyll'), '')

  console.log('Deployed dist/ to root for GitHub Pages.')
  console.log('Source entry: index-dev.html')
}

main()
