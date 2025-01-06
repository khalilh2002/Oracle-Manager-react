import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RealtimePerformance = ({ data }) => {
  if (!data || data.length === 0) return <div>Loading...</div>;

  return (
    <div className="chart-container">
      <h2>Realtime Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sessions" stroke="#8884d8" name="Sessions" />
          <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory (MB)" />
          <Line type="monotone" dataKey="cpu" stroke="#ffc658" name="CPU" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealtimePerformance;

