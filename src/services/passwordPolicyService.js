import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Update this to match your backend

export const createPolicy = async (policyRequest) => {
  return await axios.post(`${API_BASE_URL}/password-policy/create`, policyRequest);
};

export const assignPolicyToUser = async (assignPolicyRequest) => {
  return await axios.post(`${API_BASE_URL}/password-policy/assign`, assignPolicyRequest);
};

export const deletePolicy = async (deletePolicyRequest) => {
  return await axios.delete(`${API_BASE_URL}/password-policy/delete`, {
    data: deletePolicyRequest,
  });
};
