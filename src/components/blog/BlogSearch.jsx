function BlogSearch({ query, onQueryChange, tag, onTagChange, allTags }) {
  return (
    <div className="blog-toolbar">
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="搜索标题 / 标签 / 摘要"
        aria-label="搜索文章"
      />
      <select value={tag} onChange={(e) => onTagChange(e.target.value)} aria-label="标签筛选">
        <option value="all">全部标签</option>
        {allTags.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}

export default BlogSearch
