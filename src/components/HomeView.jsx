import { aboutData } from '../data/aboutData'

function HomeView() {
  return (
    <section className="home-view">
      <div className="home-hero">
        <div className="home-avatar">
          <img src={aboutData.avatar} alt={aboutData.name} />
        </div>
        <h2>{aboutData.name}</h2>
        <p className="home-bio">{aboutData.bio}</p>
        <div className="home-social">
          {aboutData.social.map((s) => (
            <a key={s.platform} href={s.url} target="_blank" rel="noreferrer" className="social-link">
              {s.platform === 'GitHub' ? '🐙' : '✉️'} {s.platform}
            </a>
          ))}
        </div>
      </div>

      <div className="home-nav-grid">
        <a href="#/about" className="home-nav-card">
          <span className="home-nav-icon">👤</span>
          <span className="home-nav-title">关于我</span>
          <span className="home-nav-desc">个人介绍与技术栈</span>
        </a>
        <a href="#/blog" className="home-nav-card">
          <span className="home-nav-icon">📝</span>
          <span className="home-nav-title">博客</span>
          <span className="home-nav-desc">文章与思考记录</span>
        </a>
        <a href="#/diary" className="home-nav-card">
          <span className="home-nav-icon">📖</span>
          <span className="home-nav-title">学习日记</span>
          <span className="home-nav-desc">每日学习记录</span>
        </a>
        <a href="#/leetcode" className="home-nav-card">
          <span className="home-nav-icon">💻</span>
          <span className="home-nav-title">刷题记录</span>
          <span className="home-nav-desc">LeetCode 数据统计</span>
        </a>
        <a href="#/plan" className="home-nav-card">
          <span className="home-nav-icon">📅</span>
          <span className="home-nav-title">训练计划</span>
          <span className="home-nav-desc">100天刷题与英语训练</span>
        </a>
      </div>
    </section>
  )
}

export default HomeView
