import React, { useState, useEffect } from 'react';
import axios from '../../api/AxiosApi.jsx';

function RMANOperations() {
  const [backupOutput, setBackupOutput] = useState('');
  const [restoreOutput, setRestoreOutput] = useState('');
  const [incrementalOutput, setIncrementalOutput] = useState('');
  const [restoreByDateOutput, setRestoreByDateOutput] = useState('');
  const [backupsList, setBackupsList] = useState([]);
  const [restoreDate, setRestoreDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBackupsList();
  }, []);

  const fetchBackupsList = async () => {
    try {
      const response = await axios.get('/api/rman/listBackups');
      setBackupsList(response.data);
    } catch (err) {
      setError('Failed to fetch backups list');
      console.error('Error fetching backups list:', err);
    }
  };

  const handleFullBackup = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/rman/fullBackup');
      setBackupOutput(response.data);
    } catch (err) {
      setError('Failed to perform full backup');
      console.error('Error performing full backup:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreRecover = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/rman/restore_recover');
      setRestoreOutput(response.data);
    } catch (err) {
      setError('Failed to perform restore and recover');
      console.error('Error performing restore and recover:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrementalBackup = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/rman/incrementalBackup');
      setIncrementalOutput(response.data);
    } catch (err) {
      setError('Failed to perform incremental backup');
      console.error('Error performing incremental backup:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreByDate = async () => {
    if (!restoreDate) {
      setError('Please enter a valid date');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/rman/restoreByDate?date=${encodeURIComponent(restoreDate)}`);
      setRestoreByDateOutput(response.data);
    } catch (err) {
      setError('Failed to perform restore by date');
      console.error('Error performing restore by date:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">RMAN Operations</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Full Backup</h2>
          <button
            onClick={handleFullBackup}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Processing...' : 'Perform Full Backup'}
          </button>
          {backupOutput && (
            <pre className="mt-4 bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              {backupOutput}
            </pre>
          )}
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Restore and Recover</h2>
          <button
            onClick={handleRestoreRecover}
            disabled={loading}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Processing...' : 'Restore and Recover'}
          </button>
          {restoreOutput && (
            <pre className="mt-4 bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              {restoreOutput}
            </pre>
          )}
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Incremental Backup</h2>
          <button
            onClick={handleIncrementalBackup}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Processing...' : 'Perform Incremental Backup'}
          </button>
          {incrementalOutput && (
            <pre className="mt-4 bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              {incrementalOutput}
            </pre>
          )}
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Restore by Date</h2>
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="datetime-local"
              value={restoreDate}
              onChange={(e) => setRestoreDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={handleRestoreByDate}
              disabled={loading}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? 'Processing...' : 'Restore'}
            </button>
          </div>
          {restoreByDateOutput && (
            <pre className="mt-4 bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              {restoreByDateOutput}
            </pre>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Backups List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
            <tr>
              <th className="px-4 py-2 text-left">Backup Set Key</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Level</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Device Type</th>
              <th className="px-4 py-2 text-left">Completion Time</th>
              <th className="px-4 py-2 text-left">Tag</th>
            </tr>
            </thead>
            <tbody>
            {backupsList.map((backup, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="px-4 py-2">{backup.bsKey}</td>
                <td className="px-4 py-2">{backup.type}</td>
                <td className="px-4 py-2">{backup.level}</td>
                <td className="px-4 py-2">{backup.status}</td>
                <td className="px-4 py-2">{backup.deviceType}</td>
                <td className="px-4 py-2">{backup.completionTime || 'N/A'}</td>
                <td className="px-4 py-2">{backup.tag}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RMANOperations;

