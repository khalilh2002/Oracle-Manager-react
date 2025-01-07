import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle } from 'react-feather';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/performance-optimization',
});

function PerformanceOptimization() {
  const [slowQueryThreshold, setSlowQueryThreshold] = useState('');
  const [slowQueries, setSlowQueries] = useState([]);
  const [sqlId, setSqlId] = useState('');
  const [tuneResult, setTuneResult] = useState(null);
  const [frequency, setFrequency] = useState('');
  const [scheduleResult, setScheduleResult] = useState('');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchJobs();
    fetchSlowQueries();
  }, []);

  const handleSetSlowQueryThreshold = async () => {
    try {
      const res = await api.post(`/params/slow-queries-trash/${slowQueryThreshold}`);
      setSuccess(`Slow query threshold set to: ${res.data}`);
      setError('');
    } catch (err) {
      setError('Failed to set slow query threshold');
      setSuccess('');
    }
  };

  const fetchSlowQueries = async () => {
    try {
      const res = await api.get('/slow-queries');
      setSlowQueries(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch slow queries');
    }
  };

  const handleTuneQuery = async () => {
    try {
      const res = await api.post(`/tune-query/${sqlId}`);
      setTuneResult(res.data);
      setSuccess('Query tuned successfully');
      setError('');
    } catch (err) {
      setError('Failed to tune query');
      setSuccess('');
    }
  };

  const handleScheduleStats = async () => {
    try {
      const res = await api.post(`/schedule-stats/${frequency}`);
      setScheduleResult(res.data.message);
      setSuccess(res.data.message);
      setError('');
    } catch (err) {
      setError('Failed to schedule stats recalculation');
      setSuccess('');
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch jobs');
    }
  };

  const chartData = slowQueries.map(query => ({
    sqlId: query.sqlId,
    elapsedSeconds: query.elapsedSeconds,
    executions: query.executions,
  }));

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Oracle Performance Optimization</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div className="flex">
            <AlertCircle className="h-6 w-6 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <div className="flex">
            <CheckCircle className="h-6 w-6 mr-2" />
            <p>{success}</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Set Slow Query Threshold</h2>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={slowQueryThreshold}
            onChange={(e) => setSlowQueryThreshold(e.target.value)}
            placeholder="Enter threshold in milliseconds"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={handleSetSlowQueryThreshold}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Set Threshold
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Slow Queries</h2>
        <button
          onClick={fetchSlowQueries}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
        >
          Refresh Slow Queries
        </button>
        {slowQueries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
              <tr>
                <th className="px-4 py-2 text-left">SQL ID</th>
                <th className="px-4 py-2 text-left">Elapsed Seconds</th>
                <th className="px-4 py-2 text-left">Executions</th>
                <th className="px-4 py-2 text-left">Avg Seconds Per Exec</th>
                <th className="px-4 py-2 text-left">Parsing Schema Name</th>
                <th className="px-4 py-2 text-left">First Load Time</th>
                <th className="px-4 py-2 text-left">Last Load Time</th>
              </tr>
              </thead>
              <tbody>
              {slowQueries.map((query, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="px-4 py-2">{query.sqlId}</td>
                  <td className="px-4 py-2">{query.elapsedSeconds}</td>
                  <td className="px-4 py-2">{query.executions}</td>
                  <td className="px-4 py-2">{query.avgSecondsPerExec}</td>
                  <td className="px-4 py-2">{query.parsingSchemaName}</td>
                  <td className="px-4 py-2">{query.firstLoadTime}</td>
                  <td className="px-4 py-2">{query.lastLoadTime}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No slow queries found.</p>
        )}
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Slow Queries Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sqlId" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="elapsedSeconds" fill="#8884d8" name="Elapsed Seconds" />
            <Bar yAxisId="right" dataKey="executions" fill="#82ca9d" name="Executions" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Tune Query</h2>
        <div className="flex items-center space-x-2 mb-4">
          <input
            value={sqlId}
            onChange={(e) => setSqlId(e.target.value)}
            placeholder="Enter SQL ID"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={handleTuneQuery}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Tune Query
          </button>
        </div>
        {tuneResult && (
          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-2">Tuning Result:</h3>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h4 className="font-medium text-blue-600 mb-2">SQL Information</h4>
              <ul className="list-disc list-inside mb-4">
                <li>SQL ID: {tuneResult.sqlInfo.SQL_ID}</li>
                <li>Parsing Schema: {tuneResult.sqlInfo.PARSING_SCHEMA_NAME}</li>
                <li>Elapsed Time: {tuneResult.sqlInfo.ELAPSED_SECONDS.toFixed(2)} seconds</li>
                <li>Executions: {tuneResult.sqlInfo.EXECUTIONS}</li>
                <li>CPU Time: {tuneResult.sqlInfo.CPU_SECONDS.toFixed(2)} seconds</li>
                <li>Buffer Gets: {tuneResult.sqlInfo.BUFFER_GETS}</li>
                <li>Disk Reads: {tuneResult.sqlInfo.DISK_READS}</li>
              </ul>
              <h4 className="font-medium text-blue-600 mb-2">SQL Text</h4>
              <pre className="bg-white p-2 rounded mb-4 overflow-x-auto">
                {tuneResult.sqlInfo.SQL_FULLTEXT}
              </pre>
              <h4 className="font-medium text-blue-600 mb-2">Recommendations</h4>
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {tuneResult.recommendations.split('\n').map((line, index) => {
                  if (line.includes('SECTION')) {
                    return <h5 key={index} className="font-bold mt-2 mb-1">{line}</h5>;
                  } else if (line.includes(':')) {
                    const [key, value] = line.split(':');
                    return (
                      <p key={index}>
                        <span className="font-semibold">{key.trim()}:</span>
                        {value}
                      </p>
                    );
                  } else {
                    return <p key={index}>{line}</p>;
                  }
                })}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Schedule Statistics Recalculation</h2>
        <div className="flex items-center space-x-2 mb-4">
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button
            onClick={handleScheduleStats}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Schedule
          </button>
        </div>
        {scheduleResult && (
          <p className="mt-2 text-green-600">{scheduleResult}</p>
        )}
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Scheduled Jobs</h2>
        {jobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
              <tr>
                <th className="px-4 py-2 text-left">Job Name</th>
                <th className="px-4 py-2 text-left">State</th>
                <th className="px-4 py-2 text-left">Last Start Date</th>
                <th className="px-4 py-2 text-left">Next Run Date</th>
                <th className="px-4 py-2 text-left">Repeat Interval</th>
              </tr>
              </thead>
              <tbody>
              {jobs.map((job, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="px-4 py-2">{job.JOB_NAME}</td>
                  <td className="px-4 py-2">{job.STATE}</td>
                  <td className="px-4 py-2">{job.LAST_START_DATE || 'N/A'}</td>
                  <td className="px-4 py-2">{job.NEXT_RUN_DATE}</td>
                  <td className="px-4 py-2">{job.REPEAT_INTERVAL}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No jobs scheduled.</p>
        )}
      </div>
    </div>
  );
}

export default PerformanceOptimization;

