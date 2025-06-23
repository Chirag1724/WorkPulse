import React, { useState, useEffect } from "react";
import { 
  Clock, ArrowLeft, Calendar, UserCircle, Book, Target, TrendingUp, 
  Award, Users, BarChart3, Activity, CheckCircle2, AlertCircle,
  Coffee, BookOpen, PieChart, Star
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Sample data structure - replace this with your actual data
const sampleData = {
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
    case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'absent': return 'bg-red-50 text-red-700 border-red-200';
    default: return 'bg-gray-50 text-gray-600 border-gray-200';
  }
}

function FacultyStatsDashboard() {
  const navigate = useNavigate();
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
  const [dataSource, setDataSource] = useState('sample');

  useEffect(() => {
    const loadData = async () => {
      try {
        let data = null;
        let source = 'sample';

        // Method 1: Try to load from public/data.json using fetch
        try {
          const response = await fetch('../data/data.json');
          if (response.ok) {
            data = await response.json();
            source = 'json-file';
            console.log("✅ Successfully loaded data from ../data/data.json");
          }
        } catch (fetchError) {
          console.warn("❌ Could not fetch ../data/data.json:", fetchError.message);
        }

        // Method 2: Try to load from src/data/data.json using import
        if (!data) {
          try {
            const dataModule = await import('../data/data.json');
            data = dataModule.default || dataModule;
            source = 'src-import';
            console.log("✅ Successfully imported data from src/data/data.json");
          } catch (importError) {
            console.warn("❌ Could not import from src/data/data.json:", importError.message);
          }
        }

        // Method 3: Try window.dataJSON if injected globally
        if (!data && window.dataJSON) {
          data = window.dataJSON;
          source = 'global-variable';
          console.log("✅ Successfully loaded data from window.dataJSON");
        }

        // Method 4: Fallback to sample data
        if (!data) {
          data = sampleData;
          source = 'sample';
          console.log("⚠️ Using sample data as fallback");
        }

        setDataSource(source);

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
        console.error("❌ Error loading data:", error);
        // Use sample data as ultimate fallback
        const { teacherStats } = sampleData;
        setTeacherData(teacherStats);
        setWeekStats(teacherStats.weeklyStats);
        setDataSource('error-fallback');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleBackClick = () => {
    navigate('/Dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-teal-900 text-lg font-semibold">Loading Faculty Statistics...</div>
        </div>
      </div>
    );
  }

  if (!teacherData || !weekStats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyan-50">
        <div className="text-center bg-white rounded-2xl shadow-2xl p-8 border border-teal-100">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <div className="text-teal-900 text-xl font-bold mb-2">Data Not Available</div>
          <div className="text-slate-600">Please check your data source configuration.</div>
        </div>
      </div>
    );
  }

  const completionPercentage = Math.min(100, (weekStats.logged / weekStats.weeklyRequirement) * 100);

  return (
    <div className="min-h-screen bg-cyan-50">
      {/* Data Source Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          dataSource === 'json-file' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
          dataSource === 'src-import' ? 'bg-teal-50 text-teal-700 border border-teal-200' :
          dataSource === 'global-variable' ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' :
          'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          Data: {dataSource === 'json-file' ? 'JSON File' : 
                dataSource === 'src-import' ? 'Import' :
                dataSource === 'global-variable' ? 'Global' : 'Sample'}
        </div>
      </div>

      {/* Header */}
      <div className={`transition-all duration-1000 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-cyan-600/20"></div>
          <div className="absolute inset-0 bg-black/5"></div>
          
          <div className="relative px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              {/* Navigation */}
              <button 
                onClick={handleBackClick}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 
                         backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 
                         text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg mb-8"
              >
                <ArrowLeft size={20} />
                <span>Faculty Dashboard</span>
              </button>

              {/* Profile Header */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-white to-cyan-50 rounded-3xl 
                                flex items-center justify-center shadow-2xl border-4 border-white/30">
                    {teacherData.avatar ? (
                      <img src={teacherData.avatar} alt={teacherData.name} className="w-full h-full rounded-3xl object-cover" />
                    ) : (
                      <UserCircle size={60} className="text-teal-600" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2 shadow-lg">
                    <CheckCircle2 size={20} className="text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">{teacherData.name}</h1>
                  <p className="text-xl text-cyan-100 font-semibold mb-1">{teacherData.subject}</p>
                  <p className="text-cyan-200 mb-4">{teacherData.department} • ID: {teacherData.employeeId || 'N/A'}</p>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                      <div className="flex items-center gap-2 text-white">
                        <Star size={16} className="text-yellow-300" />
                        <span className="font-bold">{teacherData.performance?.rating || 'N/A'}</span>
                        <span className="text-cyan-200">Rating</span>
                      </div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                      <div className="flex items-center gap-2 text-white">
                        <Users size={16} />
                        <span className="font-bold">{teacherData.performance?.totalStudents || 'N/A'}</span>
                        <span className="text-cyan-200">Students</span>
                      </div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                      <div className="flex items-center gap-2 text-white">
                        <BookOpen size={16} />
                        <span className="font-bold">{teacherData.performance?.coursesTeaching || 'N/A'}</span>
                        <span className="text-cyan-200">Courses</span>
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
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-teal-100 hover:shadow-2xl transition-all duration-300 group hover:border-teal-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Clock size={24} className="text-white" />
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded-full">This Week</div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-teal-900 mb-1">{formatHours(weekStats.logged)}</h3>
            <p className="text-slate-600 font-semibold">Hours Logged</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="text-sm text-emerald-600 font-semibold">
                {completionPercentage >= 100 ? '+' : ''}{(completionPercentage - 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400">vs target</div>
            </div>
          </div>

          {/* Efficiency */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-teal-100 hover:shadow-2xl transition-all duration-300 group hover:border-teal-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">Performance</div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-teal-900 mb-1">{progressMetrics.efficiency}%</h3>
            <p className="text-slate-600 font-semibold">Efficiency Rate</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="text-sm text-emerald-600 font-semibold">Excellent</div>
            </div>
          </div>

          {/* Classes Today */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-teal-100 hover:shadow-2xl transition-all duration-300 group hover:border-teal-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Book size={24} className="text-white" />
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded-full">Today</div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-teal-900 mb-1">
              {weekStats.punchData.find(d => d.day === 'Friday')?.classes || 0}
            </h3>
            <p className="text-slate-600 font-semibold">Classes Scheduled</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="text-sm text-teal-600 font-semibold">Active</div>
            </div>
          </div>

          {/* Target Progress */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-teal-100 hover:shadow-2xl transition-all duration-300 group hover:border-teal-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Target size={24} className="text-white" />
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded-full">Goal</div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-teal-900 mb-1">{Math.round(completionPercentage)}%</h3>
            <p className="text-slate-600 font-semibold">Target Achieved</p>
            <div className="mt-3 flex items-center gap-2">
              <div className={`text-sm font-semibold ${completionPercentage >= 100 ? 'text-emerald-600' : 'text-teal-600'}`}>
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
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-teal-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-teal-900">Weekly Progress</h2>
                <PieChart size={20} className="text-gray-400" />
              </div>
              
              {/* Progress Circle */}
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-6">
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0d9488" />
                        <stop offset="50%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#f0fdfa"
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
                      style={{ filter: 'drop-shadow(0 4px 8px rgba(13, 148, 136, 0.3))' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      {Math.round(completionPercentage)}%
                    </span>
                    <span className="text-sm text-slate-600 font-medium">Complete</span>
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 text-center border border-teal-100">
                    <div className="text-sm text-teal-700 font-semibold mb-1">Logged</div>
                    <div className="text-lg font-bold text-teal-900">{formatHours(weekStats.logged)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-4 text-center border border-cyan-100">
                    <div className="text-sm text-cyan-700 font-semibold mb-1">Target</div>
                    <div className="text-lg font-bold text-teal-900">{formatHours(weekStats.weeklyRequirement)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 text-center border border-emerald-100">
                    <div className="text-sm text-emerald-700 font-semibold mb-1">Remaining</div>
                    <div className="text-lg font-bold text-teal-900">{formatHours(progressMetrics.remainingHours)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 text-center border border-teal-100">
                    <div className="text-sm text-teal-700 font-semibold mb-1">Average</div>
                    <div className="text-lg font-bold text-teal-900">{formatHours(weekStats.averageDaily || 0)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-600 ${
            isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-white rounded-2xl shadow-xl border border-teal-100 overflow-hidden">
              <div className="p-8 pb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-teal-900">Weekly Schedule</h2>
                  <BarChart3 size={20} className="text-gray-400" />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-cyan-50 to-teal-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-xs font-bold text-teal-900 uppercase tracking-wider">Day</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-teal-900 uppercase tracking-wider">Clock In</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-teal-900 uppercase tracking-wider">Clock Out</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-teal-900 uppercase tracking-wider">Hours</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-teal-900 uppercase tracking-wider">Classes</th>
                      <th className="px-8 py-4 text-left text-xs font-bold text-teal-900 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-teal-100">
                    {weekStats.punchData.map((row, index) => (
                      <tr key={row.day} className="hover:bg-cyan-50 transition-colors group">
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-4 ${
                              row.status === 'completed' ? 'bg-emerald-400 shadow-lg shadow-emerald-200' : 
                              row.status === 'pending' ? 'bg-amber-400 shadow-lg shadow-amber-200' : 
                              'bg-gray-300'
                            }`}></div>
                            <span className="text-sm font-bold text-teal-900">{row.day}</span>
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <span className={`text-sm font-semibold ${row.in ? 'text-slate-600' : 'text-gray-400'}`}>
                            {row.in || '--:--'}
                          </span>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <span className={`text-sm font-semibold ${row.out ? 'text-slate-600' : 'text-gray-400'}`}>
                            {row.out || '--:--'}
                          </span>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <span className="text-sm font-bold text-teal-600">
                            {formatHours(row.hours || 0)}
                          </span>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Activity size={14} className="text-teal-500" />
                            <span className="text-sm font-semibold text-teal-900">{row.classes || 0}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
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