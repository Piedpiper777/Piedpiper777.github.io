import { useState } from 'react'
import { planData } from '../data/planData'
import WeekDetail from './WeekDetail'

function PlanView() {
  const [selectedWeekId, setSelectedWeekId] = useState(1)

  const selectedWeek = planData.weeks.find(w => w.id === selectedWeekId)

  return (
    <div className="plan-view">
      <aside className="sidebar">
        {planData.stages.map(stage => (
          <div key={stage.id} className="stage-section">
            <div className="stage-title">{stage.name}</div>
            <ul className="week-list">
              {planData.weeks
                .filter(week => week.stageId === stage.id)
                .map(week => (
                  <li 
                    key={week.id} 
                    className={`week-item ${week.id === selectedWeekId ? 'active' : ''}`}
                    onClick={() => setSelectedWeekId(week.id)}
                  >
                    <div className="week-item-title">{week.title}</div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </aside>

      <div className="main-content">
        {selectedWeek && <WeekDetail week={selectedWeek} />}
      </div>
    </div>
  )
}

export default PlanView
