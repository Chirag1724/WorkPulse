import { Clock, ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import "./stats.css";

// Sample teacher data for Mr. John Doe
const teacherData = {
  name: "Mr. John Doe",
  subject: "Mathematics",
  avatar: "👨‍🏫",
  weeklyStats: {
    logged: 27.5,
    weeklyRequirement: 40,
    pending: 12.5,
    workingDays: 5,
    punchData: [
      { day: "Monday", in: "07:45", out: "15:30", classes: 5 },
      { day: "Tuesday", in: "08:00", out: "16:15", classes: 4 },
      { day: "Wednesday", in: "07:30", out: "15:45", classes: 6 },
      { day: "Thursday", in: "", out: "", classes: 5 },
      { day: "Friday", in: "", out: "", classes: 4 },
    ],
  }
};

// Helper function to format hours from decimal to hours and minutes
function formatHours(decimalHours) {
  const h = Math.floor(decimalHours);
  const m = Math.round((decimalHours - h) * 60);
  return `${h}h ${m}m`;
}

function TeacherTimeTracking() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  const { weeklyStats } = teacherData;
  const percentDone = Math.round((weeklyStats.logged / weeklyStats.weeklyRequirement) * 100);
  const neededMore = weeklyStats.weeklyRequirement - weeklyStats.logged;
  const remainingWorkDays = weeklyStats.punchData.filter(day => !day.in).length;
  const perDay = remainingWorkDays > 0 ? neededMore / remainingWorkDays : 0;

  // Animation effect on page load
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Handle back button click
  const BackHome = () => {
    // Replace with actual navigation logic
    console.log("Navigate back to Dashboard");
  };

  return (
    <div className="container">
      <div className={`teacher-tracking-dashboard ${isPageLoaded ? 'fadeIn' : ''}`}>
        {/* Back Button */}
        <button className="back-button" onClick={BackHome}>
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>

        {/* Teacher Profile Card */}
        <div className="teacher-profile">
          <div className="teacher-info">
            <div className="teacher-avatar">
              {teacherData.avatar}
            </div>
            <div className="teacher-details">
              <h1>{teacherData.name}</h1>
              <p>{teacherData.subject} Teacher</p>
            </div>
          </div>
          <div className="week-display">
            Current Week
          </div>
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
            
            {/* Working days */}
            <div className="time-stat-box">
              <div className="time-stat-value">{weeklyStats.workingDays}</div>
              <div className="time-stat-label">Teaching Days This Week</div>
            </div>
          </div>
          
          <div className="dashboard-content">
            {/* Circle Progress */}
            <div className="progress-container">
              <div className="circle-progress">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#D1E5E7"
                    strokeWidth="9"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#0D9488"
                    strokeWidth="9"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - percentDone / 100)}
                    fill="none"
                    strokeLinecap="round"
                  />
                  <text x="50" y="54" textAnchor="middle" fontSize="23" fill="#0D9488" fontWeight="bold">{percentDone}%</text>
                </svg>
              </div>
              <div className="progress-text">{formatHours(weeklyStats.logged)}/{formatHours(weeklyStats.weeklyRequirement)}</div>
            </div>
            
            <div>
              {/* "You need X more hours" */}
              <div className="hours-needed">
                <span>You need {formatHours(neededMore)} more hours this week</span>
                <span>Averaging <span>{formatHours(perDay)}</span> per day</span>
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