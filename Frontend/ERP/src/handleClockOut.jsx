const handleClockOut = () => {
    const now = new Date();
    const hoursWorked = ((now - clockInTime) / 3600000).toFixed(2);
    const entry = {
      type: 'clock-out',
      time: now.toISOString(),
      description: `Clocked out after ${hoursWorked} hrs`
    };
    setClockedIn(false);
    setTaskHistory(prev => [...prev, entry]);
    logToBackend(entry); // 🔁 Send to backend
  };
  