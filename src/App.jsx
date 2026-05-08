import { useEffect, useState } from 'react'
import { planData } from './data/planData'
import PlanView from './components/PlanView'
import BlogView from './components/blog/BlogView'

function App() {
  const getTabFromHash = () => {
    const hash = window.location.hash || '#/plan'
    return hash.startsWith('#/blog') ? 'blog' : 'plan'
  }

  const [activeTab, setActiveTab] = useState(getTabFromHash)

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '#/plan'
    }
    const onHashChange = () => setActiveTab(getTabFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const switchToPlan = () => {
    window.location.hash = '#/plan'
    setActiveTab('plan')
  }

  const switchToBlog = () => {
    window.location.hash = '#/blog'
    setActiveTab('blog')
  }

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1>{planData.title}</h1>
          <p>{planData.startDate} 至 {planData.endDate} · 共 {planData.totalDays} 天</p>
          <nav>
            <button 
              className={`nav-btn ${activeTab === 'plan' ? 'active' : ''}`} 
              onClick={switchToPlan}
            >
              <span>📅 训练计划</span>
            </button>
            <button 
              className={`nav-btn ${activeTab === 'blog' ? 'active' : ''}`} 
              onClick={switchToBlog}
            >
              <span>📝 博客</span>
            </button>
          </nav>
        </div>
      </header>

      <main>
        {activeTab === 'plan' && <PlanView />}
        {activeTab === 'blog' && <BlogView />}
      </main>
    </div>
  )
}

export default App
