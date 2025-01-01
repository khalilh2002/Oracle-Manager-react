import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Adjust to your backend

export const createRole = async (roleRequest) => {
  return await axios.post(`${API_BASE_URL}/role/create`, roleRequest);
};

export const grantPrivilege = async (roleRequest) => {
  return await axios.post(`${API_BASE_URL}/role/grant`, roleRequest);
};

export const revokePrivilege = async (roleRequest) => {
  return await axios.post(`${API_BASE_URL}/role/revoke`, roleRequest);
};

export const deleteRole = async (roleRequest) => {
  return await axios.delete(`${API_BASE_URL}/role/delete`, { data: roleRequest });
};
