import { useState, useEffect, useRef } from 'react';
import { Clock, Calendar, AlarmClock, PieChart, Briefcase, X, CheckCircle, AlertCircle, Edit, LogOut } from 'lucide-react';

export default function WorkPulseApp() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [hoursWorkedToday, setHoursWorkedToday] = useState(0);
  const [hoursWorkedWeek, setHoursWorkedWeek] = useState(28.5);
  const [requiredWeeklyHours, setRequiredWeeklyHours] = useState(40);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  // Get current time of day for greeting
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Handle clicks outside the profile menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Format date as Day, Month DD, YYYY
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Format hours for display
  const formatHours = (hours) => {
    return hours.toFixed(1);
  };

  const initiateConfirmation = () => {
    setShowConfirmationPopup(true);
  };

  const cancelPunchIn = () => {
    setShowConfirmationPopup(false);
  };

  const confirmPunchIn = () => {
    const now = new Date();
    setPunchInTime(now);
    setIsPunchedIn(true);
    setPunchOutTime(null);
    setShowConfirmationPopup(false);
    setShowSuccessPopup(true);
    
    // Auto-hide success popup after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  const handlePunchOut = () => {
    if (isPunchedIn) {
      const now = new Date();
      setPunchOutTime(now);
      setIsPunchedIn(false);
      
      // Calculate hours worked
      const hoursWorked = (now - punchInTime) / (1000 * 60 * 60);
      setHoursWorkedToday(prev => prev + hoursWorked);
      setHoursWorkedWeek(prev => prev + hoursWorked);
    }
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

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

  const weeklyProgressPercentage = Math.min((hoursWorkedWeek / requiredWeeklyHours) * 100, 100);

  return (
    <div className="w-full max-w-full m-0 p-8 bg-gradient-to-br from-cyan-50 to-teal-50 min-h-screen font-sans">
      {/* Main Content */}
      <main className="relative min-h-full">
        {/* Header Card */}
        <div className="bg-teal-700 rounded-xl shadow-sm p-5 mb-6">
          <div className="flex justify-between items-center">
            {/* Left side with greeting and back button */}
            <div className="flex items-center">
              <div 
                className="w-15 h-15 rounded-full overflow-hidden mr-4 border-3 border-teal-300 cursor-pointer"
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
                <p className="text-sm text-white">Have a productive day at work!</p>
              </div>
            </div>
            
            {/* Right side with profile button */}
            <div className="relative" ref={profileMenuRef}>
              <button 
                onClick={handleProfileClick}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-300 p-0 bg-transparent cursor-pointer"
              >
                <img 
                  src="https://megaphone.southwestern.edu/wp-content/uploads/2018/03/birger-kollmeier-910261_960_720.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </button>
              
              {showProfileMenu && (
                  <div className="absolute top-12 right-0 bg-white/95 backdrop-blur-md rounded-xl shadow-xl w-48 overflow-hidden z-20 border border-white/20">
                    <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100">
                      <div className="font-semibold text-teal-900">Prof. M.M. Sati</div>
                    </div>
                    <button 
                      onClick={handleEditProfile}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-teal-50 w-full text-left transition-colors border-none bg-transparent cursor-pointer"
                    >
                      <Edit size={16} className="text-teal-700" />
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
        
        {/* Confirmation Popup */}
        {showConfirmationPopup && (
          <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-11/12 max-w-md p-6 shadow-xl">
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  <AlertCircle className="text-teal-700" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Confirm Punch In</h3>
                  <p className="text-sm text-gray-600">
                    You are about to punch in at {formatTime(currentTime)}. 
                    This will be recorded as the start of your work session.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-6"> 
                <button 
                  onClick={confirmPunchIn}
                  className="flex-1 px-3 py-3 border-none rounded-xl text-white font-medium cursor-pointer transition-colors bg-teal-700 hover:bg-teal-800"
                >
                  Confirm Punch In
                </button>
                <button 
                  onClick={cancelPunchIn}
                  className="flex-1 px-3 py-3 border-none rounded-xl font-medium cursor-pointer transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed top-4 right-4 bg-white rounded-xl shadow-xl w-75 overflow-hidden z-50">
            <div className="flex justify-between items-center p-4 border-b border-gray-50">
              <div className="flex items-center">
                <CheckCircle size={20} className="text-teal-400 mr-2" />
                <h3 className="text-base font-semibold">Punched In Successfully</h3>
              </div>
              <button 
                onClick={() => setShowSuccessPopup(false)}
                className="bg-transparent border-none text-gray-500 cursor-pointer flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">You've successfully punched in at:</p>
              <p className="text-xl font-semibold text-teal-700">{formatTime(punchInTime)}</p>
            </div>
            <div className="h-1 bg-gray-50 overflow-hidden">
              <div className="h-full bg-teal-400 w-0 animate-[progress_3s_linear_forwards]"></div>
            </div>
          </div>
        )}
        
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 text-center">
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-teal-800 mb-2">
              {formatTime(currentTime)}
            </h2>
            <p className="flex items-center justify-center text-base text-gray-500">
              <Calendar size={14} className="mr-2" />
              {formatDate(currentTime)}
            </p>
          </div>

          {/* Punch Buttons */}
          <div className="flex gap-4 mb-6">
            <button 
              onClick={initiateConfirmation}
              disabled={isPunchedIn}
              className={`flex-1 flex items-center justify-center px-4 py-4 border-none rounded-xl text-white font-semibold transition-colors ${
                isPunchedIn 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-teal-700 hover:bg-teal-800 cursor-pointer'
              }`}
            >
              <Clock size={18} className="mr-2" />
              Punch In
            </button>
            <button 
              onClick={handlePunchOut}
              disabled={!isPunchedIn}
              className={`flex-1 flex items-center justify-center px-4 py-4 border-none rounded-xl text-white font-semibold transition-colors ${
                !isPunchedIn 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-teal-400 hover:bg-teal-500 cursor-pointer'
              }`}
            >
              <Clock size={18} className="mr-2" />
              Punch Out
            </button>
          </div>

          {/* Time Display */}
          <div className="bg-teal-50 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-700 mr-2"></div>
                <span className="mr-2 text-gray-500 text-sm">Punch In:</span>
                <span className="font-semibold text-gray-800">
                  {punchInTime ? formatTime(punchInTime) : '--:--:--'}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-400 mr-2"></div>
                <span className="mr-2 text-gray-500 text-sm">Punch Out:</span>
                <span className="font-semibold text-gray-800">
                  {punchOutTime ? formatTime(punchOutTime) : '--:--:--'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <h3 className="text-xl font-semibold mb-4 text-teal-800">Time Summary</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Hours Today */}
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center">
              <AlarmClock className="text-teal-700" size={20} />
            </div>
            <div>
              <h3 className="text-xs text-gray-500 mb-1">Hours Today</h3>
              <div className="flex items-baseline">
                <p className="text-xl font-bold text-gray-800">{formatHours(hoursWorkedToday)}</p>
                <span className="ml-1 text-sm text-gray-500">hrs</span>
              </div>
            </div>
          </div>

          {/* Hours This Week */}
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center">
              <Briefcase className="text-teal-700" size={20} />
            </div>
            <div>
              <h3 className="text-xs text-gray-500 mb-1">Hours This Week</h3>
              <div className="flex items-baseline">
                <p className="text-xl font-bold text-gray-800">{formatHours(hoursWorkedWeek)}</p>
                <span className="ml-1 text-sm text-gray-500">hrs</span>
              </div>
            </div>
          </div>

          {/* Required Weekly Hours */}
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center">
              <PieChart className="text-teal-700" size={20} />
            </div>
            <div>
              <h3 className="text-xs text-gray-500 mb-1">Required Weekly</h3>
              <div className="flex items-baseline">
                <p className="text-xl font-bold text-gray-800">{formatHours(requiredWeeklyHours)}</p>
                <span className="ml-1 text-sm text-gray-500">hrs</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Weekly Progress */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-semibold mb-4 text-teal-800">Weekly Progress</h3>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-teal-700 to-teal-400 rounded-full transition-all duration-300"
              style={{ width: `${weeklyProgressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{formatHours(hoursWorkedWeek)} hrs</span>
            <span>{formatHours(requiredWeeklyHours)} hrs</span>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}