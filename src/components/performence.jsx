import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Performance = () => {
  const [metrics, setMetrics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/performance-monitoring/realtime-stats');
        console.log(response.data);
        
        if (Array.isArray(response.data)) {
          const newData = response.data;
          
          setMetrics(prevMetrics => {
            const timestamp = newData[0]?.TIMESTAMP;
            const combined = {
              timestamp,
              cpu_usage: newData.find(m => m.METRIC_NAME === 'CPU Usage')?.VALUE || 0,
              memory_usage: newData.find(m => m.METRIC_NAME === 'Memory Usage')?.VALUE || 0,
              io_usage: newData.find(m => m.METRIC_NAME === 'I/O Usage')?.VALUE || 0
            };

            const updated = [...prevMetrics, combined].slice(-30); // Keep last 30 points
            return updated;
          });
        } else {
          setError('API response is not an array.');
        }
      } catch (err) {
        setError('Failed to fetch metrics');
        console.error(err);
      }
    };
    import { useEffect, useState } from "react";
    import axios from 'axios';
    import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
    
    const Performance = () => {
      const [metrics, setMetrics] = useState([]);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('api/performance-monitoring/realtime-stats');
            const newData = response.data;
    
            setMetrics(prevMetrics => {
              // Combine metrics by timestamp
              const timestamp = newData[0]?.TIMESTAMP;
              const combined = {
                timestamp,
                cpu_usage: newData.find(m => m.METRIC_NAME === 'CPU Usage')?.VALUE || 0,
                memory_usage: newData.find(m => m.METRIC_NAME === 'Memory Usage')?.VALUE || 0,
                io_usage: newData.find(m => m.METRIC_NAME === 'I/O Usage')?.VALUE || 0
              };
    
              const updated = [...prevMetrics, combined].slice(-30); // Keep last 30 points
              return updated;
            });
          } catch (err) {
            setError('Failed to fetch metrics');
            console.error(err);
          }
        };
    
        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
      }, []);
    
      if (error) {
        return (
          <div className="p-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        );
      }
    
      return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Database Performance Metrics</h1>
          
          <div className="grid gap-6 grid-cols-1">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Real-time Metrics</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="cpu_usage" 
                    name="CPU Usage (seconds)" 
                    stroke="#8884d8" 
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="memory_usage" 
                    name="Memory Usage (MB)" 
                    stroke="#82ca9d" 
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="io_usage" 
                    name="I/O Usage (MB/s)" 
                    stroke="#ffc658" 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    };
    
    export default Performance;
    
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Database Performance Metrics</h1>
      
      <div className="grid gap-6 grid-cols-1">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Real-time Metrics</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="cpu_usage" 
                name="CPU Usage (seconds)" 
                stroke="#8884d8" 
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="memory_usage" 
                name="Memory Usage (MB)" 
                stroke="#82ca9d" 
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="io_usage" 
                name="I/O Usage (MB/s)" 
                stroke="#ffc658" 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Performance;
