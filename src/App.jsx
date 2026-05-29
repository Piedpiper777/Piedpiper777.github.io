import { useEffect, useState } from 'react'
import HomeView from './components/HomeView'
import AboutView from './components/AboutView'
import PlanView from './components/PlanView'
import BlogView from './components/blog/BlogView'
import DiaryView from './components/DiaryView'
import LeetcodeView from './components/LeetcodeView'

function getRouteFromHash() {
  const hash = window.location.hash || '#/'
  if (hash === '#/' || hash === '#') return 'home'
  if (hash.startsWith('#/about')) return 'about'
  if (hash.startsWith('#/blog')) return 'blog'
  if (hash.startsWith('#/diary')) return 'diary'
  if (hash.startsWith('#/leetcode')) return 'leetcode'
  if (hash.startsWith('#/plan')) return 'plan'
  return 'home'
}

const navItems = [
  { key: 'home', hash: '#/', label: '🏠 首页' },
  { key: 'about', hash: '#/about', label: '👤 关于我' },
  { key: 'blog', hash: '#/blog', label: '📝 博客' },
  { key: 'diary', hash: '#/diary', label: '📖 学习日记' },
  { key: 'leetcode', hash: '#/leetcode', label: '💻 刷题记录' },
  { key: 'plan', hash: '#/plan', label: '📅 训练计划' },
]

function App() {
  const [route, setRoute] = useState(getRouteFromHash)

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '#/'
    }
    const onHashChange = () => setRoute(getRouteFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1 onClick={() => { window.location.hash = '#/' }} style={{ cursor: 'pointer' }}>Pied Piper</h1>
          <nav>
            {navItems.map((item) => (
              <button
                key={item.key}
                className={`nav-btn ${route === item.key ? 'active' : ''}`}
                onClick={() => { window.location.hash = item.hash }}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {route === 'home' && <HomeView />}
        {route === 'about' && <AboutView />}
        {route === 'plan' && <PlanView />}
        {route === 'blog' && <BlogView />}
        {route === 'diary' && <DiaryView />}
        {route === 'leetcode' && <LeetcodeView />}
      </main>
    </div>
  )
}

export default App
