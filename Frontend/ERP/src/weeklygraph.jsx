import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TeacherWorkHoursChart() {
  // Sample data for a teacher's work hours throughout the week
  const data = [
    { day: 'Monday', hours: 8 },
    { day: 'Tuesday', hours: 9 },
    { day: 'Wednesday', hours: 7 },
    { day: 'Thursday', hours: 8.5 },
    { day: 'Friday', hours: 6 },
    { day: 'Saturday', hours: 3 },
    { day: 'Sunday', hours: 1 },
  ];

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Teacher Weekly Work Hours</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis 
            label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} 
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" fill="#8884d8" name="Work Hours" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-sm text-gray-600">
        <p>This chart displays the number of hours a teacher works each day of the week.</p>
        <p>Weekdays show higher workloads, while weekends have reduced hours for grading and preparation.</p>
      </div>
    </div>
  );
}