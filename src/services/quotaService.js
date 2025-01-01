import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Adjust to your backend

export const assignQuota = async (quotaRequest) => {
  return await axios.post(`${API_BASE_URL}/quota/assign`, quotaRequest);
};

export const removeQuota = async (quotaRequest) => {
  return await axios.post(`${API_BASE_URL}/quota/remove`, quotaRequest);
};
