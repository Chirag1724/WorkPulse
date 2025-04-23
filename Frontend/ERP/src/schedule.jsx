import { useState } from 'react';
import './schedule.css';

function TeacherSchedule() {
  const [currentDay, setCurrentDay] = useState('Monday');
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const scheduleData = {
    Monday: [
      { time: '7:30 AM - 8:00 AM', activity: 'Preparation Time', location: 'Staff Room' },
      { time: '8:00 AM - 9:30 AM', activity: 'Teaching Period 1', location: 'Room 201' },
      { time: '9:30 AM - 9:45 AM', activity: 'Break', location: 'Staff Room' },
      { time: '9:45 AM - 11:15 AM', activity: 'Teaching Period 2', location: 'Room 103' },
      { time: '11:15 AM - 12:00 PM', activity: 'Lunch Break', location: 'Cafeteria' },
      { time: '12:00 PM - 1:30 PM', activity: 'Department Meeting', location: 'Conference Room A' },
      { time: '1:30 PM - 3:00 PM', activity: 'Office Hours', location: 'Teacher Office' },
      { time: '3:00 PM - 4:00 PM', activity: 'After-school Club', location: 'Room 201' },
    ],
    Tuesday: [
      { time: '7:30 AM - 8:00 AM', activity: 'Preparation Time', location: 'Staff Room' },
      { time: '8:00 AM - 9:30 AM', activity: 'Teaching Period 1', location: 'Room 305' },
      { time: '9:30 AM - 9:45 AM', activity: 'Break', location: 'Staff Room' },
      { time: '9:45 AM - 11:15 AM', activity: 'Teaching Period 2', location: 'Room 201' },
      { time: '11:15 AM - 12:00 PM', activity: 'Lunch Break', location: 'Cafeteria' },
      { time: '12:00 PM - 1:30 PM', activity: 'Teaching Period 3', location: 'Room 103' },
      { time: '1:30 PM - 3:00 PM', activity: 'Lesson Planning', location: 'Teacher Office' },
      { time: '3:00 PM - 4:00 PM', activity: 'Parent-Teacher Conferences', location: 'Conference Room B' },
    ],
    Wednesday: [
      { time: '7:30 AM - 8:00 AM', activity: 'Preparation Time', location: 'Staff Room' },
      { time: '8:00 AM - 9:30 AM', activity: 'Teaching Period 1', location: 'Room 201' },
      { time: '9:30 AM - 9:45 AM', activity: 'Break', location: 'Staff Room' },
      { time: '9:45 AM - 11:15 AM', activity: 'Teaching Period 2', location: 'Room 305' },
      { time: '11:15 AM - 12:00 PM', activity: 'Lunch Break', location: 'Cafeteria' },
      { time: '12:00 PM - 1:30 PM', activity: 'Professional Development', location: 'Library' },
      { time: '1:30 PM - 3:00 PM', activity: 'Grading Time', location: 'Teacher Office' },
      { time: '3:00 PM - 4:00 PM', activity: 'Curriculum Planning', location: 'Conference Room A' },
    ],
    Thursday: [
      { time: '7:30 AM - 8:00 AM', activity: 'Preparation Time', location: 'Staff Room' },
      { time: '8:00 AM - 9:30 AM', activity: 'Teaching Period 1', location: 'Room 103' },
      { time: '9:30 AM - 9:45 AM', activity: 'Break', location: 'Staff Room' },
      { time: '9:45 AM - 11:15 AM', activity: 'Teaching Period 2', location: 'Room 201' },
      { time: '11:15 AM - 12:00 PM', activity: 'Lunch Break', location: 'Cafeteria' },
      { time: '12:00 PM - 1:30 PM', activity: 'Teaching Period 3', location: 'Room 305' },
      { time: '1:30 PM - 3:00 PM', activity: 'Grading / Feedback', location: 'Teacher Office' },
      { time: '3:00 PM - 4:00 PM', activity: 'Staff Meeting', location: 'Auditorium' },
    ],
    Friday: [
      { time: '7:30 AM - 8:00 AM', activity: 'Preparation Time', location: 'Staff Room' },
      { time: '8:00 AM - 9:30 AM', activity: 'Teaching Period 1', location: 'Room 201' },
      { time: '9:30 AM - 9:45 AM', activity: 'Break', location: 'Staff Room' },
      { time: '9:45 AM - 11:15 AM', activity: 'Teaching Period 2', location: 'Room 103' },
      { time: '11:15 AM - 12:00 PM', activity: 'Lunch Break', location: 'Cafeteria' },
      { time: '12:00 PM - 1:30 PM', activity: 'Teaching Period 3', location: 'Room 305' },
      { time: '1:30 PM - 3:00 PM', activity: 'Weekly Planning', location: 'Teacher Office' },
      { time: '3:00 PM - 4:00 PM', activity: 'End of Week Wrap-up', location: 'Staff Room' },
    ],
  };

  // Get icons for each activity type
  const getActivityIcon = (activity) => {
    if (activity.includes('Teaching')) return '📚';
    if (activity.includes('Break') || activity.includes('Lunch')) return '☕';
    if (activity.includes('Meeting') || activity.includes('Conference')) return '👥';
    if (activity.includes('Office') || activity.includes('Hours')) return '🕒';
    if (activity.includes('Planning') || activity.includes('Development')) return '📝';
    if (activity.includes('Grading')) return '✅';
    if (activity.includes('Preparation')) return '⏰';
    if (activity.includes('Club')) return '🏆';
    return '📋';
  };

  // Get current time to highlight current activity
  const getCurrentTimeSlot = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    
    // Convert time format like "7:30 AM - 8:00 AM" to 24-hour format for comparison
    return (timeString) => {
      const [startTime, endTime] = timeString.split(' - ');
      
      const parseTime = (time) => {
        const [hourMin, period] = time.split(' ');
        let [hour, minute] = hourMin.split(':').map(num => parseInt(num, 10));
        
        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;
        
        return `${hour}:${minute < 10 ? '0' + minute : minute}`;
      };
      
      const start = parseTime(startTime);
      const end = parseTime(endTime);
      
      return currentTime >= start && currentTime <= end;
    };
  };

  const isCurrentTimeSlot = getCurrentTimeSlot();

  return (
    <div className="dashboard-container">
      <div className="schedule-header">
        <div className="logo-container">
          <div className="logo">EduTrack</div>
          <div className="tagline">Teacher Schedule Dashboard</div>
        </div>
        <div className="day-selector">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setCurrentDay(day)}
              className={`day-btn ${currentDay === day ? 'active' : ''}`}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="schedule-content">
        <div className="date-display">
          <div className="day-name">{currentDay}</div>
          <div className="day-date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
        </div>
        
        <div className="timeline">
          {scheduleData[currentDay].map((item, index) => (
            <div 
              key={index} 
              className={`schedule-item ${isCurrentTimeSlot(item.time) ? 'current-activity' : ''}`}
            >
              <div className="time-block">{item.time}</div>
              <div className="activity-block">
                <div className="activity-icon">{getActivityIcon(item.activity)}</div>
                <div className="activity-details">
                  <div className="activity-name">{item.activity}</div>
                  <div className="activity-location">{item.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="schedule-footer">
        <div className="legend">
          <div className="legend-item">
            <span className="legend-icon">📚</span>
            <span>Teaching</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">☕</span>
            <span>Break</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">👥</span>
            <span>Meetings</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">📝</span>
            <span>Planning</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherSchedule;