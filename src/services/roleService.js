import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Adjust to your backend

export const createRole = async (roleRequest) => {
  return await axios.post(`${API_BASE_URL}/role/create`, roleRequest);
};

export const grantPrivilege = async (privilegeRequest) => {
  return await axios.post(`${API_BASE_URL}/role/grant`, privilegeRequest);
};

export const revokePrivilege = async (privilegeRequest) => {
  return await axios.post(`${API_BASE_URL}/role/revoke`, privilegeRequest);
};

export const deleteRole = async (roleRequest) => {
  return await axios.delete(`${API_BASE_URL}/role/delete`, { data: roleRequest });
};

// Fetch the list of roles
export const listRoles = async () => {
  return await axios.get(`${API_BASE_URL}/role/list`);
};

// Fetch the privileges/actions for a specific role
export const getRolePrivileges = async (roleName) => {
  return await axios.get(`${API_BASE_URL}/role/${roleName}/privileges`);
};
