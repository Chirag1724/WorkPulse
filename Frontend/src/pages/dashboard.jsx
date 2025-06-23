import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, LogOut, Bell } from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();
  const [punchedIn, setPunchedIn] = useState(false);
  const [progress, setProgress] = useState(60);
  const [greeting, setGreeting] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    // Set appropriate greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

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

  const handlePunch = () => {
    setPunchedIn(!punchedIn);
    setProgress(punchedIn ? 60 : 90);
  };

  const goToWeeklyGraph = () => {
    navigate('/weekly-graph');
  };

  const goTostats = () => {
    navigate('/stats');
  };

  const goToSchedule = () => {
    navigate('/schedule');
  };

  const punchIn = () => {
    navigate('/punch-in');
  };

  const handleEditProfile = () => {
    alert("Edit profile functionality would open here");
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    window.location.href = "/";
    setShowProfileMenu(false);
  };

  // Calendar generation logic
  const generateCalendar = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const calendarCells = [];

    // Add previous month's trailing days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const prevDay = lastDayOfPrevMonth - i;
      calendarCells.push(
        <div 
          key={`prev-${prevDay}`} 
          className="h-10 flex items-center justify-center text-sm text-gray-400 cursor-pointer hover:bg-gray-50 rounded-lg transition-all duration-200"
        >
          {prevDay}
        </div>
      );
    }

    // Add current month days
    for (let day = 1; day <= lastDayOfMonth; day++) {
      const hasEvent = day % 7 === 0 || day % 11 === 0 || day % 15 === 0;
      const isToday = day === currentDay;
      const isWeekend = new Date(currentYear, currentMonth, day).getDay() === 0 || 
                       new Date(currentYear, currentMonth, day).getDay() === 6;

      calendarCells.push(
        <div
          key={`day-${day}`}
          className={`
            relative h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all duration-300 
            ${isToday 
              ? 'bg-teal-600 text-white font-semibold shadow-lg' 
              : isWeekend 
                ? 'text-gray-500 hover:bg-red-50' 
                : 'text-gray-900 hover:bg-teal-50'
            }
            ${hasEvent && !isToday ? 'font-medium' : ''}
          `}
          title={hasEvent ? `Event on ${day}` : ''}
        >
          {day}
          {hasEvent && (
            <div className={`absolute bottom-1 flex gap-0.5`}>
              <span className={`w-1 h-1 rounded-full ${isToday ? 'bg-white' : 'bg-teal-500'}`}></span>
              {day % 15 === 0 && (
                <span className={`w-1 h-1 rounded-full ${isToday ? 'bg-white' : 'bg-blue-500'}`}></span>
              )}
            </div>
          )}
        </div>
      );
    }

    // Add next month's leading days to fill the grid
    const totalCells = calendarCells.length;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    
    for (let day = 1; day <= remainingCells; day++) {
      calendarCells.push(
        <div 
          key={`next-${day}`} 
          className="h-10 flex items-center justify-center text-sm text-gray-400 cursor-pointer hover:bg-gray-50 rounded-lg transition-all duration-200"
        >
          {day}
        </div>
      );
    }

    return calendarCells;
  };

  return (
    <div className="w-full min-h-screen flex bg-cyan-50">
      <div className="w-full flex bg-white overflow-hidden h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-teal-900 text-white p-5 flex flex-col transition-all duration-300">
          <div className="flex items-center p-4 mb-8 border-b border-white/10">
            <span className="text-2xl mr-3">🏫</span>
            <h2 className="text-lg font-medium tracking-wide">Faculty Portal</h2>
          </div>
          
          <nav className="flex-1">
            <a href="#" className="flex items-center p-3 text-white no-underline text-sm font-normal rounded-xl mb-3 bg-teal-600 shadow-lg shadow-teal-600/30">
              <span className="mr-3 text-lg">📊</span> Dashboard
            </a>
            <a href="#" className="flex items-center p-3 text-white no-underline text-sm font-normal rounded-xl mb-3 hover:bg-white/10 transition-all duration-300">
              <span className="mr-3 text-lg">👥</span> Attendance
            </a>
            <a href="#" className="flex items-center p-3 text-white no-underline text-sm font-normal rounded-lg mb-3 hover:bg-white/10 transition-all duration-300">
              <span className="mr-3 text-lg">📝</span> Leave
            </a>
            <a href="#" className="flex items-center p-3 text-white no-underline text-sm font-normal rounded-lg mb-3 hover:bg-white/10 transition-all duration-300">
              <span className="mr-3 text-lg">⚙️</span> Settings
            </a>
          </nav>
          
          <div className="pt-4 text-xs text-gray-400 text-center mt-auto">
            <p>© 2025 Faculty System</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-cyan-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-5 bg-white shadow-sm sticky top-0 z-50">
            <h1 className="text-2xl font-semibold text-teal-900">Faculty Dashboard</h1>
            <div className="flex items-center gap-3">
              <div className="mr-5 text-sm text-slate-600">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              
              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative cursor-pointer w-10 h-10 bg-transparent border-none flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <Bell size={20} className="text-slate-600" />
                  <span className="absolute -top-1 -right-1 bg-teal-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">3</span>
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
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-teal-300 transition-all duration-200"
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

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col gap-5">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-teal-900 to-teal-600 rounded-xl p-6 flex items-center text-white shadow-lg relative overflow-hidden">
              <div className="absolute -top-5 -right-5 w-48 h-48 bg-white/5 rounded-full"></div>
              <div className="relative mr-5">
                <img
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                  src="https://megaphone.southwestern.edu/wp-content/uploads/2018/03/birger-kollmeier-910261_960_720.jpg"
                  alt="Profile"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-medium mb-1">{greeting}, Prof. M.M. Sati!</h2>
                <p className="text-sm opacity-90">Have a productive day at work!</p>
              </div>
              <button
                className="px-6 py-3 border-none rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg bg-green-500 text-white z-10 relative"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  punchIn();
                }}
                type="button"
              >
                Punch In
              </button>
            </div>

            {/* Progress Section */}
            <div className="bg-white rounded-xl p-5 shadow-lg border border-teal-100">
              <h3 className="text-base mb-4 text-teal-900">Today's Progress</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-cyan-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-teal-600">{progress}%</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white rounded-xl p-5 flex items-center shadow-lg border border-teal-100 transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl mr-4 w-12 h-12 flex items-center justify-center bg-cyan-50 rounded-xl text-teal-600">
                  ⏱️
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-slate-600 mb-1">Hours Worked</h3>
                  <p className="text-2xl font-semibold text-teal-900 mb-1">36</p>
                  <p className="text-xs text-emerald-600">+2 from last week</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 flex items-center shadow-lg border border-teal-100 transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl mr-4 w-12 h-12 flex items-center justify-center bg-cyan-50 rounded-xl text-teal-600">
                  ✅
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-slate-600 mb-1">Tasks Completed</h3>
                  <p className="text-2xl font-semibold text-teal-900 mb-1">12</p>
                  <p className="text-xs text-emerald-600">+3 from last week</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 flex items-center shadow-lg border border-teal-100 transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl mr-4 w-12 h-12 flex items-center justify-center bg-cyan-50 rounded-xl text-teal-600">
                  🗓️
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-slate-600 mb-1">Leaves Taken</h3>
                  <p className="text-2xl font-semibold text-teal-900 mb-1">2</p>
                  <p className="text-xs text-slate-600">Same as last month</p>
                </div>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
              {/* Calendar Section */}
              <div className="xl:col-span-3 bg-white rounded-xl p-5 shadow-lg border border-teal-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-semibold text-teal-900">Calendar</h3>
                  <button className="border-none bg-transparent text-teal-600 text-sm cursor-pointer hover:underline">
                    View All
                  </button>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-2 hover:bg-teal-50 rounded-lg transition-colors">
                      <span className="text-teal-600">‹</span>
                    </button>
                    <h3 className="text-lg font-semibold text-teal-900">
                      {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
                    </h3>
                    <button className="p-2 hover:bg-teal-50 rounded-lg transition-colors">
                      <span className="text-teal-600">›</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {/* Days of week headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                      <div key={`header-${i}`} className="text-center font-semibold text-xs p-2 text-teal-700 uppercase tracking-wide">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendar()}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                        <span>Events</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Meetings</span>
                      </div>
                    </div>
                    <span className="text-teal-600 font-medium">Today: {new Date().getDate()}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="xl:col-span-2 bg-white rounded-xl p-5 shadow-lg border border-teal-100">
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-teal-900">Quick Actions</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center p-4 bg-cyan-50 border border-teal-200 rounded-xl transition-all duration-300 hover:bg-cyan-100 hover:-translate-y-0.5 cursor-pointer">
                    <span className="text-2xl mb-2 text-teal-600">📝</span>
                    <span className="text-xs font-medium text-teal-900">Request Leave</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-cyan-50 border border-teal-200 rounded-xl transition-all duration-300 hover:bg-cyan-100 hover:-translate-y-0.5 cursor-pointer">
                    <span className="text-2xl mb-2 text-teal-600">📁</span>
                    <span className="text-xs font-medium text-teal-900">Submit Report</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-cyan-50 border border-teal-200 rounded-xl transition-all duration-300 hover:bg-cyan-100 hover:-translate-y-0.5 cursor-pointer">
                    <span className="text-2xl mb-2 text-teal-600">📅</span>
                    <span className="text-xs font-medium text-teal-900">Schedule Meeting</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-cyan-50 border border-teal-200 rounded-xl transition-all duration-300 hover:bg-cyan-100 hover:-translate-y-0.5 cursor-pointer">
                    <span className="text-2xl mb-2 text-teal-600">📊</span>
                    <span className="text-xs font-medium text-teal-900">Generate Report</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Options Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="bg-white rounded-xl p-5 flex items-center shadow-lg border border-teal-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" onClick={goToWeeklyGraph}>
                <div className="text-2xl w-12 h-12 flex items-center justify-center bg-cyan-50 rounded-xl mr-4 text-teal-600">
                  📈
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-teal-900 mb-1">View Graphs</h3>
                  <p className="text-xs text-slate-600">Check attendance and performance statistics</p>
                </div>
                <div className="text-xl text-teal-600 opacity-70 transition-all duration-300 hover:translate-x-1 hover:opacity-100">
                  →
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 flex items-center shadow-lg border border-teal-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" onClick={goTostats}>
                <div className="text-2xl w-12 h-12 flex items-center justify-center bg-cyan-50 rounded-xl mr-4 text-teal-600">
                  📊
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-teal-900 mb-1">Stats</h3>
                  <p className="text-xs text-slate-600">Visual representation of your work trends</p>
                </div>
                <div className="text-xl text-teal-600 opacity-70 transition-all duration-300 hover:translate-x-1 hover:opacity-100">
                  →
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 flex items-center shadow-lg border border-teal-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" onClick={goToSchedule}>
                <div className="text-2xl w-12 h-12 flex items-center justify-center bg-cyan-50 rounded-xl mr-4 text-teal-600">
                  📅
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-teal-900 mb-1">Schedule</h3>
                  <p className="text-xs text-slate-600">View and manage your upcoming schedule</p>
                </div>
                <div className="text-xl text-teal-600 opacity-70 transition-all duration-300 hover:translate-x-1 hover:opacity-100">
                  →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;