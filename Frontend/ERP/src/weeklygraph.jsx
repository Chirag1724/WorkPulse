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
import { Clock, CheckCircle, XCircle, Award } from 'lucide-react';
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

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">Prof. Johnson's Weekly Hours</h1>
          <p className="text-gray-600">Academic Year 2024-2025</p>
        </div>

        <div className="flex items-center gap-4">
          <select
            onChange={(e) => {
              if (e.target.value === 'monthly') navigate('/monthly-graph');
            }}
            defaultValue="weekly"
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="monthly">Monthly View</option>
            <option value="weekly">Weekly View</option>
          </select>

          <button
            onClick={handleToggleAnimation}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isAnimating ? 'Pause Animation' : 'Resume Animation'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard icon={<Clock className="text-blue-500 mr-3" />} label="Total Hours" value={`${totalActual} / ${totalRequired}`} />
        <StatCard
          icon={<Award className="text-green-500 mr-3" />}
          label="Days Completed"
          value={
            <span>
              <span className="text-green-500">{completedDays}</span> /
              <span className="text-red-500"> {undercompletedDays}</span>
            </span>
          }
        />
        <StatCard icon={<Award className="text-purple-500 mr-3" />} label="Compliance Rate" value={`${complianceRate}%`} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Weekly Working Hours</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="required"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={isAnimating}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={isAnimating}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Daily Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {animatedData.map((day, idx) => (
                <tr key={day.day} className={idx === activeIndex ? "bg-blue-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.required}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.actual}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={day.actual >= day.required ? "text-green-500" : "text-red-500"}>
                      {day.actual - day.required}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {day.status === 'completed' ?
                      <span className="flex items-center text-green-500"><CheckCircle size={16} className="mr-1" /> Completed</span> :
                      <span className="flex items-center text-red-500"><XCircle size={16} className="mr-1" /> Under</span>
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
    <div className="bg-white p-4 rounded-lg shadow flex items-center">
      {icon}
      <div>
        <p className="text-gray-500">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default WeeklyGraph;