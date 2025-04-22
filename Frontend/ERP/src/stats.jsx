<<<<<<< HEAD
import { Clock, ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import "./stats.css";

// Sample teacher data for Mr. John Doe
const teacherData = {
  name: "Mr. John Doe",
  subject: "Mathematics",
  avatar: "👨‍🏫",
  weeklyStats: {
    logged: 27.5,
    weeklyRequirement: 40,
    pending: 12.5,
    workingDays: 5,
    punchData: [
      { day: "Monday", in: "07:45", out: "15:30", classes: 5 },
      { day: "Tuesday", in: "08:00", out: "16:15", classes: 4 },
      { day: "Wednesday", in: "07:30", out: "15:45", classes: 6 },
      { day: "Thursday", in: "", out: "", classes: 5 },
      { day: "Friday", in: "", out: "", classes: 4 },
    ],
=======
import { Clock, User, Home, ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";

// Sample teacher data for multiple teachers
const teachersData = {
  sarah: {
    name: "Ms. Sarah Johnson",
    subject: "Mathematics",
    avatar: "👩‍🏫",
    weeklyStats: {
      logged: 27.5,
      weeklyRequirement: 40,
      pending: 12.5,
      workingDays: 5,
      punchData: [
        { day: "Monday", in: "07:45", out: "15:30", classes: 5 },
        { day: "Tuesday", in: "08:00", out: "16:15", classes: 4 },
        { day: "Wednesday", in: "07:30", out: "15:45", classes: 6 },
        { day: "Thursday", in: "", out: "", classes: 5 },
        { day: "Friday", in: "", out: "", classes: 4 },
      ],
    }
  },
  michael: {
    name: "Mr. Michael Chen",
    subject: "Science",
    avatar: "👨‍🔬",
    weeklyStats: {
      logged: 32.0,
      weeklyRequirement: 35,
      pending: 3.0,
      workingDays: 5,
      punchData: [
        { day: "Monday", in: "08:15", out: "16:30", classes: 4 },
        { day: "Tuesday", in: "08:00", out: "16:00", classes: 5 },
        { day: "Wednesday", in: "08:30", out: "17:00", classes: 6 },
        { day: "Thursday", in: "08:00", out: "16:45", classes: 5 },
        { day: "Friday", in: "", out: "", classes: 4 },
      ],
    }
  },
  james: {
    name: "Mr. James Wilson",
    subject: "English",
    avatar: "👨‍🏫",
    weeklyStats: {
      logged: 18.5,
      weeklyRequirement: 30,
      pending: 11.5,
      workingDays: 4,
      punchData: [
        { day: "Monday", in: "09:00", out: "15:00", classes: 4 },
        { day: "Tuesday", in: "09:15", out: "16:30", classes: 5 },
        { day: "Wednesday", in: "", out: "", classes: 4 },
        { day: "Thursday", in: "09:00", out: "", classes: 3 },
      ],
    }
  },
  maria: {
    name: "Ms. Maria Garcia",
    subject: "History",
    avatar: "👩‍🎓",
    weeklyStats: {
      logged: 24.0,
      weeklyRequirement: 32,
      pending: 8.0,
      workingDays: 5,
      punchData: [
        { day: "Monday", in: "08:30", out: "15:30", classes: 5 },
        { day: "Tuesday", in: "08:15", out: "14:45", classes: 4 },
        { day: "Wednesday", in: "08:00", out: "16:00", classes: 5 },
        { day: "Thursday", in: "", out: "", classes: 4 },
        { day: "Friday", in: "", out: "", classes: 3 },
      ],
    }
  },
  david: {
    name: "Mr. David Brown",
    subject: "Physical Education",
    avatar: "🏃‍♂️",
    weeklyStats: {
      logged: 30.0,
      weeklyRequirement: 36,
      pending: 6.0,
      workingDays: 5,
      punchData: [
        { day: "Monday", in: "07:30", out: "15:30", classes: 6 },
        { day: "Tuesday", in: "07:45", out: "15:45", classes: 6 },
        { day: "Wednesday", in: "07:30", out: "15:30", classes: 6 },
        { day: "Thursday", in: "08:00", out: "16:00", classes: 6 },
        { day: "Friday", in: "", out: "", classes: 6 },
      ],
    }
>>>>>>> 75b86fb64e4cf103c1d9e3ad790a4180f880d2a8
  }
};

// Helper function to format hours from decimal to hours and minutes
function formatHours(decimalHours) {
  const h = Math.floor(decimalHours);
  const m = Math.round((decimalHours - h) * 60);
  return `${h}h ${m}m`;
}

<<<<<<< HEAD
function TeacherTimeTracking() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
=======
export default function TeacherTimeTracking() {
  const [selectedTeacher, setSelectedTeacher] = useState("sarah");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isChangingTeacher, setIsChangingTeacher] = useState(false);
  
  const teacherData = teachersData[selectedTeacher];
>>>>>>> 75b86fb64e4cf103c1d9e3ad790a4180f880d2a8
  const { weeklyStats } = teacherData;
  const percentDone = Math.round((weeklyStats.logged / weeklyStats.weeklyRequirement) * 100);
  const neededMore = weeklyStats.weeklyRequirement - weeklyStats.logged;
  const remainingWorkDays = weeklyStats.punchData.filter(day => !day.in).length;
  const perDay = remainingWorkDays > 0 ? neededMore / remainingWorkDays : 0;

  // Animation effect on page load
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

<<<<<<< HEAD
  // Handle back button click
  const BackHome = () => {
    // Replace with actual navigation logic
    console.log("Navigate back to Dashboard");
  };

  return (
    <div className="container">
      <div className={`teacher-tracking-dashboard ${isPageLoaded ? 'fadeIn' : ''}`}>
        {/* Back Button */}
        <button className="back-button" onClick={BackHome}>
          <ArrowLeft size={18} />
=======
  // Handle teacher selection change
  const handleTeacherChange = (e) => {
    setIsChangingTeacher(true);
    setTimeout(() => {
      setSelectedTeacher(e.target.value);
      setIsChangingTeacher(false);
    }, 300);
  };

  // Handle back button click (simulated)
  const handleBackClick = () => {
    alert("Navigating back to home page...");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={handleBackClick}
          className="mb-4 flex items-center text-teal-700 hover:text-teal-900 transition-colors duration-300 group"
        >
          <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform duration-300" />
>>>>>>> 75b86fb64e4cf103c1d9e3ad790a4180f880d2a8
          <span>Back to Home</span>
        </button>

        {/* Teacher Profile Card */}
<<<<<<< HEAD
        <div className="teacher-profile">
          <div className="teacher-info">
            <div className="teacher-avatar">
              {teacherData.avatar}
            </div>
            <div className="teacher-details">
              <h1>{teacherData.name}</h1>
              <p>{teacherData.subject} Teacher</p>
            </div>
          </div>
          <div className="week-display">
            Current Week
=======
        <div className={`bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-center transform transition-all duration-500 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${isChangingTeacher ? 'scale-95 opacity-50' : ''}`}>
          <div className="flex items-center">
            <div className="bg-teal-100 rounded-full p-3 mr-4 text-2xl shadow-sm">
              {teacherData.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{teacherData.name}</h1>
              <p className="text-gray-600">{teacherData.subject} Teacher</p>
            </div>
          </div>
          <div className="mt-3 sm:mt-0 flex items-center">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Current Week
            </div>
>>>>>>> 75b86fb64e4cf103c1d9e3ad790a4180f880d2a8
          </div>
        </div>

        {/* Time Tracking Dashboard */}
<<<<<<< HEAD
        <section className="time-tracking-section">
          <h2>Teaching Hours Dashboard</h2>
          
          <div className="time-stats-grid">
            {/* Total Hours */}
            <div className="time-stat-box">
              <div className="time-stat-value">
                {formatHours(weeklyStats.logged)} <Clock size={18} />
              </div>
              <div className="time-stat-label">Teaching Hours This Week</div>
            </div>
            
            {/* Weekly Requirement */}
            <div className="time-stat-box">
              <div className="time-stat-value">{formatHours(weeklyStats.weeklyRequirement)}</div>
              <div className="time-stat-label">Weekly Requirement</div>
            </div>
            
            {/* Pending */}
            <div className="time-stat-box">
              <div className="time-stat-value">{formatHours(weeklyStats.pending)}</div>
              <div className="time-stat-label">Pending Hours</div>
            </div>
            
            {/* Working days */}
            <div className="time-stat-box">
              <div className="time-stat-value">{weeklyStats.workingDays}</div>
              <div className="time-stat-label">Teaching Days This Week</div>
            </div>
          </div>
          
          <div className="dashboard-content">
            {/* Circle Progress */}
            <div className="progress-container">
              <div className="circle-progress">
                <svg viewBox="0 0 100 100">
=======
        <section className={`w-full mx-auto rounded-xl bg-teal-100 shadow-xl p-4 sm:p-6 transform transition-all duration-500 ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${isChangingTeacher ? 'scale-95 opacity-50' : ''}`}>
          <h2 className="text-lg font-semibold mb-4 sm:mb-6 text-teal-800">Teaching Hours Dashboard</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
            {/* Total Hours */}
            <div className="bg-teal-200 rounded-lg p-3 sm:p-4 flex flex-col justify-between items-center shadow hover:shadow-md transition-all duration-300 hover:bg-teal-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-base sm:text-lg">
                {formatHours(weeklyStats.logged)} <Clock size={18} className="animate-pulse" />
              </div>
              <div className="text-xs text-gray-700 pt-2 text-center">Teaching Hours<br/>This Week</div>
            </div>
            
            {/* Weekly Requirement */}
            <div className="bg-teal-200 rounded-lg p-3 sm:p-4 flex flex-col justify-between items-center shadow hover:shadow-md transition-all duration-300 hover:bg-teal-300 hover:-translate-y-1">
              <div className="font-bold text-base sm:text-lg text-teal-800">{formatHours(weeklyStats.weeklyRequirement)}</div>
              <div className="text-xs text-gray-700 pt-2 text-center">Weekly<br />Requirement</div>
            </div>
            
            {/* Pending */}
            <div className="bg-teal-200 rounded-lg p-3 sm:p-4 flex flex-col justify-between items-center shadow hover:shadow-md transition-all duration-300 hover:bg-teal-300 hover:-translate-y-1">
              <div className="font-bold text-base sm:text-lg text-teal-800">{formatHours(weeklyStats.pending)}</div>
              <div className="text-xs text-gray-700 pt-2 text-center">Pending<br />Hours</div>
            </div>
            
            {/* Working days */}
            <div className="bg-teal-200 rounded-lg p-3 sm:p-4 flex flex-col justify-between items-center shadow hover:shadow-md transition-all duration-300 hover:bg-teal-300 hover:-translate-y-1">
              <div className="font-bold text-base sm:text-lg text-teal-800">{weeklyStats.workingDays}</div>
              <div className="text-xs text-gray-700 pt-2 text-center">Teaching Days<br/>This Week</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Circle Progress */}
            <div className="bg-teal-200 rounded-lg flex flex-col items-center justify-center p-3 shadow hover:shadow-md transition-all duration-300 hover:bg-teal-300 hover:-translate-y-1">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 my-2 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
>>>>>>> 75b86fb64e4cf103c1d9e3ad790a4180f880d2a8
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#D1E5E7"
                    strokeWidth="9"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#0D9488"
                    strokeWidth="9"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - percentDone / 100)}
                    fill="none"
                    strokeLinecap="round"
<<<<<<< HEAD
=======
                    className="transition-all duration-1000 ease-out"
>>>>>>> 75b86fb64e4cf103c1d9e3ad790a4180f880d2a8
                  />
                  <text x="50" y="54" textAnchor="middle" fontSize="23" fill="#0D9488" fontWeight="bold">{percentDone}%</text>
                </svg>
              </div>
<<<<<<< HEAD
              <div className="progress-text">{formatHours(weeklyStats.logged)}/{formatHours(weeklyStats.weeklyRequirement)}</div>
            </div>
            
            <div>
              {/* "You need X more hours" */}
              <div className="hours-needed">
                <span>You need {formatHours(neededMore)} more hours this week</span>
                <span>Averaging <span>{formatHours(perDay)}</span> per day</span>
              </div>
              
              {/* Punch Table */}
              <div className="punch-table-container">
                <table className="punch-table">
                  <thead>
                    <tr>
                      <th>DAY</th>
                      <th>IN</th>
                      <th>OUT</th>
                      <th>CLASSES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyStats.punchData.map((row) => (
                      <tr key={row.day}>
                        <td>{row.day}</td>
                        <td>{row.in || <span className="missing-time">-</span>}</td>
                        <td>{row.out || <span className="missing-time">-</span>}</td>
                        <td>{row.classes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
=======
              <div className="text-sm font-bold text-teal-800">{formatHours(weeklyStats.logged)}/{formatHours(weeklyStats.weeklyRequirement)}</div>
            </div>
            
            {/* "You need X more hours" */}
            <div className="bg-teal-200 rounded-lg p-3 shadow hover:shadow-md transition-all duration-300 hover:bg-teal-300 hover:-translate-y-1 flex flex-col justify-center items-center text-sm text-teal-800">
              <span className="text-xs text-gray-600 pb-2">You need {formatHours(neededMore)} more hours this week</span>
              <span>Averaging <span className="font-bold">{formatHours(perDay)}</span> per day</span>
            </div>
            
            {/* Punch Table */}
            <div className="col-span-1 sm:col-span-2 bg-teal-200 rounded-lg p-3 shadow hover:shadow-md transition-all duration-300 hover:bg-teal-300 hover:-translate-y-1">
              <table className="w-full text-left text-teal-800">
                <thead>
                  <tr className="text-xs font-semibold border-b border-teal-300">
                    <th className="py-1">DAY</th>
                    <th className="py-1">IN</th>
                    <th className="py-1">OUT</th>
                    <th className="py-1">CLASSES</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyStats.punchData.map((row, index) => (
                    <tr 
                      key={row.day} 
                      className={`text-xs sm:text-sm hover:bg-teal-100 transition-colors duration-200 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <td className="py-1">{row.day}</td>
                      <td className="py-1">{row.in || <span className="text-gray-400">-</span>}</td>
                      <td className="py-1">{row.out || <span className="text-gray-400">-</span>}</td>
                      <td className="py-1">{row.classes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Teacher Selection */}
          <div className="mt-6 p-3 bg-teal-50 rounded-lg border border-teal-200 transform transition-all duration-500 hover:shadow-md">
            <label htmlFor="teacherSelect" className="block text-sm font-medium text-teal-800 mb-2">
              Select Teacher:
            </label>
            <select 
              id="teacherSelect" 
              value={selectedTeacher}
              onChange={handleTeacherChange}
              className="bg-white border border-teal-300 text-teal-800 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 transition-colors duration-300 hover:border-teal-500"
            >
              <option value="sarah">Ms. Sarah Johnson - Mathematics</option>
              <option value="michael">Mr. Michael Chen - Science</option>
              <option value="james">Mr. James Wilson - English</option>
              <option value="maria">Ms. Maria Garcia - History</option>
              <option value="david">Mr. David Brown - Physical Education</option>
            </select>
>>>>>>> 75b86fb64e4cf103c1d9e3ad790a4180f880d2a8
          </div>
        </section>
      </div>
    </div>
  );
<<<<<<< HEAD
}

export default TeacherTimeTracking;
=======
}
>>>>>>> 75b86fb64e4cf103c1d9e3ad790a4180f880d2a8
