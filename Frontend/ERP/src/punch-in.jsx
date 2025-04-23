import React, { useState, useEffect } from 'react';
import './punch-in.css';
function PunchInSystem() {
  // State management
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [selectedTask, setSelectedTask] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskHistory, setTaskHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal
  const [action, setAction] = useState(''); // Store the action (clock-in or clock-out)

  // Task types
  const taskTypes = [
    { id: 'teaching', name: 'Teaching' },
    { id: 'research', name: 'Research' },
    { id: 'advising', name: 'Student Advising' },
    { id: 'admin', name: 'Administrative Work' },
    { id: 'meeting', name: 'Faculty Meeting' },
  ];

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle confirmation action (clock-in or clock-out)
  const handleConfirmation = (actionType) => {
    setAction(actionType);
    setShowConfirmation(true);
  };

  // Handle confirmation of clock-in or clock-out
  const confirmAction = () => {
    if (action === 'clock-in') {
      handleClockIn();
    } else if (action === 'clock-out') {
      handleClockOut();
    }
    setShowConfirmation(false); // Hide confirmation after action
  };

  // Handle canceling the confirmation
  const cancelAction = () => {
    setShowConfirmation(false);
  };

  // Handle clock in
  const handleClockIn = () => {
    const now = new Date();
    setClockedIn(true);
    setClockInTime(now);
    
    // Add clock-in record to history
    setTaskHistory(prev => [...prev, {
      type: 'clock-in',
      time: now,
      description: 'Clocked in for the day'
    }]);
  };

  // Handle clock out
  const handleClockOut = () => {
    const now = new Date();
    setClockedIn(false);
    
    // Calculate hours worked
    const hoursWorked = ((now - clockInTime) / (1000 * 60 * 60)).toFixed(2);
    
    // Add clock-out record to history
    setTaskHistory(prev => [...prev, {
      type: 'clock-out',
      time: now,
      description: `Clocked out after ${hoursWorked} hours`
    }]);
  };

  // Handle task submission
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!selectedTask || !taskDescription) return;
    
    const now = new Date();
    
    // Add task record to history
    setTaskHistory(prev => [...prev, {
      type: 'task',
      taskType: selectedTask,
      time: now,
      description: taskDescription
    }]);
    
    // Reset form
    setSelectedTask('');
    setTaskDescription('');
  };

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit' 
    });
  };

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Dashboard
  const Dashboard = () => (
    <div className="max-w-6xl mx-auto p-4">
      <header className="bg-white shadow-md p-4 mb-6 flex justify-between items-center rounded-lg">
        <div>
          <h1 className="text-2xl font-bold">Punch-In System</h1>
          <p className="text-gray-600">{formatDate(currentTime)} | {formatTime(currentTime)}</p>
        </div>
        <div className="flex items-center">
          <button
            className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
            onClick={handleClockOut}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Clock In/Out Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Time Tracking</h2>
          <div className="mb-4">
            <p className="text-gray-700">Status: <span className={`font-bold ${clockedIn ? 'text-green-600' : 'text-red-600'}`} >
              {clockedIn ? 'Clocked In' : 'Clocked Out'}
            </span></p>
            {clockedIn && (
              <p className="text-gray-700">Clocked in at: {formatTime(clockInTime)}</p>
            )}
          </div>
          {clockedIn ? (
            <button
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => handleConfirmation('clock-out')}
            >
              Clock Out
            </button>
          ) : (
            <button
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              onClick={() => handleConfirmation('clock-in')}
            >
              Clock In
            </button>
          )}
        </div>

        {/* Task Recording Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Record Task</h2>
          {clockedIn ? (
            <form onSubmit={handleTaskSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="taskType">Task Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="taskType"
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                  required
                >
                  <option value="">Select Task Type</option>
                  {taskTypes.map(task => (
                    <option key={task.id} value={task.id}>{task.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="taskDesc">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="taskDesc"
                  rows="3"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                type="submit"
              >
                Record Task
              </button>
            </form>
          ) : (
            <div className="text-center p-4 border border-gray-200 rounded-md bg-gray-50">
              <p className="text-gray-600">Please clock in to record tasks</p>
            </div>
          )}
        </div>

        {/* Today's Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Today's Summary</h2>
          {taskHistory.length > 0 ? (
            <div className="max-h-64 overflow-y-auto">
              {taskHistory.map((entry, index) => (
                <div key={index} className="mb-3 pb-3 border-b border-gray-200 last:border-0">
                  <div className="flex justify-between">
                    <p className="font-semibold">
                      {entry.type === 'task'
                        ? taskTypes.find(t => t.id === entry.taskType)?.name
                        : entry.type === 'clock-in'
                          ? 'Clock In'
                          : 'Clock Out'}
                    </p>
                    <p className="text-sm text-gray-600">{formatTime(entry.time)}</p>
                  </div>
                  <p className="text-gray-700 text-sm">{entry.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No activity recorded today</p>
          )}
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirm Action</h3>
            <p className="text-gray-700 mb-4">Are you sure you want to {action}?</p>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                onClick={cancelAction}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                onClick={confirmAction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default PunchInSystem