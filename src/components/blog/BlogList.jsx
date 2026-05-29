import { useMemo, useState } from 'react'
import { sortedPosts, allTags, archiveMap, weekArchiveMap, searchPosts } from '../../data/blogRuntime'
import { categories, getCategoryColor } from '../../data/categoryData'
import BlogSearch from './BlogSearch'
import CategorySidebar from './CategorySidebar'

function highlightText(text, query) {
  const normalized = query.trim()
  if (!normalized) return text
  const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`(${escaped})`, 'gi')
  const parts = String(text).split(re)
  const lower = normalized.toLowerCase()
  return parts.map((part, idx) => (
    part.toLowerCase() === lower ? <mark key={`${part}-${idx}`}>{part}</mark> : <span key={`${part}-${idx}`}>{part}</span>
  ))
}

function BlogList() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('all')
  const [category, setCategory] = useState('all')
  const hasAnyPosts = sortedPosts.length > 0

  const categoryCounts = useMemo(() => {
    const counts = { all: sortedPosts.length }
    categories.forEach(c => { counts[c.slug] = 0 })
    sortedPosts.forEach(p => {
      if (p.category && counts[p.category] !== undefined) {
        counts[p.category]++
      }
    })
    return counts
  }, [])

  const filteredPosts = useMemo(() => {
    let result = searchPosts(query)
    if (tag !== 'all') {
      result = result.filter(post => post.tags.includes(tag))
    }
    if (category !== 'all') {
      result = result.filter(post => post.category === category)
    }
    return result
  }, [query, tag, category])

  return (
    <section className="blog-view">
      <div className="blog-header">
        <h2>📝 博客</h2>
        <div className="blog-action-group">
          <a
            className="action-btn primary"
            href="https://github.com/Piedpiper777/Piedpiper777.github.io/new/gh-pages/posts"
            target="_blank"
            rel="noreferrer"
          >
            新建文章
          </a>
          <a
            className="action-btn"
            href="https://github.com/Piedpiper777/Piedpiper777.github.io/tree/gh-pages/posts/templates"
            target="_blank"
            rel="noreferrer"
          >
            模板库
          </a>
          <a className="action-btn" href="./rss.xml" target="_blank" rel="noreferrer">RSS</a>
        </div>
      </div>

      <div className="blog-layout">
        <CategorySidebar
          activeCategory={category}
          onCategoryChange={setCategory}
          categoryCounts={categoryCounts}
        />

        <div className="blog-main">
          <BlogSearch
            query={query}
            onQueryChange={setQuery}
            tag={tag}
            onTagChange={setTag}
            allTags={allTags}
          />

          {!hasAnyPosts ? (
            <div className="empty-state">
              <h3>暂无文章</h3>
              <p>请先在 posts/ 目录新增 Markdown 文章。</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="empty-state">
              <h3>没有匹配文章</h3>
              <p>换一个关键词或标签试试。</p>
            </div>
          ) : (
            <ul className="post-list">
              {filteredPosts.map((post) => (
                <li key={post.slug} className="post-card" onClick={() => { window.location.hash = `#/blog/${encodeURIComponent(post.slug)}` }}>
                  <h3>{highlightText(post.title, query)}</h3>
                  <p>{highlightText(post.summary, query)}</p>
                  <div className="post-meta">
                    {post.date} · {post.tags.join(' / ')}
                    {post.category && (
                      <span className="category-badge" style={{ backgroundColor: getCategoryColor(post.category) }}>
                        {categories.find(c => c.slug === post.category)?.name || post.category}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <section className="archive-block">
            <h3>归档</h3>
            <ul>
              {Object.entries(archiveMap).map(([month, posts]) => (
                <li key={month}>
                  <span>{month}</span>
                  <span>{posts.length} 篇</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="archive-block">
            <h3>按 Week 归档</h3>
            <ul>
              {Object.entries(weekArchiveMap).map(([week, posts]) => (
                <li key={week}>
                  <button type="button" className="archive-week-btn" onClick={() => setTag(week)}>
                    {week.replace('week', 'Week ')}
                  </button>
                  <span>{posts.length} 篇</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}

export default BlogList
