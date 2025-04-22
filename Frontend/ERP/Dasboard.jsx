import { useState, useEffect } from 'react';
import { Clock, Calendar, AlertTriangle, Timer, CheckCircle, LogOut } from 'lucide-react';

function FacultyDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [progress, setProgress] = useState(60);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [hoursToday, setHoursToday] = useState({ hours: 3, minutes: 45 });
  const [totalHours, setTotalHours] = useState({ current: 21, target: 35 });
  const [remainingHours, setRemainingHours] = useState({ hours: 14, minutes: 0 });
  const [animateStats, setAnimateStats] = useState(false);
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    // Trigger animation on mount
    setAnimateStats(true);
    
    return () => clearInterval(timer);
  }, []);
  
  // Update hours when punched in
  useEffect(() => {
    let workTimer;
    if (isPunchedIn) {
      workTimer = setInterval(() => {
        setHoursToday(prev => {
          let newMinutes = prev.minutes + 1;
          let newHours = prev.hours;
          
          if (newMinutes >= 60) {
            newMinutes = 0;
            newHours += 1;
          }
          
          // Update remaining hours
          const newRemainingMinutes = remainingHours.minutes > 0 ? remainingHours.minutes - 1 : 59;
          const newRemainingHours = newRemainingMinutes === 59 ? remainingHours.hours - 1 : remainingHours.hours;
          
          setRemainingHours({ hours: newRemainingHours, minutes: newRemainingMinutes });
          
          // Update progress
          const totalWorkedMinutes = (newHours * 60) + newMinutes;
          const targetMinutes = totalHours.target * 60;
          const newProgress = Math.min(Math.round((totalWorkedMinutes / targetMinutes) * 100), 100);
          setProgress(newProgress);
          
          return { hours: newHours, minutes: newMinutes };
        });
      }, 60000); // Update every minute in real app (using 1000 for demo)
    }
    
    return () => clearInterval(workTimer);
  }, [isPunchedIn, remainingHours.hours, remainingHours.minutes, totalHours.target]);
  
  // Handle punch in/out
  const handlePunchToggle = () => {
    setIsPunchedIn(!isPunchedIn);
    setAnimateStats(true);
    
    if (!isPunchedIn) {
      // Logic for when punching in
    } else {
      // Logic for when punching out
      // Update total hours for the week
      setTotalHours(prev => ({
        ...prev,
        current: prev.current + (hoursToday.hours / 24) // This is simplified
      }));
    }
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div 
          key={i} 
          className={`flex items-center justify-center w-8 h-8 text-sm transition-all duration-300 hover:bg-blue-100 
            ${i === currentDay ? 'bg-blue-500 text-white rounded-full font-medium' : 'hover:rounded-full'}`}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-500 ease-in-out">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - visible on desktop */}
          <div className="hidden lg:flex lg:w-64 bg-blue-800 text-white flex-col">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Faculty Portal</h2>
              <nav>
                <a href="#" className="flex items-center py-3 px-4 bg-blue-900 rounded-lg mb-2">
                  <Clock className="mr-3" size={18} />
                  <span>Time Tracking</span>
                </a>
                <a href="#" className="flex items-center py-3 px-4 hover:bg-blue-700 rounded-lg mb-2 opacity-75">
                  <Calendar className="mr-3" size={18} />
                  <span>Schedule</span>
                </a>
                <a href="#" className="flex items-center py-3 px-4 hover:bg-blue-700 rounded-lg mb-2 opacity-75">
                  <svg className="mr-3" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6H12.01M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Courses</span>
                </a>
                <a href="#" className="flex items-center py-3 px-4 hover:bg-blue-700 rounded-lg opacity-75">
                  <svg className="mr-3" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Profile</span>
                </a>
              </nav>
            </div>
            <div className="mt-auto p-6">
              <div className="flex items-center">
                <LogOut size={18} className="mr-3" />
                <span>Logout</span>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 py-5 px-6 text-white">
              <h1 className="text-xl md:text-2xl font-bold text-center tracking-wider">FACULTY WORK HOURS TRACKER</h1>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Welcome Section with Photo */}
              <div className="mb-8 flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                  Welcome, Prof. Sharma
                </h2>
                <div className="relative mb-2">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
                    <img 
                      src="/api/placeholder/200/200" 
                      alt="Professor Sharma" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white ${isPunchedIn ? 'animate-pulse' : ''}`}></div>
                </div>
                <p className="text-blue-600 font-medium">Computer Science Department</p>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Hours Today */}
                <div className={`bg-white p-5 rounded-xl shadow-md border border-gray-100 transition-all duration-500 ${animateStats ? 'transform-gpu scale-100 opacity-100' : 'transform-gpu scale-95 opacity-0'}`}
                     style={{transitionDelay: '0ms'}}>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-medium">Hours Today</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{hoursToday.hours} h {hoursToday.minutes} m</p>
                  {isPunchedIn && <p className="text-green-600 text-sm mt-2 flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Currently Working
                  </p>}
                </div>
                
                {/* This Week */}
                <div className={`bg-white p-5 rounded-xl shadow-md border border-gray-100 transition-all duration-500 ${animateStats ? 'transform-gpu scale-100 opacity-100' : 'transform-gpu scale-95 opacity-0'}`}
                     style={{transitionDelay: '100ms'}}>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-medium">This Week</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{totalHours.current}h / {totalHours.target}h</p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(totalHours.current / totalHours.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Remaining */}
                <div className={`bg-white p-5 rounded-xl shadow-md border border-gray-100 transition-all duration-500 ${animateStats ? 'transform-gpu scale-100 opacity-100' : 'transform-gpu scale-95 opacity-0'}`}
                     style={{transitionDelay: '200ms'}}>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Timer className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-medium">Remaining</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{remainingHours.hours} h {remainingHours.minutes} m</p>
                  <p className="text-gray-500 text-sm mt-2">To complete weekly target</p>
                </div>
                
                {/* Shortfall Warning */}
                <div className={`bg-white p-5 rounded-xl shadow-md border border-gray-100 transition-all duration-500 ${animateStats ? 'transform-gpu scale-100 opacity-100' : 'transform-gpu scale-95 opacity-0'}`}
                     style={{transitionDelay: '300ms'}}>
                  <div className="flex items-center text-gray-600 mb-3">
                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                    <span className="font-medium">Shortfall Warning</span>
                  </div>
                  {remainingHours.hours > 10 ? (
                    <div className="flex items-center text-amber-600">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      <span>You may not meet your weekly target</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>On track to meet weekly target</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Punch In/Out Button */}
              <div className="mb-8">
                <button 
                  onClick={handlePunchToggle}
                  className={`w-full py-4 px-6 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg flex items-center justify-center ${
                    isPunchedIn 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isPunchedIn ? (
                    <>
                      <LogOut className="mr-2 h-5 w-5" />
                      Punch Out
                    </>
                  ) : (
                    <>
                      <Clock className="mr-2 h-5 w-5" />
                      Punch In
                    </>
                  )}
                  <span className={`ml-2 w-2 h-2 rounded-full ${isPunchedIn ? 'bg-white animate-ping' : 'bg-transparent'}`}></span>
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-8 flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-gray-700 font-medium text-lg">{progress}%</span>
              </div>
              
              {/* Mini Calendar */}
              <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 mb-6">
                <h3 className="text-lg font-medium mb-4 text-gray-800">Mini Calendar</h3>
                
                {/* Calendar Header */}
                <div className="grid grid-cols-7 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="text-center font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default FacultyDashboard