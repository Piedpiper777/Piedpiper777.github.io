import { useState, useEffect } from 'react'

function LeetcodeView() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cacheKey = 'leetcode-cache'
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      const { data: cachedData, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        setData(cachedData)
        setLoading(false)
        return
      }
    }

    fetchLeetcodeData()
  }, [])

  async function fetchLeetcodeData() {
    try {
      setLoading(true)
      const username = 'Piedpiper777'
      const query = `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
          recentAcSubmissionList(username: $username, limit: 10) {
            title
            timestamp
          }
        }
      `
      const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { username } })
      })
      const result = await res.json()
      if (result.errors) throw new Error(result.errors[0].message)

      const leetcodeData = result.data
      setData(leetcodeData)
      localStorage.setItem(cacheKey, JSON.stringify({ data: leetcodeData, timestamp: Date.now() }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <section className="leetcode-view"><div className="loading">加载中...</div></section>
  if (error) return <section className="leetcode-view"><div className="error-state">加载失败: {error}</div></section>
  if (!data?.matchedUser) return <section className="leetcode-view"><div className="empty-state"><h3>未找到用户数据</h3></div></section>

  const stats = data.matchedUser.submitStats.acSubmissionNum
  const easy = stats.find(s => s.difficulty === 'Easy')?.count || 0
  const medium = stats.find(s => s.difficulty === 'Medium')?.count || 0
  const hard = stats.find(s => s.difficulty === 'Hard')?.count || 0
  const all = stats.find(s => s.difficulty === 'All')?.count || 0
  const total = easy + medium + hard

  return (
    <section className="leetcode-view">
      <h2>💻 LeetCode 刷题记录</h2>

      <div className="leetcode-stats-grid">
        <div className="stat-card stat-easy">
          <span className="stat-label">Easy</span>
          <span className="stat-value">{easy}</span>
        </div>
        <div className="stat-card stat-medium">
          <span className="stat-label">Medium</span>
          <span className="stat-value">{medium}</span>
        </div>
        <div className="stat-card stat-hard">
          <span className="stat-label">Hard</span>
          <span className="stat-value">{hard}</span>
        </div>
      </div>

      <div className="leetcode-total">
        总计 <strong>{all}</strong> 题已解决
      </div>

      <div className="difficulty-bars">
        <div className="diff-bar-row">
          <span className="diff-label">Easy</span>
          <div className="diff-bar-track">
            <div className="diff-bar-fill diff-easy" style={{ width: total ? `${(easy/total)*100}%` : '0%' }}></div>
          </div>
          <span className="diff-pct">{total ? Math.round((easy/total)*100) : 0}%</span>
        </div>
        <div className="diff-bar-row">
          <span className="diff-label">Medium</span>
          <div className="diff-bar-track">
            <div className="diff-bar-fill diff-medium" style={{ width: total ? `${(medium/total)*100}%` : '0%' }}></div>
          </div>
          <span className="diff-pct">{total ? Math.round((medium/total)*100) : 0}%</span>
        </div>
        <div className="diff-bar-row">
          <span className="diff-label">Hard</span>
          <div className="diff-bar-track">
            <div className="diff-bar-fill diff-hard" style={{ width: total ? `${(hard/total)*100}%` : '0%' }}></div>
          </div>
          <span className="diff-pct">{total ? Math.round((hard/total)*100) : 0}%</span>
        </div>
      </div>

      {data.recentAcSubmissionList?.length > 0 && (
        <div className="recent-submissions">
          <h3>最近通过</h3>
          <ul>
            {data.recentAcSubmissionList.map((sub, i) => (
              <li key={i} className="submission-item">
                <span className="submission-check">✅</span>
                <span className="submission-title">{sub.title}</span>
                <span className="submission-date">{new Date(Number(sub.timestamp) * 1000).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default LeetcodeView
