import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './weekly.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function WeeklyGraph() {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true); // move useState here inside the component

  const handleToggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const weeklyData = [
    { day: 'Mon', hours: 6 },
    { day: 'Tue', hours: 8 },
    { day: 'Wed', hours: 7 },
    { day: 'Thu', hours: 9 },
    { day: 'Fri', hours: 5 },
    { day: 'Sat', hours: 4 },
    { day: 'Sun', hours: 0 },
  ];

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">Prof. Johnson's Working Hours</h1>
          <p className="text-gray-600">Academic Year 2024-2025</p>
        </div>

        <div className="flex items-center gap-4">
          <select
            onChange={(e) => {
              if (e.target.value === 'weekly') {
                window.location.href = '/weekly-graph';
              } else if (e.target.value === 'monthly') {
                navigate('/monthly-graph');
              }
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

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Weekly Working Hours</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="hours"
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
    </div>
  );
}

export default WeeklyGraph;
