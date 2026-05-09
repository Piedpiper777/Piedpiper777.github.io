import { useEffect, useState } from 'react'
import BlogList from './BlogList'
import PostDetail from './PostDetail'

function getCurrentSlug() {
  const hash = window.location.hash || '#/blog'
  const match = hash.match(/^#\/blog\/(.+)$/)
  if (!match) return null
  try {
    return decodeURIComponent(match[1])
  } catch {
    return null
  }
}

function BlogView() {
  const [slug, setSlug] = useState(getCurrentSlug)

  useEffect(() => {
    const onHashChange = () => setSlug(getCurrentSlug())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return slug ? <PostDetail slug={slug} /> : <BlogList />
}

export default BlogView
