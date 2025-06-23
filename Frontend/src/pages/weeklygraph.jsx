import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Clock, CheckCircle, XCircle, Award, Edit, LogOut, BarChart2, ClipboardList } from 'lucide-react';

// Static data
const weeklyData = [
  { day: 'Mon', required: 6, actual: 6 },
  { day: 'Tue', required: 6, actual: 8 },
  { day: 'Wed', required: 6, actual: 7 },
  { day: 'Thu', required: 6, actual: 9 },
  { day: 'Fri', required: 6, actual: 5 },
  { day: 'Sat', required: 6, actual: 4 },
  { day: 'Sun', required: 0, actual: 0 },
].map(day => ({
  ...day,
  status: day.actual >= day.required ? 'completed' : 'undercompleted',
}));

// Stats
const totalRequired = weeklyData.reduce((sum, d) => sum + d.required, 0);
const totalActual = weeklyData.reduce((sum, d) => sum + d.actual, 0);
const completedDays = weeklyData.filter(d => d.status === 'completed').length;
const complianceRate = Math.round((completedDays / (weeklyData.length - 1)) * 100);
const dailyAverage = (totalActual / (weeklyData.length - 1)).toFixed(1);
const weeklyBalance = totalActual - totalRequired;
const weeklyBalanceStatus = weeklyBalance >= 0 ? 'surplus' : 'deficit';

function WeeklyGraph() {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [activeTab, setActiveTab] = useState('graph');
    const profileMenuRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % weeklyData.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuRef]);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleEditProfile = () => {
    alert("Edit profile functionality would open here");
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    navigate('/');
    setShowProfileMenu(false);
  };

  const handleDashboardClick = () => {
    navigate('/Dashboard');
  };

  const handleGraphTypeChange = (value) => {
    if (value === 'monthly') {
      navigate('/monthly-graph'); 
    } else if (value === 'weekly') {
      navigate('/weekly-graph');
    }
  };

  const handleToggleAnimation = () => setIsAnimating(!isAnimating);
  const animatedData = weeklyData.slice(0, activeIndex + 1);

  return (
    <div className="w-full max-w-7xl mx-auto bg-slate-50 shadow-2xl rounded-xl overflow-hidden font-inter">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-5 py-3 text-white flex flex-col lg:flex-row justify-between items-center border-b border-white/10">
        <div className="flex items-center mb-4 lg:mb-0">
          <div className="flex items-center cursor-pointer" onClick={handleDashboardClick}>
            <img 
              src="https://t4.ftcdn.net/jpg/00/66/63/61/360_F_66636165_W8DyCqGGHSJHJxOz3OUJWi7N6gb2NZwk.jpg" 
              alt="Logo" 
              className="w-10 h-10 bg-white rounded-full p-1 mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold">Prof. M.M Sati Weekly Hours</h2>
              <p className="text-sm opacity-80">Academic Year 2024-2025</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full lg:w-auto">
            <select
              defaultValue="weekly"
              onChange={(e) => handleGraphTypeChange(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 pr-10 text-sm font-medium text-white cursor-pointer transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 w-full lg:w-auto appearance-none"
            >
              <option value="weekly" className="bg-teal-600 text-white hover:bg-teal-700">Weekly Graph</option>
              <option value="monthly" className="bg-white text-teal-600 hover:bg-teal-50">Monthly Graph</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <button
            onClick={handleToggleAnimation}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm font-medium text-white cursor-pointer transition-all hover:bg-white/20 w-full lg:w-auto"
          >
            {isAnimating ? 'Pause Animation' : 'Resume Animation'}
          </button>
          
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={handleProfileClick}
              className="w-10 h-10 rounded-full border-2 border-white overflow-hidden cursor-pointer transition-all hover:border-white/70 hover:scale-105"
            >
              <img 
                src="https://megaphone.southwestern.edu/wp-content/uploads/2018/03/birger-kollmeier-910261_960_720.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </button>
            
            {showProfileMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in duration-200">
                <button 
                  onClick={handleEditProfile}
                  className="flex items-center w-full px-4 py-3 text-left text-slate-700 text-sm hover:bg-teal-50 transition-colors"
                >
                  <Edit size={16} className="mr-2 text-teal-600" />
                  Edit Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-left text-slate-700 text-sm hover:bg-teal-50 transition-colors"
                >
                  <LogOut size={16} className="mr-2 text-teal-600" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b border-slate-200">
          <button 
            className={`flex items-center gap-2 px-5 py-3 font-medium transition-all relative ${
              activeTab === 'graph' 
                ? 'text-teal-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-600' 
                : 'text-slate-500 hover:text-teal-700'
            }`}
            onClick={() => setActiveTab('graph')}
          >
            <BarChart2 size={18} />
            <span>Weekly Chart</span>
          </button>
          <button 
            className={`flex items-center gap-2 px-5 py-3 font-medium transition-all relative ${
              activeTab === 'breakdown' 
                ? 'text-teal-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-600' 
                : 'text-slate-500 hover:text-teal-700'
            }`}
            onClick={() => setActiveTab('breakdown')}
          >
            <ClipboardList size={18} />
            <span>Weekly Breakdown</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <Clock size={20} />
              <h3 className="text-slate-600 font-semibold">Weekly Hours</h3>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2">{totalActual}</div>
            <div className="text-sm text-slate-500">
              of {totalRequired} required
              <div className={`h-1 bg-slate-200 rounded-full mt-3 overflow-hidden`}>
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    weeklyBalanceStatus === 'surplus' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, (totalActual / totalRequired) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <Award size={20} />
              <h3 className="text-slate-600 font-semibold">Daily Average</h3>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2">{dailyAverage}</div>
            <div className="text-sm text-slate-500">hours per workday</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              {weeklyBalance >= 0 ? <CheckCircle size={20} /> : <XCircle size={20} />}
              <h3 className="text-slate-600 font-semibold">Weekly Balance</h3>
            </div>
            <div className={`text-3xl font-bold mb-2 ${
              weeklyBalanceStatus === 'surplus' ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {weeklyBalance >= 0 ? '+' : ''}{weeklyBalance}
            </div>
            <div className="text-sm text-slate-500">
              {weeklyBalance >= 0 ? 'surplus hours' : 'deficit hours'}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <CheckCircle size={20} />
              <h3 className="text-slate-600 font-semibold">Compliance</h3>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2">{complianceRate}%</div>
            <div className="text-sm text-slate-500">
              {completedDays} of {weeklyData.length - 1} days met
            </div>
          </div>
        </div>

        {activeTab === 'graph' ? (
          <>
            {/* Chart */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-8">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={animatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis domain={[0, 10]} stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="required"
                    name="Required Hours"
                    stroke="#0f766e"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#0f766e" }}
                    activeDot={{ r: 7 }}
                    isAnimationActive={isAnimating}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    name="Actual Hours"
                    stroke="#14b8a6"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#14b8a6" }}
                    activeDot={{ r: 7 }}
                    isAnimationActive={isAnimating}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Day</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Required</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actual</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Difference</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {animatedData.map((day, idx) => (
                    <tr 
                      key={day.day} 
                      className={`transition-all hover:bg-slate-50 ${
                        idx === activeIndex ? 'bg-teal-50 animate-pulse' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">{day.day}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{day.required}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{day.actual}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`font-semibold ${
                          day.actual >= day.required ? 'text-emerald-500' : 'text-red-500'
                        }`}>
                          {day.actual - day.required > 0 ? '+' : ''}{day.actual - day.required}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {day.status === 'completed' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            <CheckCircle size={14} /> Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            <XCircle size={14} /> Under
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          // Weekly Breakdown View
          <div className="space-y-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex justify-between items-end h-80 px-4">
                {weeklyData.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center flex-1">
                    <div className="text-sm font-semibold text-slate-700 mb-2">{day.day}</div>
                    <div className="flex items-end justify-center gap-2 h-56">
                      <div className="flex flex-col items-center">
                        <div 
                          className="w-6 bg-slate-300 rounded-t min-h-1 relative"
                          style={{ height: `${day.required * 25}px` }}
                        >
                          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-slate-600">
                            {day.required}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div 
                          className={`w-6 rounded-t min-h-1 relative ${
                            day.actual >= day.required ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                          style={{ height: `${day.actual * 25}px` }}
                        >
                          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-slate-600">
                            {day.actual}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm font-semibold">
                      {day.actual - day.required > 0 ? (
                        <span className="text-emerald-500">+{day.actual - day.required}</span>
                      ) : day.actual - day.required < 0 ? (
                        <span className="text-red-500">{day.actual - day.required}</span>
                      ) : (
                        <span className="text-slate-500">0</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-800 mb-6 pb-3 border-b border-slate-200">
                Weekly Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center hover:shadow-md transition-all hover:-translate-y-1">
                  <h4 className="text-sm font-semibold text-slate-600 mb-3">Most Productive Day</h4>
                  <div className="text-2xl font-bold text-slate-800 mb-1">
                    {weeklyData.reduce((max, day) => day.actual > max.actual ? day : max, weeklyData[0]).day}
                  </div>
                  <p className="text-xs text-slate-500">
                    with {weeklyData.reduce((max, day) => day.actual > max.actual ? day : max, weeklyData[0]).actual} hours
                  </p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center hover:shadow-md transition-all hover:-translate-y-1">
                  <h4 className="text-sm font-semibold text-slate-600 mb-3">Least Productive Day</h4>
                  <div className="text-2xl font-bold text-slate-800 mb-1">
                    {weeklyData.filter(day => day.required > 0)
                      .reduce((min, day) => day.actual < min.actual ? day : min, 
                        weeklyData.filter(day => day.required > 0)[0]).day}
                  </div>
                  <p className="text-xs text-slate-500">
                    with {weeklyData.filter(day => day.required > 0)
                      .reduce((min, day) => day.actual < min.actual ? day : min, 
                        weeklyData.filter(day => day.required > 0)[0]).actual} hours
                  </p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center hover:shadow-md transition-all hover:-translate-y-1">
                  <h4 className="text-sm font-semibold text-slate-600 mb-3">Weekly Status</h4>
                  <div className={`text-2xl font-bold mb-1 ${
                    weeklyBalanceStatus === 'surplus' ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {weeklyBalanceStatus === 'surplus' ? 'Over Target' : 'Under Target'}
                  </div>
                  <p className="text-xs text-slate-500">by {Math.abs(weeklyBalance)} hours</p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center hover:shadow-md transition-all hover:-translate-y-1">
                  <h4 className="text-sm font-semibold text-slate-600 mb-3">Trend</h4>
                  <div className="text-2xl font-bold text-slate-800 mb-1">
                    {weeklyData.slice(0, 5).reduce((sum, day) => sum + day.actual, 0) / 5 > 6 ? 'Above Average' : 'Below Average'}
                  </div>
                  <p className="text-xs text-slate-500">compared to required hours</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeeklyGraph;