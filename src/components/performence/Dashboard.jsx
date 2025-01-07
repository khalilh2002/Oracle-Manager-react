import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentPerformance from './CurrentPerformance';
import IOPerformance from './IOPerformance';
import RealtimePerformance from './RealtimePerformance';
import SystemPerformance from './SystemPerformance';

const Dashboard = () => {
  const [currentData, setCurrentData] = useState(null);
  const [ioData, setIOData] = useState(null);
  const [realtimeData, setRealtimeData] = useState([]);
  const [systemData, setSystemData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const current = await axios.get('http://localhost:8080/api/performance/current');
        setCurrentData(current.data);

        const io = await axios.get('http://localhost:8080/api/performance/io');
        setIOData(io.data);

        const system = await axios.get('http://localhost:8080/api/performance/system');
        setSystemData(system.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const fetchRealtimeData = async () => {
      try {
        const realtime = await axios.get('http://localhost:8080/api/performance/realtime');
        setRealtimeData(realtime.data);
      } catch (error) {
        console.error('Error fetching realtime data:', error);
      }
    };

    fetchRealtimeData();
    const interval = setInterval(fetchRealtimeData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <CurrentPerformance data={currentData} />
        <IOPerformance data={ioData} />
        <RealtimePerformance data={realtimeData} />
        <SystemPerformance data={systemData} />
      </div>
    </div>
  );
};

export default Dashboard;

