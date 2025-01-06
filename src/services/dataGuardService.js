import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Adjust this to match your Spring Boot server URL

export const dataGuardService = {
  configureDataGuard: async (primaryDatabase, standbyDatabase) => {
    try {
      const response = await axios.post(`${API_URL}/dataguard/configure`, { primaryDatabase, standbyDatabase });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  monitorDataGuard: async (primaryDatabase, standbyDatabase) => {
    try {
      const response = await axios.get(`${API_URL}/dataguard/monitor`, {
        params: { primaryDatabase, standbyDatabase }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  simulateFailover: async (primaryDatabase, standbyDatabase) => {
    try {
      const response = await axios.post(`${API_URL}/dataguard/failover`, { primaryDatabase, standbyDatabase });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  reinstatePrimary: async (primaryDatabase) => {
    try {
      const response = await axios.post(`${API_URL}/dataguard/reinstate`, { primaryDatabase });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};
