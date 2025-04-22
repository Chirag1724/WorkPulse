import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { Clock, Calendar, CheckCircle, XCircle, Award } from 'lucide-react';
import './graph.css';
import data from './data.json'; // Make sure this path is correct

// Prepare data with "status"
const monthlyData = data.monthly.map(month => ({
  ...month,
  status: month.actual >= month.required ? 'completed' : 'undercompleted'
}));

// Calculate stats
const totalRequired = monthlyData.reduce((sum, month) => sum + month.required, 0);
const totalActual = monthlyData.reduce((sum, month) => sum + month.actual, 0);
const completedMonths = monthlyData.filter(month => month.status === 'completed').length;
const undercompletedMonths = monthlyData.length - completedMonths;
const complianceRate = Math.round((completedMonths / monthlyData.length) * 100);

function Graph() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % monthlyData.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleToggleAnimation = () => setIsAnimating(!isAnimating);
  const animatedData = monthlyData.slice(0, activeIndex + 1);

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-2xl font-bold text-blue-800">Prof. Johnson's Working Hours</h1>
    <p className="text-gray-600">Academic Year 2024-2025</p>
  </div>

  <div className="flex items-center gap-4">
    <select
      onChange={(e) => {
        if (e.target.value === 'weekly') {
          navigate('/weekly-graph');
        }
      }}
      defaultValue="monthly"
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
          icon={<Calendar className="text-green-500 mr-3" />}
          label="Months Completed"
          value={
            <span>
              <span className="text-green-500">{completedMonths}</span> /
              <span className="text-red-500"> {undercompletedMonths}</span>
            </span>
          }
        />
        <StatCard icon={<Award className="text-purple-500 mr-3" />} label="Compliance Rate" value={`${complianceRate}%`} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Monthly Working Hours</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[100, 180]} />
              <Tooltip />
              <Legend />
              <ReferenceLine y={152} stroke="#888" strokeDasharray="3 3" label="Avg Required" />
              <Line type="monotone" dataKey="required" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} isAnimationActive={isAnimating} />
              <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} isAnimationActive={isAnimating} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Monthly Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {["Month", "Required Hours", "Actual Hours", "Difference", "Status"].map(header => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {animatedData.map((month, idx) => (
                <tr key={month.month} className={idx === activeIndex ? "bg-blue-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month.month}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{month.required}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{month.actual}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className={month.actual >= month.required ? "text-green-500" : "text-red-500"}>
                      {month.actual - month.required}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {month.status === 'completed' ? (
                      <span className="flex items-center text-green-500">
                        <CheckCircle size={16} className="mr-1" /> Completed
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500">
                        <XCircle size={16} className="mr-1" /> Under
                      </span>
                    )}
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

export default Graph;
