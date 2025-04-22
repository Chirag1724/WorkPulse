import React, { useState } from 'react';
import './index.css';

function Dashboard() {
  const [punchedIn, setPunchedIn] = useState(false);
  const [progress, setProgress] = useState(60); // Example progress

  const handlePunch = () => {
    setPunchedIn(!punchedIn);
    setProgress(punchedIn ? 60 : 90); // Example progress logic
  };

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
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
              />
              <div className="status" />
            </div>
            <h2>Welcome Proff. John!</h2>
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
            <h3>April 2025</h3>
            <div className="calendar-grid">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                <div key={d}>{d}</div>
              ))}
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className={`calendar-day ${
                    i + 1 === 22 ? 'current' : ''
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
