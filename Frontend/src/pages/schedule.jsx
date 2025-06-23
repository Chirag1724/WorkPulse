import { useState, useEffect, useRef } from 'react';
import { Edit, LogOut, Bell, User, Calendar, Clock, Users, BookOpen } from 'lucide-react';

function TeacherSchedule() {
  const [currentDay, setCurrentDay] = useState('Monday');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const scheduleData = {
    Monday: [
      { time: '7:30 AM - 8:00 AM', activity: 'Preparation Time', location: 'Staff Room', subject: 'General', students: 0 },
      { time: '8:00 AM - 9:30 AM', activity: 'Teaching Period 1', location: 'Room 201', subject: 'Mathematics', students: 25 },
      { time: '9:30 AM - 9:45 AM', activity: 'Break', location: 'Staff Room', subject: 'Break', students: 0 },
      { time: '9:45 AM - 11:15 AM', activity: 'Teaching Period 2', location: 'Room 103', subject: 'Physics', students: 28 },
      { time: '11:15 AM - 12:00 PM', activity: 'Lunch Break', location: 'Cafeteria', subject: 'Lunch', students: 0 },
      { time: '12:00 PM - 1:30 PM', activity: 'Department Meeting', location: 'Conference Room A', subject: 'Science Dept', students: 0 },
      { time: '1:30 PM - 3:00 PM', activity: 'Office Hours', location: 'Teacher Office', subject: 'Consultation', students: 0 },
      { time: '3:00 PM - 4:00 PM', activity: 'After-school Club', location: 'Room 201', subject: 'Science Club', students: 15 },
    ],
    Tuesday: [
      { time: '7:30 AM - 8:00 AM', activity: 'Preparation Time', location: 'Staff Room', subject: 'General', students: 0 },
      { time: '8:00 AM - 9:30 AM', activity: 'Teaching Period 1', location: 'Room 305', subject: 'Chemistry', students: 22 },
      { time: '9:30 AM - 9:45 AM', activity: 'Break', location: 'Staff Room', subject: 'Break', students: 0 },
      { time: '9:45 AM - 11:15 AM', activity: 'Teaching Period 2', location: 'Room 201', subject: 'Mathematics', students: 26 },
      { time: '11:15 AM - 12:00 PM', activity: 'Lunch Break', location: 'Cafeteria', subject: 'Lunch', students: 0 },
      { time: '12:00 PM - 1:30 PM', activity: 'Teaching Period 3', location: 'Room 103', subject: 'Physics', students: 24 },
      { time: '1:30 PM - 3:00 PM', activity: 'Lesson Planning', location: 'Teacher Office', subject: 'Planning', students: 0 },
      { time: '3:00 PM - 4:00 PM', activity: 'Parent-Teacher Conferences', location: 'Conference Room B', subject: 'Parents', students: 0 },
    ],
    Wednesday: [
      { time: '7:30 AM - 8:00 AM', activity: 'Preparation Time', location: 'Staff Room', subject: 'General', students: 0 },
      { time: '8:00 AM - 9:30 AM', activity: 'Teaching Period 1', location: 'Room 201', subject: 'Mathematics', students: 27 },
      { time: '9:30 AM - 9:45 AM', activity: 'Break', location: 'Staff Room', subject: 'Break', students: 0 },
      { time: '9:45 AM - 11:15 AM', activity: 'Teaching Period 2', location: 'Room 305', subject: 'Chemistry', students: 23 },
      { time: '11:15 AM - 12:00 PM', activity: 'Lunch Break', location: 'Cafeteria', subject: 'Lunch', students: 0 },
      { time: '12:00 PM - 1:30 PM', activity: 'Professional Development', location: 'Library', subject: 'Training', students: 0 },
      { time: '1:30 PM - 3:00 PM', activity: 'Grading Time', location: 'Teacher Office', subject: 'Assessment', students: 0 },
      { time: '3:00 PM - 4:00 PM', activity: 'Curriculum Planning', location: 'Conference Room A', subject: 'Curriculum', students: 0 },
    ],
    Thursday: [
      { time: '7:30 AM - 8:00 AM', activity: 'Preparation Time', location: 'Staff Room', subject: 'General', students: 0 },
      { time: '8:00 AM - 9:30 AM', activity: 'Teaching Period 1', location: 'Room 103', subject: 'Physics', students: 29 },
      { time: '9:30 AM - 9:45 AM', activity: 'Break', location: 'Staff Room', subject: 'Break', students: 0 },
      { time: '9:45 AM - 11:15 AM', activity: 'Teaching Period 2', location: 'Room 201', subject: 'Mathematics', students: 25 },
      { time: '11:15 AM - 12:00 PM', activity: 'Lunch Break', location: 'Cafeteria', subject: 'Lunch', students: 0 },
      { time: '12:00 PM - 1:30 PM', activity: 'Teaching Period 3', location: 'Room 305', subject: 'Chemistry', students: 21 },
      { time: '1:30 PM - 3:00 PM', activity: 'Grading / Feedback', location: 'Teacher Office', subject: 'Assessment', students: 0 },
      { time: '3:00 PM - 4:00 PM', activity: 'Staff Meeting', location: 'Auditorium', subject: 'All Staff', students: 0 },
    ],
    Friday: [
      { time: '7:30 AM - 8:00 AM', activity: 'Preparation Time', location: 'Staff Room', subject: 'General', students: 0 },
      { time: '8:00 AM - 9:30 AM', activity: 'Teaching Period 1', location: 'Room 201', subject: 'Mathematics', students: 26 },
      { time: '9:30 AM - 9:45 AM', activity: 'Break', location: 'Staff Room', subject: 'Break', students: 0 },
      { time: '9:45 AM - 11:15 AM', activity: 'Teaching Period 2', location: 'Room 103', subject: 'Physics', students: 27 },
      { time: '11:15 AM - 12:00 PM', activity: 'Lunch Break', location: 'Cafeteria', subject: 'Lunch', students: 0 },
      { time: '12:00 PM - 1:30 PM', activity: 'Teaching Period 3', location: 'Room 305', subject: 'Chemistry', students: 24 },
      { time: '1:30 PM - 3:00 PM', activity: 'Weekly Planning', location: 'Teacher Office', subject: 'Planning', students: 0 },
      { time: '3:00 PM - 4:00 PM', activity: 'End of Week Wrap-up', location: 'Staff Room', subject: 'Review', students: 0 },
    ],
  };

  // Get current time of day for greeting
  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Handle clicks outside menus
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update current time every minute
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }));
      
      const currentDayName = now.toLocaleDateString('en-US', { weekday: 'long' });
      if (days.includes(currentDayName)) {
        setCurrentDay(currentDayName);
      }
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

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

  const getActivityColor = (activity) => {
    if (activity.includes('Teaching')) return 'bg-white border-l-4 border-teal-500';
    if (activity.includes('Break') || activity.includes('Lunch')) return 'bg-cyan-50 border-l-4 border-emerald-600';
    if (activity.includes('Meeting') || activity.includes('Conference')) return 'bg-white border-l-4 border-slate-500';
    if (activity.includes('Office') || activity.includes('Hours')) return 'bg-cyan-50 border-l-4 border-teal-600';
    if (activity.includes('Planning') || activity.includes('Development')) return 'bg-white border-l-4 border-blue-500';
    if (activity.includes('Grading')) return 'bg-cyan-50 border-l-4 border-green-500';
    if (activity.includes('Preparation')) return 'bg-white border-l-4 border-teal-600';
    if (activity.includes('Club')) return 'bg-cyan-50 border-l-4 border-purple-500';
    return 'bg-white border-l-4 border-gray-400';
  };

  const isCurrentTimeSlot = (timeString) => {
    const now = new Date();
    const [startTimeStr, endTimeStr] = timeString.split(' - ');
    
    const parseTime = (timeStr) => {
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };
    
    const startTime = parseTime(startTimeStr);
    const endTime = parseTime(endTimeStr);
    
    return now >= startTime && now <= endTime;
  };

  const getDayStats = (day) => {
    const daySchedule = scheduleData[day] || [];
    const teachingHours = daySchedule
      .filter(item => item.activity.includes('Teaching'))
      .length * 1.5;
    
    const meetings = daySchedule.filter(item => 
      item.activity.includes('Meeting') || item.activity.includes('Conference')
    ).length;
    
    return { teachingHours, meetings };
  };

  const currentDayStats = getDayStats(currentDay);

  const handleEditProfile = () => {
    alert("Edit profile functionality would open here");
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    window.location.href = "/";
    setShowProfileMenu(false);
  };

  const handleBackClick = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-cyan-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-xl p-6 lg:p-8 border border-teal-100">
        
        {/* Professional Header Navbar */}
        <div className="bg-gradient-to-r from-teal-900 to-teal-600 rounded-lg shadow-lg p-5 mb-6">
          <div className="flex justify-between items-center">
            {/* Left side with greeting and back button */}
            <div className="flex items-center">
              <div 
                className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white/20 cursor-pointer hover:border-white/40 transition-all duration-200"
                onClick={handleBackClick}
                title="Back to Dashboard"
              >
                <img 
                  src="https://t4.ftcdn.net/jpg/00/66/63/61/360_F_66636165_W8DyCqGGHSJHJxOz3OUJWi7N6gb2NZwk.jpg" 
                  alt="Back to Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-white mb-1">{getGreeting()}, Prof. M.M. Sati!</h1>
                <p className="text-sm text-white/80">Have a productive day!</p>
              </div>
            </div>
            
            {/* Right side with notifications and profile */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-200 border border-white/20 relative"
                >
                  <Bell size={18} className="text-white" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">3</span>
                </button>
                
                {showNotifications && (
                  <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl w-80 overflow-hidden z-20 border border-teal-100">
                    <div className="p-4 bg-cyan-50 border-b border-teal-100">
                      <h3 className="font-semibold text-teal-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="p-3 hover:bg-cyan-50 border-b border-gray-100 cursor-pointer transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-teal-900">Department Meeting Reminder</p>
                            <p className="text-xs text-slate-600">Science dept meeting at 12:00 PM today</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-cyan-50 border-b border-gray-100 cursor-pointer transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-teal-900">New Assignment Submissions</p>
                            <p className="text-xs text-slate-600">5 new submissions for Physics Assignment 3</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-cyan-50 cursor-pointer transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-teal-900">Parent Conference Scheduled</p>
                            <p className="text-xs text-slate-600">Meeting with John's parents tomorrow at 3 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile Menu */}
              <div className="relative" ref={profileMenuRef}>
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 cursor-pointer hover:border-white/40 transition-all duration-200"
                >
                  <img 
                    src="https://megaphone.southwestern.edu/wp-content/uploads/2018/03/birger-kollmeier-910261_960_720.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </button>
                
                {showProfileMenu && (
                  <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl w-48 overflow-hidden z-20 border border-teal-100">
                    <div className="p-4 bg-cyan-50 border-b border-teal-100">
                      <div className="font-semibold text-teal-900">Prof. M.M. Sati</div>
                    </div>
                    <button 
                      onClick={handleEditProfile}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-teal-50 w-full text-left transition-colors border-none bg-transparent cursor-pointer text-slate-600"
                    >
                      <Edit size={16} className="text-teal-600" />
                      <span className="text-sm">Edit Profile</span>
                    </button>
                    <div className="border-t border-gray-100">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 w-full text-left transition-colors text-red-600 border-none bg-transparent cursor-pointer"
                      >
                        <LogOut size={16} />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-teal-900 mb-2">
              Teacher Schedule
            </h1>
            <p className="text-slate-600 text-lg flex items-center gap-2">
              <Calendar size={18} className="text-teal-600" />
              {currentDate}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-md border border-teal-100">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center shadow-sm">
                <BookOpen size={20} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">Teaching Hours</div>
                <div className="text-2xl font-bold text-teal-900">
                  {currentDayStats.teachingHours}
                  <span className="text-sm text-slate-600 ml-1 font-normal">hrs</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-md border border-teal-100">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-slate-500 to-slate-600 flex items-center justify-center shadow-sm">
                <Users size={20} className="text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">Meetings</div>
                <div className="text-2xl font-bold text-teal-900">{currentDayStats.meetings}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Day Navigation */}
        <div className="mb-8">
          <div className="flex gap-2 flex-wrap p-2 bg-cyan-50 rounded-lg border border-teal-100">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setCurrentDay(day)}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  currentDay === day 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-900 border border-teal-100'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        
        {/* Schedule Content */}
        <div className="space-y-3 mb-8">
          {scheduleData[currentDay].map((item, index) => {
            const isActive = isCurrentTimeSlot(item.time);
            
            return (
              <div 
                key={index} 
                className={`${getActivityColor(item.activity)} rounded-lg p-5 transition-all duration-200 hover:shadow-md border ${
                  isActive ? 'ring-2 ring-teal-500 shadow-lg bg-teal-50' : 'shadow-sm'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className="w-32 text-sm font-bold text-teal-900 flex-shrink-0 bg-cyan-50 rounded-md p-2 text-center border border-teal-100">
                    {item.time}
                  </div>
                  
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 flex items-center justify-center text-2xl bg-cyan-50 rounded-lg border border-teal-100">
                      {getActivityIcon(item.activity)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-teal-900 text-lg mb-1">{item.activity}</div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <span>📍</span>
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>📖</span>
                          {item.subject}
                        </span>
                        {item.students > 0 && (
                          <span className="flex items-center gap-1">
                            <span>👥</span>
                            {item.students} students
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {isActive && (
                    <div className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-semibold">Active</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Weekly Overview */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-teal-100 mb-8">
          <h3 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
            <span>📊</span>
            Weekly Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {days.map(day => {
              const dayStats = getDayStats(day);
              const isCurrentDay = currentDay === day;
              
              return (
                <div 
                  key={day}
                  className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isCurrentDay 
                      ? 'bg-teal-50 border-teal-500 shadow-md' 
                      : 'bg-white border-teal-100 hover:bg-cyan-50 hover:shadow-sm'
                  }`}
                  onClick={() => setCurrentDay(day)}
                >
                  <div className="text-center">
                    <div className={`font-bold mb-2 ${isCurrentDay ? 'text-teal-900' : 'text-slate-600'}`}>
                      {day}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className={`flex justify-between ${isCurrentDay ? 'text-teal-900' : 'text-slate-600'}`}>
                        <span>Teaching:</span>
                        <span className="font-semibold">{dayStats.teachingHours}h</span>
                      </div>
                      <div className={`flex justify-between ${isCurrentDay ? 'text-teal-900' : 'text-slate-600'}`}>
                        <span>Meetings:</span>
                        <span className="font-semibold">{dayStats.meetings}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default TeacherSchedule;