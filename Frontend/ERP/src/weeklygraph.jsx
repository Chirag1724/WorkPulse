import React, { useState, useEffect } from 'react';
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
import { Clock, CheckCircle, XCircle, Award, ArrowLeft } from 'lucide-react';
import './weekly.css';


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
const undercompletedDays = weeklyData.length - completedDays;
const complianceRate = Math.round((completedDays / weeklyData.length) * 100);

function WeeklyGraph() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % weeklyData.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleToggleAnimation = () => setIsAnimating(!isAnimating);
  const animatedData = weeklyData.slice(0, activeIndex + 1);

  const goBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="p-6 bg-cyan-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <button
        onClick={goBack}
        className="flex items-center text-teal-600 mb-4 hover:text-cyan-700 transition-colors"
      >
        <ArrowLeft size={18} className="mr-1" /> Back to Dashboard
      </button>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-cyan-700">Prof. M.M Sati's Weekly Hours</h1>
          <p className="text-cyan-600">Academic Year 2024-2025</p>
        </div>

        <div className="flex items-center gap-4">
          <select
            onChange={(e) => {
              if (e.target.value === 'monthly') navigate('/monthly-graph');
            }}
            defaultValue="weekly"
            className="border border-teal-300 rounded px-2 py-1 text-sm"
          >
            <option value="monthly">Monthly View</option>
            <option value="weekly">Weekly View</option>
          </select>

          <button
            onClick={handleToggleAnimation}
            className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
          >
            {isAnimating ? 'Pause Animation' : 'Resume Animation'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard icon={<Clock className="text-cyan-500 mr-3" />} label="Total Hours" value={`${totalActual} / ${totalRequired}`} />
        <StatCard
          icon={<Award className="text-teal-500 mr-3" />}
          label="Days Completed"
          value={
            <span>
              <span className="text-teal-500">{completedDays}</span> /
              <span className="text-cyan-700"> {undercompletedDays}</span>
            </span>
          }
        />
        <StatCard icon={<Award className="text-cyan-500 mr-3" />} label="Compliance Rate" value={`${complianceRate}%`} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 text-cyan-700">Weekly Working Hours</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0F7FA" />
              <XAxis dataKey="day" stroke="#008E9C" />
              <YAxis domain={[0, 10]} stroke="#008E9C" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#E0F7FA',
                  borderColor: '#31CBAF' 
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="required"
                stroke="#008E9C"
                strokeWidth={2}
                dot={{ r: 4, fill: "#008E9C" }}
                activeDot={{ r: 6 }}
                isAnimationActive={isAnimating}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#31CBAF"
                strokeWidth={2}
                dot={{ r: 4, fill: "#31CBAF" }}
                activeDot={{ r: 6 }}
                isAnimationActive={isAnimating}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-cyan-700">Daily Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-cyan-100">
            <thead className="bg-cyan-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-700 uppercase tracking-wider">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-700 uppercase tracking-wider">Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-700 uppercase tracking-wider">Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-700 uppercase tracking-wider">Difference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-cyan-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-cyan-50">
              {animatedData.map((day, idx) => (
                <tr key={day.day} className={idx === activeIndex ? "bg-cyan-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-800">{day.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-600">{day.required}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-600">{day.actual}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-600">
                    <span className={day.actual >= day.required ? "text-teal-500" : "text-cyan-700"}>
                      {day.actual - day.required}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-600">
                    {day.status === 'completed' ?
                      <span className="flex items-center text-teal-500"><CheckCircle size={16} className="mr-1" /> Completed</span> :
                      <span className="flex items-center text-cyan-700"><XCircle size={16} className="mr-1" /> Under</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center border-l-4 border-cyan-500">
      {icon}
      <div>
        <p className="text-cyan-600">{label}</p>
        <p className="text-xl font-semibold text-cyan-700">{value}</p>
      </div>
    </div>
  );
}

export default WeeklyGraph;