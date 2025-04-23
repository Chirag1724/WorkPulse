import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const [punchedIn, setPunchedIn] = useState(false);
  const [progress, setProgress] = useState(60); // Example progress
  const navigate = useNavigate(); 


  const handlePunch = () => {
    setPunchedIn(!punchedIn);
    setProgress(punchedIn ? 60 : 90); // Example progress logic
  };
  const goToWeeklyGraph = () => {
    navigate('/weekly-graph');
  };
  const goTostats = () => {
    navigate('/stats');
  }
  const goToSchedule = () => {
    navigate('/schedule');
  }

  return (
    <div className="container">
      <div className="dashboard">
        <div className="sidebar">
          <h2>Dashboard</h2>
          <nav>
            <a href="#" className="active">
              Dashboard
            </a>
            <a href="#">Attendance</a>
            <a href="#">Leave</a>
            <a href="#">Settings</a>
          </nav>
        </div>

        <div className="header">Faculty Dashboard</div>

        <div className="content">
          <div className="welcome">
            <div className="photo">
              <img
                src="https://megaphone.southwestern.edu/wp-content/uploads/2018/03/birger-kollmeier-910261_960_720.jpg"
                alt="Profile"
              />
              <div className="status" />
            </div>
            <h2>Welcome Proff. Sati!</h2>
            <p>Have a productive day at work!</p>
          </div>

          <div className="stats">
            <div className="stat-box">
              <h3>Hours Worked</h3>
              <p>36</p>
            </div>
            <div className="stat-box">
              <h3>Tasks Completed</h3>
              <p>12</p>
            </div>
            <div className="stat-box">
              <h3>Leaves Taken</h3>
              <p>2</p>
            </div>
          </div>

          <button
            className={`punch-btn ${punchedIn ? 'punch-out' : 'punch-in'}`}
            onClick={handlePunch}
          >
            {punchedIn ? 'Punch Out' : 'Punch In'}
          </button>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{progress}%</span>
          </div>

          <div className="calendar">
  {/* Dynamic month and year heading */}
  <h3>{new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</h3>
  <div className="calendar-grid">
    {/* Days of week headers */}
    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
      <div key={`${d}-${i}`}>{d}</div>
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
        calendarCells.push(
          <div 
            key={`day-${day}`}
            className={`calendar-day ${day === currentDay ? 'current' : ''}`}
          >
            {day}
          </div>
        );
      }
      
      return calendarCells;
    })()}
  </div>
</div>
          <div className="options-section">
            <div className="option-box">
              <div className="option-icon">📈</div>
              <h3>View Graphs</h3>
              <p>Check attendance and performance statistics</p>
              <button className="option-btn" onClick={goToWeeklyGraph}>View</button>
            </div>
            <div className="option-box">
              <div className="option-icon">📊</div>
              <h3>stats</h3>
              <p>Visual representation of your work trends</p>
              <button className="option-btn" onClick={goTostats}>View</button>
            </div>
            <div className="option-box">
              <div className="option-icon">📅</div>
              <h3>Schedule</h3>
              <p>View and manage your upcoming schedule</p>
              <button className="option-btn" onClick={goToSchedule}>View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;