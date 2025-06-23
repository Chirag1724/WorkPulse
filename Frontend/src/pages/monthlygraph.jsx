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
  ReferenceLine
} from 'recharts';
import { Clock, CheckCircle, XCircle, Award, ArrowLeft, Edit, LogOut, BarChart2, ClipboardList } from 'lucide-react';

// Sample monthly data
const monthlyData = [
  { month: "Jan", required: 150, actual: 155, status: "completed" },
  { month: "Feb", required: 150, actual: 145, status: "undercompleted" },
  { month: "Mar", required: 150, actual: 160, status: "completed" },
  { month: "Apr", required: 150, actual: 158, status: "completed" },
  { month: "May", required: 150, actual: 165, status: "completed" },
  { month: "Jun", required: 150, actual: 148, status: "undercompleted" },
  { month: "Jul", required: 150, actual: 152, status: "completed" },
  { month: "Aug", required: 150, actual: 145, status: "undercompleted" },
  { month: "Sep", required: 150, actual: 157, status: "completed" },
  { month: "Oct", required: 150, actual: 151, status: "completed" },
  { month: "Nov", required: 150, actual: 142, status: "undercompleted" },
  { month: "Dec", required: 150, actual: 155, status: "completed" }
];

// Calculate stats
const totalRequired = monthlyData.reduce((sum, month) => sum + month.required, 0);
const totalActual = monthlyData.reduce((sum, month) => sum + month.actual, 0);
const completedMonths = monthlyData.filter(month => month.status === "completed").length;
const undercompletedMonths = monthlyData.length - completedMonths;
const complianceRate = Math.round((completedMonths / monthlyData.length) * 100);
const monthlyAverage = (totalActual / monthlyData.length).toFixed(1);

// Calculate overtime and deficit
const yearlyBalance = totalActual - totalRequired;
const yearlyBalanceStatus = yearlyBalance >= 0 ? 'surplus' : 'deficit';

function MonthlyGraph() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('graph'); // 'graph' or 'breakdown'
  const profileMenuRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % monthlyData.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Handle click outside profile menu to close it
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

  const handleToggleAnimation = () => setIsAnimating(!isAnimating);
  const animatedData = monthlyData.slice(0, activeIndex + 1);

  const mostProductiveMonth = monthlyData.reduce((max, month) => month.actual > max.actual ? month : max, monthlyData[0]);
  const leastProductiveMonth = monthlyData.reduce((min, month) => month.actual < min.actual ? month : min, monthlyData[0]);

  return (
    <div className="w-full max-w-7xl bg-slate-50 shadow-2xl rounded-xl overflow-hidden flex flex-col mx-auto font-sans">
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
              <h2 className="text-lg font-semibold m-0">Prof. M.M Sati Monthly Hours</h2>
              <p className="text-sm m-0 opacity-80">Academic Year 2024-2025</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
          <select
            defaultValue="monthly"
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'monthly') {
                navigate('/monthly-graph'); 
              } else if (value === 'weekly') {
                navigate('/weekly-graph'); 
              }
            }}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm font-medium text-white cursor-pointer hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 w-full lg:w-auto"
          >
            <option value="monthly">Monthly Graph</option>
            <option value="weekly">Weekly Graph</option>
          </select>
          
          <button
            onClick={handleToggleAnimation}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm font-medium text-white cursor-pointer hover:bg-white/20 w-full lg:w-auto"
          >
            {isAnimating ? 'Pause Animation' : 'Resume Animation'}
          </button>
          
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={handleProfileClick}
              className="w-10 h-10 rounded-full border-2 border-white p-0 overflow-hidden cursor-pointer hover:border-white/70 hover:scale-105 transition-all duration-300 mx-auto lg:mx-0"
            >
              <img 
                src="https://megaphone.southwestern.edu/wp-content/uploads/2018/03/birger-kollmeier-910261_960_720.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </button>
            
            {showProfileMenu && (
              <div className="absolute top-full right-0 lg:right-0 mt-2 w-44 bg-white rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in duration-200 transform lg:translate-x-0 translate-x-1/2 right-1/2 lg:right-0 lg:transform-none">
                <button 
                  onClick={handleEditProfile}
                  className="flex items-center w-full px-4 py-3 text-left text-teal-700 text-sm hover:bg-teal-50 transition-colors"
                >
                  <Edit size={16} className="mr-2 text-teal-600" />
                  Edit Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-left text-teal-700 text-sm hover:bg-teal-50 transition-colors"
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
      <div className="p-6 min-h-96 flex flex-col items-center justify-start">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b border-teal-100 w-full overflow-x-auto pb-2">
          <button 
            className={`flex items-center gap-2 px-5 py-3 font-medium cursor-pointer relative transition-all duration-300 hover:text-teal-700 whitespace-nowrap ${
              activeTab === 'graph' 
                ? 'text-teal-600 after:content-[\'\'] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-teal-600 after:rounded-t-md' 
                : 'text-slate-500'
            }`}
            onClick={() => setActiveTab('graph')}
          >
            <BarChart2 size={18} />
            <span className="hidden sm:inline">Monthly Chart</span>
          </button>
          <button 
            className={`flex items-center gap-2 px-5 py-3 font-medium cursor-pointer relative transition-all duration-300 hover:text-teal-700 whitespace-nowrap ${
              activeTab === 'breakdown' 
                ? 'text-teal-600 after:content-[\'\'] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-teal-600 after:rounded-t-md' 
                : 'text-slate-500'
            }`}
            onClick={() => setActiveTab('breakdown')}
          >
            <ClipboardList size={18} />
            <span className="hidden sm:inline">Monthly Breakdown</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6">
          <div className="bg-white rounded-xl border border-teal-100 p-5 shadow-sm hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <Clock size={20} />
              <h3 className="m-0 text-base font-semibold text-slate-600">Yearly Hours</h3>
            </div>
            <div className="flex flex-col">
              <div className="text-4xl font-bold text-teal-800 mb-2">{totalActual}</div>
              <div className="text-sm text-slate-500">
                of {totalRequired} required
                <div className={`h-1 bg-slate-200 rounded-sm mt-3 overflow-hidden ${yearlyBalanceStatus === 'surplus' ? '' : ''}`}>
                  <div 
                    className={`h-full rounded-sm transition-all duration-1000 ${yearlyBalanceStatus === 'surplus' ? 'bg-emerald-400' : 'bg-red-400'}`}
                    style={{ width: `${Math.min(100, (totalActual / totalRequired) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-teal-100 p-5 shadow-sm hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <Award size={20} />
              <h3 className="m-0 text-base font-semibold text-slate-600">Monthly Average</h3>
            </div>
            <div className="flex flex-col">
              <div className="text-4xl font-bold text-teal-800 mb-2">{monthlyAverage}</div>
              <div className="text-sm text-slate-500">hours per month</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-teal-100 p-5 shadow-sm hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              {yearlyBalance >= 0 ? <CheckCircle size={20} /> : <XCircle size={20} />}
              <h3 className="m-0 text-base font-semibold text-slate-600">Yearly Balance</h3>
            </div>
            <div className="flex flex-col">
              <div className={`text-4xl font-bold mb-2 ${yearlyBalance >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {yearlyBalance >= 0 ? '+' : ''}{yearlyBalance}
              </div>
              <div className="text-sm text-slate-500">
                {yearlyBalance >= 0 ? 'surplus hours' : 'deficit hours'}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-teal-100 p-5 shadow-sm hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4 text-teal-600">
              <CheckCircle size={20} />
              <h3 className="m-0 text-base font-semibold text-slate-600">Compliance</h3>
            </div>
            <div className="flex flex-col">
              <div className="text-4xl font-bold text-teal-800 mb-2">{complianceRate}%</div>
              <div className="text-sm text-slate-500">
                {completedMonths} of {monthlyData.length} months met
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'graph' ? (
          <>
            {/* Chart */}
            <div className="w-full h-80 mb-8 bg-white p-4 rounded-xl shadow-sm">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={animatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0F7FA" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis domain={[100, 180]} stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E0F7FA',
                      borderRadius: '8px' 
                    }}
                  />
                  <Legend />
                  <ReferenceLine y={150} stroke="#0d9488" strokeDasharray="3 3" label="Avg Required" />
                  <Line
                    type="monotone"
                    dataKey="required"
                    name="Required Hours"
                    stroke="#0f766e"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#0f766e" }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={isAnimating}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    name="Actual Hours"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#14b8a6" }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={isAnimating}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="w-full mt-8 overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-teal-800 uppercase tracking-wider">Month</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-teal-800 uppercase tracking-wider">Required</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-teal-800 uppercase tracking-wider">Actual</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-teal-800 uppercase tracking-wider">Difference</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-teal-800 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-100">
                  {animatedData.map((month, idx) => (
                    <tr key={month.month} className={`transition-all duration-300 hover:bg-teal-50/50 ${idx === activeIndex ? "bg-teal-50/70 animate-pulse" : ""}`}>
                      <td className="px-4 py-3 text-sm text-teal-800">{month.month}</td>
                      <td className="px-4 py-3 text-sm text-teal-800">{month.required}</td>
                      <td className="px-4 py-3 text-sm text-teal-800">{month.actual}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`font-semibold ${month.actual >= month.required ? "text-emerald-500" : "text-red-500"}`}>
                          {month.actual - month.required > 0 ? '+' : ''}{month.actual - month.required}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {month.status === 'completed' ?
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">
                            <CheckCircle size={14} /> Completed
                          </span> :
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                            <XCircle size={14} /> Under
                          </span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          // Monthly Breakdown View
          <div className="w-full flex flex-col gap-8">
            <div className="flex justify-between items-end h-80 p-8 bg-white rounded-xl shadow-sm overflow-x-auto">
              {monthlyData.map((month, index) => (
                <div key={month.month} className="flex flex-col items-center flex-1 h-full min-w-20">
                  <div className="font-semibold text-teal-800 mb-2">{month.month}</div>
                  <div className="flex items-end justify-center h-44 relative">
                    <div className="flex gap-1.5 items-end h-full">
                      <div 
                        className="w-5 bg-teal-200 rounded-t-sm relative min-h-0.5" 
                        style={{ height: `${(month.required / 180) * 100}%` }}
                      >
                        <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-teal-600">
                          {month.required}
                        </span>
                      </div>
                      <div 
                        className={`w-5 rounded-t-sm relative min-h-0.5 ${
                          month.actual >= month.required ? 'bg-emerald-400' : 'bg-red-400'
                        }`}
                        style={{ height: `${(month.actual / 180) * 100}%` }}
                      >
                        <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-semibold">
                          {month.actual}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 font-semibold text-sm">
                    {month.actual - month.required > 0 ? (
                      <span className="text-emerald-500">+{month.actual - month.required}</span>
                    ) : month.actual - month.required < 0 ? (
                      <span className="text-red-500">{month.actual - month.required}</span>
                    ) : (
                      <span className="text-slate-500">0</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="w-full p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-teal-800 text-xl font-semibold mt-0 mb-6 pb-3 border-b border-teal-100">
                Yearly Insights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-teal-100 text-center hover:transform hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <h4 className="text-slate-600 text-sm font-semibold mt-0 mb-3">Most Productive Month</h4>
                  <div className="text-2xl font-bold text-teal-800 mb-2">
                    {mostProductiveMonth.month}
                  </div>
                  <p className="text-slate-600 text-xs m-0">with {mostProductiveMonth.actual} hours</p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-xl border border-teal-100 text-center hover:transform hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <h4 className="text-slate-600 text-sm font-semibold mt-0 mb-3">Least Productive Month</h4>
                  <div className="text-2xl font-bold text-teal-800 mb-2">
                    {leastProductiveMonth.month}
                  </div>
                  <p className="text-slate-600 text-xs m-0">with {leastProductiveMonth.actual} hours</p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-xl border border-teal-100 text-center hover:transform hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <h4 className="text-slate-600 text-sm font-semibold mt-0 mb-3">Yearly Status</h4>
                  <div className={`text-2xl font-bold mb-2 ${yearlyBalanceStatus === 'surplus' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {yearlyBalanceStatus === 'surplus' ? 'Over Target' : 'Under Target'}
                  </div>
                  <p className="text-slate-600 text-xs m-0">by {Math.abs(yearlyBalance)} hours</p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-xl border border-teal-100 text-center hover:transform hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <h4 className="text-slate-600 text-sm font-semibold mt-0 mb-3">Trend</h4>
                  <div className="text-2xl font-bold text-teal-800 mb-2">
                    {monthlyData.reduce((sum, month) => sum + month.actual, 0) / monthlyData.length > 150 ? 'Above Average' : 'Below Average'}
                  </div>
                  <p className="text-slate-600 text-xs m-0">compared to required hours</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonthlyGraph;