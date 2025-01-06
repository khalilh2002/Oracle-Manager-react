/* eslint-disable react/prop-types */
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SystemPerformance = ({ data }) => {
  if (!data) return <div>Loading...</div>;

  const chartData = [
    { name: 'User Sessions', value: data.USER_SESSIONS },
    { name: 'Memory Used (MB)', value: data.TOTAL_MEMORY_USED_MB },
    { name: 'Physical Reads', value: data.PHYSICAL_READS },
    { name: 'Physical Writes', value: data.PHYSICAL_WRITES },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="chart-container">
      <h2>System Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <p>Current Time: {data.CURRENT_TIME}</p>
      <p>Total Database Size: {data.TOTAL_DATABASE_SIZE_MB} MB</p>
      <p>CPU Usage: {data.CPU_USAGE_VALUE}</p>
    </div>
  );
};

export default SystemPerformance;

