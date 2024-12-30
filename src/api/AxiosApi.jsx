import axios from 'axios';

// Create an Axios instance
const axiosApi = axios.create({
  baseURL: 'http://localhost:8080', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export the instance
export default axiosApi;