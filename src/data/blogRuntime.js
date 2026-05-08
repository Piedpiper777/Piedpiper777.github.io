import Fuse from 'fuse.js'
import postsIndex from '../.generated/posts-index.json'

export const sortedPosts = [...postsIndex].sort((a, b) => (a.date < b.date ? 1 : -1))

export const allTags = [...new Set(sortedPosts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b))

export const archiveMap = sortedPosts.reduce((acc, post) => {
  const monthKey = post.date.slice(0, 7)
  if (!acc[monthKey]) acc[monthKey] = []
  acc[monthKey].push(post)
  return acc
}, {})

const searchEngine = new Fuse(sortedPosts, {
  keys: ['title', 'summary', 'tags', 'excerpt'],
  threshold: 0.35,
  includeScore: false
})

export function searchPosts(query) {
  const normalized = query.trim()
  if (!normalized) return sortedPosts
  return searchEngine.search(normalized).map((result) => result.item)
}

export function getAdjacentPosts(slug) {
  const index = sortedPosts.findIndex((p) => p.slug === slug)
  if (index === -1) return { prevPost: null, nextPost: null }
  return {
    prevPost: index > 0 ? sortedPosts[index - 1] : null,
    nextPost: index < sortedPosts.length - 1 ? sortedPosts[index + 1] : null
  }
}
