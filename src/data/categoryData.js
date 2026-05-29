export const categories = [
  { slug: 'paper-review', name: '文献解读', color: '#8b5cf6' },
  { slug: 'vibe-coding', name: 'Vibe Coding 产品', color: '#06b6d4' },
  { slug: 'thoughts', name: '思考感悟', color: '#f59e0b' },
  { slug: 'tech-notes', name: '技术笔记', color: '#10b981' },
]

export function getCategoryBySlug(slug) {
  return categories.find(c => c.slug === slug) || null
}

export function getCategoryName(slug) {
  const cat = getCategoryBySlug(slug)
  return cat ? cat.name : '未分类'
}

export function getCategoryColor(slug) {
  const cat = getCategoryBySlug(slug)
  return cat ? cat.color : '#94a3b8'
}
