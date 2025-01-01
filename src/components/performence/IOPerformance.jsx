/* eslint-disable react/prop-types */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IOPerformance = ({ data }) => {
  if (!data) return <div>Loading...</div>;

  return (
    <div className="chart-container">
      <h2>I/O Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.datafiles}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="FILE_ID" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="SIZE_MB" fill="#8884d8" name="Size (MB)" />
          <Bar yAxisId="right" dataKey="ACTIVE_IO_SESSIONS" fill="#82ca9d" name="Active I/O Sessions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IOPerformance;