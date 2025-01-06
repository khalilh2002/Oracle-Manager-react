/* eslint-disable react/prop-types */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CurrentPerformance = ({ data }) => {
  if (!data) return <div>Loading...</div>;

  const chartData = [
    { name: 'Sessions', value: data.sessions },
    { name: 'Memory (MB)', value: data.memory },
    { name: 'CPU', value: data.cpu },
    { name: 'DB Size (MB)', value: data.database_size },
  ];

  return (
    <div className="chart-container">
      <h2>Current Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <p>Timestamp: {data.timestamp}</p>
    </div>
  );
};

export default CurrentPerformance;

