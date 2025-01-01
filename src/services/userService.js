import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Adjust this URL to your backend

export const createUser = async (userRequest) => {
  return await axios.post(`${API_BASE_URL}/user/create`, userRequest);
};

export const modifyUser = async (userRequest) => {
  return await axios.put(`${API_BASE_URL}/user/modify`, userRequest);
};

export const deleteUser = async (username) => {
  return await axios.delete(`${API_BASE_URL}/user/delete`, { data: { username } });
};
