import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './punch-in.css'; // Import the CSS file

const PunchIn = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionType, setActionType] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [plannedHours, setPlannedHours] = useState(8);
  const [punchInTime, setPunchInTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const navigate = useNavigate();
  
  // Work target options
  const workTargets = [
    'Project Alpha Development',
    'Client Meeting Preparation',
    'Documentation',
    'Bug Fixing',
    'Team Collaboration',
    'Training & Learning'
  ];
  
  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // If punched in, update elapsed time
      if (isPunchedIn && punchInTime) {
        const elapsed = Math.floor((new Date() - punchInTime) / 1000);
        setElapsedTime(elapsed);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPunchedIn, punchInTime]);
  
  // Format time display (HH:MM:SS)
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  // Format elapsed time as HH:MM:SS
  const formatElapsedTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle punch in action
  const handlePunchIn = () => {
    if (!selectedTarget) {
      alert("Please select a work target before punching in.");
      return;
    }
    
    setActionType('punchIn');
    setShowConfirmation(true);
  };
  
  // Handle punch out action
  const handlePunchOut = () => {
    setActionType('punchOut');
    setShowConfirmation(true);
  };
  
  // Confirm punch action
  const confirmAction = () => {
    if (actionType === 'punchIn') {
      setIsPunchedIn(true);
      setPunchInTime(new Date());
      setElapsedTime(0);
    } else if (actionType === 'punchOut') {
      // Save punch out data here if needed
      setIsPunchedIn(false);
      setSelectedTarget('');
      setPunchInTime(null);
      
      // Redirect to dashboard after a brief delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
    
    setShowConfirmation(false);
  };
  
  // Cancel confirmation dialog
  const cancelAction = () => {
    setShowConfirmation(false);
    setActionType('');
  };
  
  return (
    <div className="punch-in-container">
      <h1 className="punch-in-header">
        <Clock size={24} />
        Time Tracking
      </h1>
      
      {/* Current Time Display */}
      <div className="current-time-display">
        {formatTime(currentTime)}
      </div>
      
      {/* Work Target Selection */}
      <div className="form-group">
        <label className="form-label">
          <Target size={16} className="button-icon" />
          Work Target:
        </label>
        <select
          className="target-select"
          value={selectedTarget}
          onChange={(e) => setSelectedTarget(e.target.value)}
          disabled={isPunchedIn}
        >
          <option value="">Select a work target</option>
          {workTargets.map((target, index) => (
            <option key={index} value={target}>{target}</option>
          ))}
        </select>
      </div>
      
      {/* Planned Hours */}
      <div className="form-group">
        <label className="form-label">Planned Hours:</label>
        <input
          type="number"
          min="1"
          max="24"
          className="hours-input"
          value={plannedHours}
          onChange={(e) => setPlannedHours(parseInt(e.target.value) || 0)}
          disabled={isPunchedIn}
        />
      </div>
      
      {/* Elapsed Time (visible when punched in) */}
      {isPunchedIn && (
        <div className="elapsed-time-container">
          <p className="elapsed-time-label">Elapsed Time:</p>
          <div className="elapsed-time-display">
            {formatElapsedTime(elapsedTime)}
          </div>
        </div>
      )}
      
      {/* Clock In/Out Buttons */}
      <div className="button-container">
        {!isPunchedIn ? (
          <button
            className="clock-in-button"
            onClick={handlePunchIn}
          >
            <CheckCircle size={20} className="button-icon" />
            Clock In
          </button>
        ) : (
          <button
            className="clock-out-button"
            onClick={handlePunchOut}
          >
            <XCircle size={20} className="button-icon" />
            Clock Out
          </button>
        )}
      </div>
      
      {/* Active Status Display */}
      {isPunchedIn && (
        <div className="status-indicator">
          <p className="status-text">
            <span className="status-dot"></span>
            Currently working on: <strong>{selectedTarget}</strong>
          </p>
          <p className="status-time">
            Clocked in at {punchInTime ? formatTime(punchInTime) : ''}
          </p>
        </div>
      )}
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">
              {actionType === 'punchIn' ? 'Clock In Confirmation' : 'Clock Out Confirmation'}
            </h3>
            <p className="modal-text">
              {actionType === 'punchIn' 
                ? `Are you sure you want to clock in for "${selectedTarget}"?` 
                : 'Are you sure you want to clock out?'}
            </p>
            <div className="modal-buttons">
              <button
                className="cancel-button"
                onClick={cancelAction}
              >
                Cancel
              </button>
              <button
                className={`confirm-button ${
                  actionType === 'punchIn' ? 'confirm-clock-in' : 'confirm-clock-out'
                }`}
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
};

export default PunchIn;