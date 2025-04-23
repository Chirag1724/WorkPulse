import React, { useState, useEffect } from "react";
import { Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./stats.css";
import data from "./data.json";

// ✅ Move this function here
function formatHours(decimalHours) {
  const h = Math.floor(decimalHours);
  const m = Math.round((decimalHours - h) * 60);
  return `${h}h ${m}m`;
}

function TeacherTimeTracking() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const navigate = useNavigate();
  const { teacherStats } = data;
  const { weeklyStats } = teacherStats;

  const percentDone = Math.round((weeklyStats.logged / weeklyStats.weeklyRequirement) * 100);
  const neededMore = weeklyStats.weeklyRequirement - weeklyStats.logged;
  const remainingWorkDays = weeklyStats.punchData.filter(day => !day.in).length;
  const perDay = remainingWorkDays > 0 ? neededMore / remainingWorkDays : 0;

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const BackHome = () => {
    navigate(-1);
  };
  

  return (
    <div className="container">
      <div className={`teacher-tracking-dashboard ${isPageLoaded ? "fadeIn" : ""}`}>
        {/* Back Button */}
        <button className="back-button" onClick={BackHome}>
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>

        {/* Teacher Profile Card */}
        <div className="teacher-profile">
          <div className="teacher-info">
            <div className="teacher-avatar">{teacherStats.avatar}</div>
            <div className="teacher-details">
              <h1>{teacherStats.name}</h1>
              <p>{teacherStats.subject} Teacher</p>
            </div>
          </div>
          <div className="week-display">Current Week</div>
        </div>

        {/* Time Tracking Dashboard */}
        <section className="time-tracking-section">
          <h2>Teaching Hours Dashboard</h2>

          <div className="time-stats-grid">
            {/* Total Hours */}
            <div className="time-stat-box">
              <div className="time-stat-value">
                {formatHours(weeklyStats.logged)} <Clock size={18} />
              </div>
              <div className="time-stat-label">Teaching Hours This Week</div>
            </div>

            {/* Weekly Requirement */}
            <div className="time-stat-box">
              <div className="time-stat-value">{formatHours(weeklyStats.weeklyRequirement)}</div>
              <div className="time-stat-label">Weekly Requirement</div>
            </div>

            {/* Pending */}
            <div className="time-stat-box">
              <div className="time-stat-value">{formatHours(weeklyStats.pending)}</div>
              <div className="time-stat-label">Pending Hours</div>
            </div>

            {/* Working Days */}
            <div className="time-stat-box">
              <div className="time-stat-value">{weeklyStats.workingDays}</div>
              <div className="time-stat-label">Teaching Days This Week</div>
            </div>
          </div>

          <div className="dashboard-content">
            {/* Circular Progress */}
            <div className="circular-progress-wrapper">
              <div
                className="circular-progress"
                style={{
                  background: `conic-gradient(#0d9488 ${percentDone * 3.6}deg, #d1e5e7 0deg)`,
                }}
              >
                <div className="progress-inner">
                  <span className="progress-number">{percentDone}%</span>
                </div>
              </div>
              <div className="progress-text">
                {formatHours(weeklyStats.logged)} / {formatHours(weeklyStats.weeklyRequirement)}
              </div>
            </div>

            <div>
              {/* "You need X more hours" */}
              <div className="hours-needed">
                <span>You need {formatHours(neededMore)} more hours this week</span>
                <span>
                  Averaging <span>{formatHours(perDay)}</span> per day
                </span>
              </div>

              {/* Punch Table */}
              <div className="punch-table-container">
                <table className="punch-table">
                  <thead>
                    <tr>
                      <th>DAY</th>
                      <th>IN</th>
                      <th>OUT</th>
                      <th>CLASSES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyStats.punchData.map((row) => (
                      <tr key={row.day}>
                        <td>{row.day}</td>
                        <td>{row.in || <span className="missing-time">-</span>}</td>
                        <td>{row.out || <span className="missing-time">-</span>}</td>
                        <td>{row.classes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherTimeTracking;
