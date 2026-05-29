import diaryContent from '../.generated/diary-content.json'

function DiaryDetail({ slug }) {
  const content = diaryContent.find(d => d.slug === slug)

  if (!content) {
    return (
      <section className="diary-view diary-detail">
        <button className="back-btn" onClick={() => { window.location.hash = '#/diary' }}>← 返回日记列表</button>
        <div className="empty-state"><h3>日记未找到</h3></div>
      </section>
    )
  }

  return (
    <section className="diary-view diary-detail">
      <button className="back-btn" onClick={() => { window.location.hash = '#/diary' }}>← 返回日记列表</button>
      <article className="diary-content" dangerouslySetInnerHTML={{ __html: content.html }} />
    </section>
  )
}

export default DiaryDetail
