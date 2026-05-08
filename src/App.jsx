import { useState } from 'react'
import { planData } from './data/planData'
import PlanView from './components/PlanView'
import NotesView from './components/NotesView'

function App() {
  const [activeTab, setActiveTab] = useState('plan')

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1>{planData.title}</h1>
          <p>{planData.startDate} 至 {planData.endDate} · 共 {planData.totalDays} 天</p>
          <nav>
            <button 
              className={`nav-btn ${activeTab === 'plan' ? 'active' : ''}`} 
              onClick={() => setActiveTab('plan')}
            >
              <span>📅 训练计划</span>
            </button>
            <button 
              className={`nav-btn ${activeTab === 'notes' ? 'active' : ''}`} 
              onClick={() => setActiveTab('notes')}
            >
              <span>📝 学习记录</span>
            </button>
          </nav>
        </div>
      </header>

      <main>
        {activeTab === 'plan' && <PlanView />}
        {activeTab === 'notes' && <NotesView />}
      </main>
    </div>
  )
}

export default App
