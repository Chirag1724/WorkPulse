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

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">Teacher's Weekly Schedule</h1>
      
      <div className="flex justify-center mb-6 flex-wrap">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setCurrentDay(day)}
            className={`px-4 py-2 m-1 rounded-md ${
              currentDay === day 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">{currentDay}'s Schedule</h2>
        
        <div className="space-y-3">
          {scheduleData[currentDay].map((item, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-md ${
                item.activity.includes('Break') ? 'bg-green-100' : 
                item.activity.includes('Meeting') || item.activity.includes('Development') || item.activity.includes('Planning') ? 'bg-yellow-100' :
                item.activity.includes('Teaching') ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="font-medium text-gray-800 mb-1 sm:mb-0">{item.time}</div>
                <div className="font-semibold">{item.activity}</div>
                <div className="text-gray-600 text-sm mt-1 sm:mt-0">{item.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-md">
        <h3 className="font-semibold text-blue-800 mb-2">Legend:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 rounded mr-2"></div>
            <span className="text-sm">Teaching Periods</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
            <span className="text-sm">Breaks</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-100 rounded mr-2"></div>
            <span className="text-sm">Meetings & Planning</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TeacherSchedule