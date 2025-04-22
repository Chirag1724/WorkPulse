import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Clock, Calendar, CheckCircle, XCircle, Award } from 'lucide-react';

// Sample data for a teacher's working hours
const monthlyData = [
  { month: 'January', required: 160, actual: 165, status: 'completed' },
  { month: 'February', required: 152, actual: 148, status: 'undercompleted' },
  { month: 'March', required: 168, actual: 172, status: 'completed' },
  { month: 'April', required: 160, actual: 155, status: 'undercompleted' }, 
  { month: 'May', required: 168, actual: 175, status: 'completed' },
  { month: 'June', required: 152, actual: 158, status: 'completed' },
  { month: 'July', required: 128, actual: 110, status: 'undercompleted' },
  { month: 'August', required: 136, actual: 142, status: 'completed' },
  { month: 'September', required: 160, actual: 168, status: 'completed' },
  { month: 'October', required: 168, actual: 170, status: 'completed' },
  { month: 'November', required: 152, actual: 145, status: 'undercompleted' },
  { month: 'December', required: 144, actual: 150, status: 'completed' }
];

// Calculate statistics
const totalRequired = monthlyData.reduce((sum, month) => sum + month.required, 0);
const totalActual = monthlyData.reduce((sum, month) => sum + month.actual, 0);
const completedMonths = monthlyData.filter(month => month.status === 'completed').length;
const undercompletedMonths = monthlyData.filter(month => month.status === 'undercompleted').length;
const complianceRate = Math.round((completedMonths / monthlyData.length) * 100);

export default function TeacherHoursVisualization() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Animation effect
  useEffect(() => {
    let interval;
    
    if (isAnimating) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % monthlyData.length);
      }, 2000);
    }
    
    return () => clearInterval(interval);
  }, [isAnimating]);
  
  const handleToggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };
  
  // Animated data
  const animatedData = monthlyData.slice(0, activeIndex + 1);
  
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">Prof. Johnson's Working Hours</h1>
          <p className="text-gray-600">Academic Year 2024-2025</p>
        </div>
        <button 
          onClick={handleToggleAnimation} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isAnimating ? 'Pause Animation' : 'Resume Animation'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <Clock className="text-blue-500 mr-3" size={24} />
          <div>
            <p className="text-gray-500">Total Hours</p>
            <p className="text-xl font-semibold">{totalActual} / {totalRequired}</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <Calendar className="text-green-500 mr-3" size={24} />
          <div>
            <p className="text-gray-500">Months Completed</p>
            <p className="text-xl font-semibold">
              <span className="text-green-500">{completedMonths}</span> / 
              <span className="text-red-500"> {undercompletedMonths}</span>
            </p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <Award className="text-purple-500 mr-3" size={24} />
          <div>
            <p className="text-gray-500">Compliance Rate</p>
            <p className="text-xl font-semibold">{complianceRate}%</p>
          </div>
        </div>
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
              <ReferenceLine y={152} stroke="#888" strokeDasharray="3 3" label="Average Required" />
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
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Monthly Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {animatedData.map((month, idx) => (
                <tr key={month.month} className={idx === activeIndex ? "bg-blue-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{month.required}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{month.actual}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={month.actual >= month.required ? "text-green-500" : "text-red-500"}>
                      {month.actual - month.required}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {month.status === 'completed' ? 
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