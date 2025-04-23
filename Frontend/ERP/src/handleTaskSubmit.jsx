const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!selectedTask || !taskDescription) return;
    const now = new Date();
    const entry = {
      type: 'task',
      taskType: selectedTask,
      time: now.toISOString(),
      description: taskDescription
    };
    setTaskHistory(prev => [...prev, entry]);
    logToBackend(entry); // 🔁 Send to backend
    setSelectedTask('');
    setTaskDescription('');
  };
  