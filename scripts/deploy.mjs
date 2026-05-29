import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DIST = path.join(ROOT, 'dist')

// Deployment artifacts to clean before copying dist
const DEPLOY_ARTIFACTS = ['assets', 'rss.xml', '.nojekyll']

function cleanDeployArtifacts() {
  for (const name of DEPLOY_ARTIFACTS) {
    const fullPath = path.join(ROOT, name)
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true })
    }
  }
}

function copyDist() {
  const entries = fs.readdirSync(DIST)
  for (const entry of entries) {
    const src = path.join(DIST, entry)
    const dest = path.join(ROOT, entry)
    fs.cpSync(src, dest, { recursive: true })
  }
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.error('dist/ not found. Run `npm run build` first.')
    process.exit(1)
  }

  // Save source index.html
  const sourceIndex = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')

  cleanDeployArtifacts()
  copyDist()

  // Restore source index.html (Vite entry point for dev)
  fs.writeFileSync(path.join(ROOT, 'index.html'), sourceIndex)

  // Write .nojekyll for GitHub Pages
  fs.writeFileSync(path.join(ROOT, '.nojekyll'), '')

  console.log('Deployed dist/ to root for GitHub Pages.')
  console.log('Source index.html restored for development.')
}

main()
