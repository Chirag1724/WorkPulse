import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { Clock, Calendar, CheckCircle, XCircle, Award, ArrowLeft } from 'lucide-react';
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
  
  const handleBackClick = () => {
    // Navigate to faculty dashboard
    window.location.href = '/faculty-dashboard';
  };

  return (
    <div className="p-6 bg-light-teal rounded-lg shadow-lg max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center">
            <button 
              onClick={handleBackClick}
              className="mr-3 p-2 bg-teal text-white rounded-full hover:bg-dark-teal"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-teal">Prof. M.M. Sati's Working Hours</h1>
          </div>
          <p className="text-dark-teal">Academic Year 2024-2025</p>
        </div>

        <div className="flex items-center gap-4">
          <select
            onChange={(e) => {
              if (e.target.value === 'weekly') {
                navigate('/weekly-graph');
              }
            }}
            defaultValue="monthly"
            className="border border-teal rounded px-2 py-1 text-sm text-teal"
          >
            <option value="monthly">Monthly View</option>
            <option value="weekly">Weekly View</option>
          </select>

          <button
            onClick={handleToggleAnimation}
            className="px-4 py-2 bg-teal text-white rounded hover:bg-dark-teal"
          >
            {isAnimating ? 'Pause Animation' : 'Resume Animation'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard icon={<Clock className="text-teal mr-3" />} label="Total Hours" value={`${totalActual} / ${totalRequired}`} />
        <StatCard
          icon={<Calendar className="text-mint mr-3" />}
          label="Months Completed"
          value={
            <span>
              <span className="text-mint">{completedMonths}</span> /
              <span className="text-teal"> {undercompletedMonths}</span>
            </span>
          }
        />
        <StatCard icon={<Award className="text-teal mr-3" />} label="Compliance Rate" value={`${complianceRate}%`} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6 border-l-4 border-teal">
        <h2 className="text-lg font-semibold mb-4 text-teal">Monthly Working Hours</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0F7FA" />
              <XAxis dataKey="month" stroke="#008E9C" />
              <YAxis domain={[100, 180]} stroke="#008E9C" />
              <Tooltip contentStyle={{ backgroundColor: '#E0F7FA', borderColor: '#008E9C' }} />
              <Legend />
              <ReferenceLine y={152} stroke="#008E9C" strokeDasharray="3 3" label="Avg Required" />
              <Line type="monotone" dataKey="required" stroke="#008E9C" strokeWidth={2} dot={{ r: 4, fill: '#008E9C' }} activeDot={{ r: 6 }} isAnimationActive={isAnimating} />
              <Line type="monotone" dataKey="actual" stroke="#31CBAF" strokeWidth={2} dot={{ r: 4, fill: '#31CBAF' }} activeDot={{ r: 6 }} isAnimationActive={isAnimating} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-teal">
        <h2 className="text-lg font-semibold mb-4 text-teal">Monthly Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-light-teal">
            <thead>
              <tr className="bg-light-teal">
                {["Month", "Required Hours", "Actual Hours", "Difference", "Status"].map(header => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-teal uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-light-teal">
              {animatedData.map((month, idx) => (
                <tr key={month.month} className={idx === activeIndex ? "bg-light-teal" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal">{month.month}</td>
                  <td className="px-6 py-4 text-sm text-teal">{month.required}</td>
                  <td className="px-6 py-4 text-sm text-teal">{month.actual}</td>
                  <td className="px-6 py-4 text-sm text-teal">
                    <span className={month.actual >= month.required ? "text-mint" : "text-teal"}>
                      {month.actual - month.required}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-teal">
                    {month.status === 'completed' ? (
                      <span className="flex items-center text-mint">
                        <CheckCircle size={16} className="mr-1" /> Completed
                      </span>
                    ) : (
                      <span className="flex items-center text-teal">
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
    <div className="bg-white p-4 rounded-lg shadow flex items-center border-l-4 border-teal">
      {icon}
      <div>
        <p className="text-teal">{label}</p>
        <p className="text-xl font-semibold text-dark-teal">{value}</p>
      </div>
    </div>
  );
}

export default Graph;