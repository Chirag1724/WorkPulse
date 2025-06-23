import React, { useState, useEffect } from "react";
import { 
  Clock, ArrowLeft, Calendar, UserCircle, Book, Target, TrendingUp, 
  Award, Users, BarChart3, Activity, CheckCircle2, AlertCircle,
  Coffee, BookOpen, PieChart, Star
} from "lucide-react";

// Fallback data in case JSON import fails
const fallbackData = {
  teacherStats: {
    name: "Dr. Sarah Johnson",
    subject: "Advanced Mathematics",
    department: "Mathematics Department",
    employeeId: "FAC-2024-001",
    avatar: null,
    performance: {
      rating: 4.8,
      totalStudents: 245,
      coursesTeaching: 6,
      yearsExperience: 12
    },
    weeklyStats: {
      logged: 36.5,
      weeklyRequirement: 40,
      overtime: 2.5,
      workingDays: 5,
      averageDaily: 7.3,
      punchData: [
        { day: "Monday", in: "08:00", out: "16:30", classes: 6, hours: 8.5, status: "completed" },
        { day: "Tuesday", in: "08:15", out: "16:45", classes: 5, hours: 8.0, status: "completed" },
        { day: "Wednesday", in: "08:00", out: "17:00", classes: 6, hours: 9.0, status: "completed" },
        { day: "Thursday", in: "08:30", out: "16:30", classes: 4, hours: 8.0, status: "completed" },
        { day: "Friday", in: "09:00", out: "15:00", classes: 3, hours: 6.0, status: "completed" }
      ],
      monthlyTrend: [
        { week: "Week 1", hours: 38.5 },
        { week: "Week 2", hours: 40.0 },
        { week: "Week 3", hours: 39.0 },
        { week: "Week 4", hours: 36.5 }
      ]
    }
  }
};

function formatHours(decimalHours) {
  if (!decimalHours) return "0h 0m";
  const h = Math.floor(decimalHours);
  const m = Math.round((decimalHours - h) * 60);
  return `${h}h ${m}m`;
}

function getStatusColor(status) {
  switch (status) {
    case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'absent': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function FacultyStatsDashboard() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const [weekStats, setWeekStats] = useState(null);
  const [progressMetrics, setProgressMetrics] = useState({
    percentDone: 0,
    efficiency: 0,
    remainingHours: 0,
    projectedCompletion: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to import from JSON file
        let data;
        try {
          const dataModule = await import("../data/data.json");
          data = dataModule.default || dataModule;
        } catch (importError) {
          console.warn("Could not load data.json, using fallback data:", importError);
          data = fallbackData;
        }

        const { teacherStats } = data;
        setTeacherData(teacherStats);
        setWeekStats(teacherStats.weeklyStats);

        // Calculate advanced metrics
        const percentDone = Math.min(100, Math.round((teacherStats.weeklyStats.logged / teacherStats.weeklyStats.weeklyRequirement) * 100));
        const efficiency = Math.round((teacherStats.weeklyStats.logged / (teacherStats.weeklyStats.workingDays * 8)) * 100);
        const remainingHours = Math.max(0, teacherStats.weeklyStats.weeklyRequirement - teacherStats.weeklyStats.logged);
        const projectedCompletion = teacherStats.weeklyStats.logged >= teacherStats.weeklyStats.weeklyRequirement ? 100 : 
          Math.round((teacherStats.weeklyStats.logged / teacherStats.weeklyStats.weeklyRequirement) * 100);

        setProgressMetrics({
          percentDone,
          efficiency,
          remainingHours,
          projectedCompletion
        });

        setLoading(false);
        setTimeout(() => setIsPageLoaded(true), 200);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleBackClick = () => {
    console.log("Navigate back to dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-slate-600 text-lg font-medium">Loading Faculty Statistics...</div>
        </div>
      </div>
    );
  }

  if (!teacherData || !weekStats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <div className="text-slate-700 text-xl font-semibold mb-2">Data Not Available</div>
          <div className="text-slate-500">Please check your data source configuration.</div>
        </div>
      </div>
    );
  }

  const completionPercentage = Math.min(100, (weekStats.logged / weekStats.weeklyRequirement) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className={`transition-all duration-1000 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20"></div>
          
          <div className="relative px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              {/* Navigation */}
              <button 
                onClick={handleBackClick}
                className="flex items-center gap-3 bg-white bg-opacity-10 hover:bg-opacity-20 
                         backdrop-blur-sm border border-white border-opacity-20 rounded-xl px-5 py-3 
                         text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg mb-8"
              >
                <ArrowLeft size={20} />
                <span>Faculty Dashboard</span>
              </button>

              {/* Profile Header */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-white to-blue-100 rounded-3xl 
                                flex items-center justify-center shadow-2xl border-4 border-white border-opacity-30">
                    {teacherData.avatar ? (
                      <img src={teacherData.avatar} alt={teacherData.name} className="w-full h-full rounded-3xl object-cover" />
                    ) : (
                      <UserCircle size={60} className="text-indigo-600" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2 shadow-lg">
                    <CheckCircle2 size={20} className="text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">{teacherData.name}</h1>
                  <p className="text-xl text-blue-100 font-medium mb-1">{teacherData.subject}</p>
                  <p className="text-blue-200 mb-4">{teacherData.department} • ID: {teacherData.employeeId || 'N/A'}</p>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                    <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl px-4 py-2 border border-white border-opacity-20">
                      <div className="flex items-center gap-2 text-white">
                        <Star size={16} className="text-yellow-300" />
                        <span className="font-semibold">{teacherData.performance?.rating || 'N/A'}</span>
                        <span className="text-blue-200">Rating</span>
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl px-4 py-2 border border-white border-opacity-20">
                      <div className="flex items-center gap-2 text-white">
                        <Users size={16} />
                        <span className="font-semibold">{teacherData.performance?.totalStudents || 'N/A'}</span>
                        <span className="text-blue-200">Students</span>
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl px-4 py-2 border border-white border-opacity-20">
                      <div className="flex items-center gap-2 text-white">
                        <BookOpen size={16} />
                        <span className="font-semibold">{teacherData.performance?.coursesTeaching || 'N/A'}</span>
                        <span className="text-blue-200">Courses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-4 pb-12">
        {/* Key Metrics */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-1000 delay-200 ${
          isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Hours Logged */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Clock size={24} className="text-white" />
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">This Week</div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{formatHours(weekStats.logged)}</h3>
            <p className="text-gray-600 font-medium">Hours Logged</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="text-sm text-emerald-600 font-medium">
                {completionPercentage >= 100 ? '+' : ''}{(completionPercentage - 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500">vs target</div>
            </div>
          </div>

          {/* Efficiency */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Performance</div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{progressMetrics.efficiency}%</h3>
            <p className="text-gray-600 font-medium">Efficiency Rate</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="text-sm text-emerald-600 font-medium">Excellent</div>
            </div>
          </div>

          {/* Classes Today */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Book size={24} className="text-white" />
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Today</div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {weekStats.punchData.find(d => d.day === 'Friday')?.classes || 0}
            </h3>
            <p className="text-gray-600 font-medium">Classes Scheduled</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="text-sm text-purple-600 font-medium">Active</div>
            </div>
          </div>

          {/* Target Progress */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Target size={24} className="text-white" />
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Goal</div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{Math.round(completionPercentage)}%</h3>
            <p className="text-gray-600 font-medium">Target Achieved</p>
            <div className="mt-3 flex items-center gap-2">
              <div className={`text-sm font-medium ${completionPercentage >= 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {completionPercentage >= 100 ? 'Completed' : 'In Progress'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-400 ${
            isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Weekly Progress</h2>
                <PieChart size={20} className="text-gray-400" />
              </div>
              
              {/* Progress Circle */}
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-6">
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#f1f5f9"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#progressGradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${completionPercentage * 2.51} 251`}
                      strokeLinecap="round"
                      className="transition-all duration-2000 ease-out"
                      style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {Math.round(completionPercentage)}%
                    </span>
                    <span className="text-sm text-gray-500 font-medium">Complete</span>
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center border border-blue-100">
                    <div className="text-sm text-blue-600 font-medium mb-1">Logged</div>
                    <div className="text-lg font-bold text-blue-900">{formatHours(weekStats.logged)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center border border-purple-100">
                    <div className="text-sm text-purple-600 font-medium mb-1">Target</div>
                    <div className="text-lg font-bold text-purple-900">{formatHours(weekStats.weeklyRequirement)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 text-center border border-emerald-100">
                    <div className="text-sm text-emerald-600 font-medium mb-1">Remaining</div>
                    <div className="text-lg font-bold text-emerald-900">{formatHours(progressMetrics.remainingHours)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 text-center border border-amber-100">
                    <div className="text-sm text-amber-600 font-medium mb-1">Average</div>
                    <div className="text-lg font-bold text-amber-900">{formatHours(weekStats.averageDaily || 0)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-600 ${
            isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8 pb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Weekly Schedule</h2>
                  <BarChart3 size={20} className="text-gray-400" />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Day</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Clock In</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Clock Out</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Hours</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Classes</th>
                      <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {weekStats.punchData.map((row, index) => (
                      <tr key={row.day} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-4 ${
                              row.status === 'completed' ? 'bg-emerald-400 shadow-lg shadow-emerald-200' : 
                              row.status === 'pending' ? 'bg-amber-400 shadow-lg shadow-amber-200' : 
                              'bg-gray-300'
                            }`}></div>
                            <span className="text-sm font-semibold text-gray-900">{row.day}</span>
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <span className={`text-sm font-medium ${row.in ? 'text-gray-900' : 'text-gray-400'}`}>
                            {row.in || '--:--'}
                          </span>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <span className={`text-sm font-medium ${row.out ? 'text-gray-900' : 'text-gray-400'}`}>
                            {row.out || '--:--'}
                          </span>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <span className="text-sm font-bold text-indigo-600">
                            {formatHours(row.hours || 0)}
                          </span>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Activity size={14} className="text-blue-500" />
                            <span className="text-sm font-medium text-gray-900">{row.classes || 0}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            getStatusColor(row.status || 'pending')
                          }`}>
                            {row.status === 'completed' && <CheckCircle2 size={12} className="mr-1" />}
                            {row.status === 'pending' && <Clock size={12} className="mr-1" />}
                            {(row.status || 'pending').charAt(0).toUpperCase() + (row.status || 'pending').slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyStatsDashboard;