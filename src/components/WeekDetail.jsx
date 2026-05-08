function WeekDetail({ week }) {
  return (
    <div className="week-detail">
      <h2>{week.title}</h2>

      <div className="detail-section">
        <h3>🎯 本周目标</h3>
        <ul>
          {week.goals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>

      {week.problems.length > 0 && (
        <div className="detail-section">
          <h3>📚 重点题型</h3>
          <ul>
            {week.problems.map((problem, index) => (
              <li key={index}>{problem}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="detail-section">
        <h3>📊 本周目标量</h3>
        <div className="target-grid">
          {week.targets.newProblems && (
            <div className="target-card">
              <div className="label">新题</div>
              <div className="value">{week.targets.newProblems}</div>
            </div>
          )}
          {week.targets.reviewProblems && (
            <div className="target-card">
              <div className="label">复刷</div>
              <div className="value">{week.targets.reviewProblems}</div>
            </div>
          )}
          {week.targets.timedTraining && (
            <div className="target-card">
              <div className="label">限时训练</div>
              <div className="value">{week.targets.timedTraining}</div>
            </div>
          )}
          {week.targets.mockExams && (
            <div className="target-card">
              <div className="label">笔试模拟</div>
              <div className="value">{week.targets.mockExams}</div>
            </div>
          )}
          {week.targets.englishMock && (
            <div className="target-card">
              <div className="label">英文模拟</div>
              <div className="value">{week.targets.englishMock}</div>
            </div>
          )}
        </div>
      </div>

      <div className="detail-section">
        <h3>🗣️ 英语目标</h3>
        <div className="english-goal">
          {week.englishGoal}
        </div>
      </div>

      {week.notes && (
        <div className="detail-section notes-section">
          <h3>📌 备注</h3>
          <p>{week.notes}</p>
        </div>
      )}
    </div>
  )
}

export default WeekDetail
