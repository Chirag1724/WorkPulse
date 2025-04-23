import React, { useState, useEffect } from "react";
import { Clock, ArrowLeft, Calendar, UserCircle, Book, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./stats.css";
import data from "./data.json"; // Import data - this will re-render when data changes

// ✅ Move this function here
function formatHours(decimalHours) {
  const h = Math.floor(decimalHours);
  const m = Math.round((decimalHours - h) * 60);
  return `${h}h ${m}m`;
}

function TeacherTimeTracking() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const [weekStats, setWeekStats] = useState(null);
  const [progressMetrics, setProgressMetrics] = useState({
    percentDone: 0,
    neededMore: 0,
    perDay: 0,
    remainingWorkDays: 0
  });

  // Load data and set up states
  useEffect(() => {
    // Get the latest data
    const { teacherStats } = data;
    setTeacherData(teacherStats);
    setWeekStats(teacherStats.weeklyStats);

    // Calculate derived metrics
    const percentDone = Math.round((teacherStats.weeklyStats.logged / teacherStats.weeklyStats.weeklyRequirement) * 100);
    const neededMore = teacherStats.weeklyStats.weeklyRequirement - teacherStats.weeklyStats.logged;
    const remainingWorkDays = teacherStats.weeklyStats.punchData.filter(day => !day.in).length;
    const perDay = remainingWorkDays > 0 ? neededMore / remainingWorkDays : 0;

    setProgressMetrics({
      percentDone,
      neededMore,
      perDay,
      remainingWorkDays
    });

    // Animation effect on page load
    setIsPageLoaded(true);
  }, [data]); // Re-run this effect if data changes
  const navigate = useNavigate();
  const BackHome = () => {;
    navigate(-1);
  };
  

  // Wait for data to be loaded
  if (!teacherData || !weekStats) {
    return <div className="stats-container loading">Loading stats...</div>;
  }

  return (
    <div className="stats-container">
      <div className={`stats-dashboard ${isPageLoaded ? "fade-in" : ""}`}>
        {/* Header Section */}
        <header className="stats-header">
          <button className="back-button" onClick={BackHome}>
            <ArrowLeft size={20} />
            <span>Dashboard</span>
          </button>
          
          <div className="teacher-profile">
            <div className="teacher-avatar">
              {teacherData.avatar || <UserCircle size={32} />}
            </div>
            <div className="teacher-details">
              <h1>{teacherData.name}</h1>
              <p>{teacherData.subject} Teacher</p>
            </div>
          </div>
          
          <div className="week-indicator">
            <Calendar size={18} />
            <span>Current Week</span>
          </div>
        </header>

        {/* Stats Metrics Section */}
        <section className="stats-metrics">
          <div className="metric-card primary">
            <div className="metric-icon">
              <Clock size={22} />
            </div>
            <div className="metric-content">
              <h3>{formatHours(weekStats.logged)}</h3>
              <p>Hours Logged</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">
              <CheckCircle size={22} />
            </div>
            <div className="metric-content">
              <h3>{formatHours(weekStats.weeklyRequirement)}</h3>
              <p>Weekly Target</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">
              <Book size={22} />
            </div>
            <div className="metric-content">
              <h3>{formatHours(weekStats.pending)}</h3>
              <p>Pending Hours</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">
              <Calendar size={22} />
            </div>
            <div className="metric-content">
              <h3>{weekStats.workingDays}</h3>
              <p>Teaching Days</p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <div className="stats-content">
          {/* Progress Circle */}
          <div className="progress-section">
            <h2>Weekly Progress</h2>
            <div className="progress-circle-container">
              <div className="progress-circle-wrapper">
                <div 
                  className="progress-circle" 
                  style={{
                    background: `conic-gradient(#008E9C ${progressMetrics.percentDone * 3.6}deg, rgba(0, 142, 156, 0.2) 0deg)`
                  }}
                >
                  <div className="progress-circle-inner">
                    <span className="progress-percentage">{progressMetrics.percentDone}%</span>
                    <span className="progress-label">Complete</span>
                  </div>
                </div>
              </div>
              
              <div className="progress-details">
                <div className="progress-metric">
                  <span className="label">Hours Logged</span>
                  <span className="value">{formatHours(weekStats.logged)}</span>
                </div>
                <div className="progress-metric">
                  <span className="label">Required</span>
                  <span className="value">{formatHours(weekStats.weeklyRequirement)}</span>
                </div>
                <div className="progress-metric highlight">
                  <span className="label">Remaining</span>
                  <span className="value">{formatHours(progressMetrics.neededMore)}</span>
                </div>
                <div className="progress-metric">
                  <span className="label">Daily Average Needed</span>
                  <span className="value">{formatHours(progressMetrics.perDay)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Attendance Table */}
          <div className="attendance-section">
            <h2>Weekly Attendance</h2>
            <div className="attendance-table-wrapper">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Clock In</th>
                    <th>Clock Out</th>
                    <th>Classes</th>
                  </tr>
                </thead>
                <tbody>
                  {weekStats.punchData.map((row) => (
                    <tr key={row.day} className={!row.in && !row.out ? "inactive-row" : ""}>
                      <td>{row.day}</td>
                      <td>{row.in || <span className="missing-time">--:--</span>}</td>
                      <td>{row.out || <span className="missing-time">--:--</span>}</td>
                      <td>{row.classes || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherTimeTracking;