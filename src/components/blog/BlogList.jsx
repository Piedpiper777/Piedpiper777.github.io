import { useMemo, useState } from 'react'
import { allTags, archiveMap, searchPosts } from '../../data/blogRuntime'

function BlogList() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('all')

  const filteredPosts = useMemo(() => {
    const searched = searchPosts(query)
    if (tag === 'all') return searched
    return searched.filter((post) => post.tags.includes(tag))
  }, [query, tag])

  return (
    <section className="blog-view">
      <div className="blog-header">
        <h2>📝 博客</h2>
        <a className="rss-link" href="./rss.xml" target="_blank" rel="noreferrer">RSS</a>
      </div>

      <div className="blog-toolbar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索标题 / 标签 / 摘要"
          aria-label="搜索文章"
        />
        <select value={tag} onChange={(e) => setTag(e.target.value)} aria-label="标签筛选">
          <option value="all">全部标签</option>
          {allTags.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <h3>没有匹配文章</h3>
          <p>换一个关键词或标签试试。</p>
        </div>
      ) : (
        <ul className="post-list">
          {filteredPosts.map((post) => (
            <li key={post.slug} className="post-card" onClick={() => { window.location.hash = `#/blog/${encodeURIComponent(post.slug)}` }}>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <div className="post-meta">{post.date} · {post.tags.join(' / ')}</div>
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
    </section>
  )
}

export default BlogList
