import React, { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [punchedIn, setPunchedIn] = useState(false);
  const [progress, setProgress] = useState(60);
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Set appropriate greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Subtle animation effect for dashboard load
    const dashboard = document.querySelector('.dashboard');
    if (dashboard) {
      dashboard.classList.add('fade-in');
    }
  }, []);

  const handlePunch = () => {
    setPunchedIn(!punchedIn);
    setProgress(punchedIn ? 60 : 90);
  };

  const goToWeeklyGraph = () => {
    navigate('/weekly-graph');
  };

  const goTostats = () => {
    navigate('/stats');
  };

  const goToSchedule = () => {
    navigate('/schedule');
  };

  const punchIn = () => {
    navigate('/punch-in');
  };

  return (
    <div className="container">
      <div className="dashboard">
        <div className="sidebar">
          <div className="logo">
            <span className="logo-icon">🏫</span>
            <h2>Faculty Portal</h2>
          </div>
          <nav>
            <a href="#" className="active">
              <i className="nav-icon">📊</i> Dashboard
            </a>
            <a href="#">
              <i className="nav-icon">👥</i> Attendance
            </a>
            <a href="#">
              <i className="nav-icon">📝</i> Leave
            </a>
            <a href="#">
              <i className="nav-icon">⚙️</i> Settings
            </a>
          </nav>
          <div className="sidebar-footer">
            <p>© 2025 Faculty System</p>
          </div>
        </div>

        <div className="main-content">
          <div className="header">
            <h1>Faculty Dashboard</h1>
            <div className="header-actions">
              <div className="date-display">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="notifications">
                <i className="notification-icon">🔔</i>
                <span className="notification-badge">3</span>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="welcome-card">
              <div className="photo">
                <img
                  src="https://megaphone.southwestern.edu/wp-content/uploads/2018/03/birger-kollmeier-910261_960_720.jpg"
                  alt="Profile"
                />
              </div>
              <div className="welcome-text">
                <h2>{greeting}, Prof. M.M. Sati!</h2>
                <p>Have a productive day at work!</p>
              </div>
              <button
                className={`punch-btn ${punchedIn ? 'punch-out' : 'punch-in'}`}
                onClick={punchIn}
              >
                {punchedIn ? 'Punch Out' : 'Punch In'}
              </button>
            </div>

            <div className="progress-section">
              <h3>Today's Progress</h3>
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{progress}%</span>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-content">
                  <h3>Hours Worked</h3>
                  <p className="stat-value">36</p>
                  <p className="stat-change positive">+2 from last week</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3>Tasks Completed</h3>
                  <p className="stat-value">12</p>
                  <p className="stat-change positive">+3 from last week</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🗓️</div>
                <div className="stat-content">
                  <h3>Leaves Taken</h3>
                  <p className="stat-value">2</p>
                  <p className="stat-change neutral">Same as last month</p>
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="calendar-section">
                <div className="section-header">
                  <h3>Calendar</h3>
                  <button className="view-all-btn">View All</button>
                </div>
                <div className="calendar">
                  <h3>{new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</h3>
                  <div className="calendar-grid">
                    {/* Days of week headers */}
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                      <div key={`${d}-${i}`} className="day-header">{d}</div>
                    ))}

                    {(() => {
                      // Get current date information
                      const currentDate = new Date();
                      const currentDay = currentDate.getDate();
                      const currentMonth = currentDate.getMonth();
                      const currentYear = currentDate.getFullYear();

                      // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
                      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

                      // Get total days in current month
                      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

                      // Create array to hold all calendar cells
                      const calendarCells = [];

                      // Add empty cells for days before the 1st of the month
                      for (let i = 0; i < firstDayOfMonth; i++) {
                        calendarCells.push(
                          <div key={`empty-${i}`} className="calendar-day empty"></div>
                        );
                      }

                      // Add cells for each day of the month
                      for (let day = 1; day <= lastDayOfMonth; day++) {
                        // Add some event indicators randomly
                        const hasEvent = day % 7 === 0 || day % 11 === 0;

                        calendarCells.push(
                          <div
                            key={`day-${day}`}
                            className={`calendar-day ${day === currentDay ? 'current' : ''} ${hasEvent ? 'has-event' : ''}`}
                          >
                            {day}
                            {hasEvent && <span className="event-dot"></span>}
                          </div>
                        );
                      }

                      return calendarCells;
                    })()}
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <div className="section-header">
                  <h3>Quick Actions</h3>
                </div>
                <div className="action-buttons">
                  <button className="action-btn">
                    <i className="action-icon">📝</i>
                    <span>Request Leave</span>
                  </button>
                  <button className="action-btn">
                    <i className="action-icon">📁</i>
                    <span>Submit Report</span>
                  </button>
                  <button className="action-btn">
                    <i className="action-icon">📅</i>
                    <span>Schedule Meeting</span>
                  </button>
                  <button className="action-btn">
                    <i className="action-icon">📊</i>
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="options-section">
              <div className="option-card" onClick={goToWeeklyGraph}>
                <div className="option-icon">📈</div>
                <div className="option-content">
                  <h3>View Graphs</h3>
                  <p>Check attendance and performance statistics</p>
                </div>
                <div className="option-arrow">→</div>
              </div>
              <div className="option-card" onClick={goTostats}>
                <div className="option-icon">📊</div>
                <div className="option-content">
                  <h3>Stats</h3>
                  <p>Visual representation of your work trends</p>
                </div>
                <div className="option-arrow">→</div>
              </div>
              <div className="option-card" onClick={goToSchedule}>
                <div className="option-icon">📅</div>
                <div className="option-content">
                  <h3>Schedule</h3>
                  <p>View and manage your upcoming schedule</p>
                </div>
                <div className="option-arrow">→</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;