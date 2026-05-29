import { useMemo, useState } from 'react'
import diaryIndex from '../.generated/diary-index.json'

function DiaryList() {
  const groupedByMonth = useMemo(() => {
    const groups = {}
    diaryIndex.forEach(entry => {
      const month = entry.date.slice(0, 7)
      if (!groups[month]) groups[month] = []
      groups[month].push(entry)
    })
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
  }, [])

  if (diaryIndex.length === 0) {
    return (
      <section className="diary-view">
        <h2>📖 学习日记</h2>
        <div className="empty-state">
          <h3>暂无日记</h3>
          <p>请在 diary/ 目录新增 Markdown 日记文件。</p>
        </div>
      </section>
    )
  }

  return (
    <section className="diary-view">
      <h2>📖 学习日记</h2>
      {groupedByMonth.map(([month, entries]) => (
        <div key={month} className="diary-month-group">
          <h3 className="diary-month-title">{month}</h3>
          <ul className="diary-list">
            {entries.map((entry) => (
              <li key={entry.slug} className="diary-card" onClick={() => { window.location.hash = `#/diary/${encodeURIComponent(entry.slug)}` }}>
                <div className="diary-card-header">
                  <span className="diary-date">{entry.date}</span>
                  {entry.tags?.length > 0 && (
                    <div className="diary-tags">
                      {entry.tags.map(t => <span key={t} className="diary-tag">{t}</span>)}
                    </div>
                  )}
                </div>
                <p className="diary-excerpt">{entry.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default DiaryList
