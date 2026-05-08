function TableOfContents({ toc }) {
  if (!Array.isArray(toc) || toc.length === 0) return null

  const jumpToHeading = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <aside className="toc">
      <h4>目录</h4>
      <ul>
        {toc.map((item) => (
          <li key={`${item.id}-${item.text}`} className={`lv-${item.level}`}>
            <button type="button" className="toc-link" onClick={() => jumpToHeading(item.id)}>
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default TableOfContents
