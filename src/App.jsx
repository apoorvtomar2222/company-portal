import './App.css'
import { useState } from 'react'

function getCalendarMatrix(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const matrix = [];
  let week = Array(firstDay).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }
  return matrix;
}

function App() {
  const [taskFilter, setTaskFilter] = useState('Today');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Dummy updates
  const updates = [
    { type: 'employee', text: 'John Doe joined the Marketing team.' },
    { type: 'sheet', text: 'Google Sheet "Q3 Targets" updated by Priya.' },
    { type: 'task', text: 'New task "Prepare Q3 Report" added to Finance.' },
    { type: 'meeting', text: 'Weekly All-Hands meeting scheduled for Friday.' },
    { type: 'promotion', text: 'Amit Sharma promoted to Senior Developer.' },
  ];

  // Dummy chart data
  const chartData = [
    { label: 'Open Tickets', value: 8, color: '#eebbc3' },
    { label: 'Pending Tasks', value: 12, color: '#a3cef1' },
    { label: 'Pending Meetings', value: 4, color: '#ff595a' },
  ];

  // Calendar data
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const calendarMatrix = getCalendarMatrix(year, month);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="app-3col-layout">
      {/* Header */}
      <header className="main-header">
        <span className="header-title">Dev.to</span>
      </header>

      {/* Left Sidebar */}
      <aside className={`sidebar left-sidebar${sidebarCollapsed ? ' collapsed' : ''}`}>
        <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
          {sidebarCollapsed ? '☰' : '⟨'}
        </button>
        {!sidebarCollapsed && (
          <>
            <h3>Quick Actions</h3>
            <ul className="sidebar-list">
              <li><button className="sidebar-btn">Add Task List</button></li>
              <li><button className="sidebar-btn">Calendar Shortcut</button></li>
              <li><button className="sidebar-btn">Add Widget</button></li>
            </ul>
          </>
        )}
      </aside>

      {/* Center Column */}
      <main className="main-center">
        <section className="company-updates">
          <h2>Company Updates</h2>
          <ul className="updates-list">
            {updates.map((u, i) => (
              <li key={i} className={`update-${u.type}`}>{u.text}</li>
            ))}
          </ul>
        </section>
        <section className="widget-placeholder">
          <h3>Widgets</h3>
          <div className="sample-widget">
            <h4>Work Overview</h4>
            <div className="bar-chart">
              {chartData.map((item) => (
                <div className="bar-row" key={item.label}>
                  <span className="bar-label">{item.label}</span>
                  <div className="bar-outer">
                    <div
                      className="bar-inner"
                      style={{ width: `${item.value * 10}px`, background: item.color }}
                    >
                      <span className="bar-value">{item.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Right Sidebar */}
      <aside className="sidebar right-sidebar">
        <section className="calendar-section">
          <h3>Calendar</h3>
          <div className="calendar-mini calendar-widget">
            <div className="calendar-header">{monthNames[month]} {year}</div>
            <div className="calendar-grid">
              {weekDays.map((d) => (
                <div className="calendar-day calendar-day-label" key={d}>{d}</div>
              ))}
              {calendarMatrix.flat().map((d, i) => (
                <div
                  key={i}
                  className={`calendar-day${d === date ? ' calendar-today' : ''}${d ? '' : ' calendar-empty'}`}
                >
                  {d || ''}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="tasks-section">
          <h3>Today's Tasks</h3>
          <div className="task-section-flex">
            <div className="task-main-content">
              <div className="task-filter">
                <select className="filter-dropdown" value={taskFilter} onChange={e => setTaskFilter(e.target.value)}>
                  <option value="Today">Today</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <ul className="tasks-list">
                <li>[Update Q3 Targets]</li>
                <li>[Prepare Q3 Report]</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="hr-section">
          <h3>HR Related</h3>
          <ul>
            <li><a href="#">HR Policies</a></li>
            <li><a href="#">HR Contacts</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </section>
      </aside>
    </div>
  )
}

export default App
