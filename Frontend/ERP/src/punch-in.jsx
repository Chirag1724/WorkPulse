import React, { useEffect, useState } from 'react';
import './punch-in.css';

function PunchInSystem() {
  const [data, setData] = useState(null);
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [action, setAction] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Data fetch error:', err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString();
  const formatDate = (date) =>
    date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const logPunch = (type) => {
    const now = new Date();
    const entry = {
      type,
      time: now.toTimeString().slice(0, 5), // HH:MM
      day: formatDate(now).split(',')[0], // e.g., Monday
    };

    fetch('http://localhost:5000/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    }).catch(console.error);
  };

  const confirmAction = () => {
    if (action === 'clock-in') {
      setClockedIn(true);
      setClockInTime(new Date());
      logPunch('clock-in');
    } else {
      setClockedIn(false);
      logPunch('clock-out');
    }
    setShowConfirmation(false);
  };

  if (!data) return <p>Loading...</p>;

  const { teacherStats, weekly, monthly } = data;

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Punch-In System</h1>
        <p>{formatDate(currentTime)} | {formatTime(currentTime)}</p>
      </header>

      <div className="grid">
        <div className="card">
          <h2>Welcome, {teacherStats.name} {teacherStats.avatar}</h2>
          <p><strong>Subject:</strong> {teacherStats.subject}</p>
          <p>Status: <span className={clockedIn ? 'status-in' : 'status-out'}>{clockedIn ? 'Clocked In' : 'Clocked Out'}</span></p>
          {clockedIn && <p>Clocked in at: {formatTime(clockInTime)}</p>}
          <button className={`action-button ${clockedIn ? 'out' : 'in'}`} onClick={() => {
            setAction(clockedIn ? 'clock-out' : 'clock-in');
            setShowConfirmation(true);
          }}>
            {clockedIn ? 'Clock Out' : 'Clock In'}
          </button>
        </div>

        <div className="card">
          <h2>Weekly Hours</h2>
          <ul>
            {weekly.map(day => (
              <li key={day.day}>{day.day}: {day.hours} hrs</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Monthly Overview</h2>
          <ul>
            {monthly.map((m, i) => (
              <li key={i}>
                {m.month}: {m.actual}/{m.required} hrs
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>This Week's Punches</h2>
          {teacherStats.weeklyStats.punchData.map((entry, i) => (
            <p key={i}>
              <strong>{entry.day}:</strong> In: {entry.in || '-'} | Out: {entry.out || '-'} | Classes: {entry.classes}
            </p>
          ))}
        </div>
      </div>

      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm</h3>
            <p>Are you sure you want to {action.replace('-', ' ')}?</p>
            <div className="modal-actions">
              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
              <button onClick={confirmAction}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PunchInSystem;
