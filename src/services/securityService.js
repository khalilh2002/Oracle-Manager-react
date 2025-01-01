import axios from "axios";

const API_BASE_URL = "http://localhost:8080/security"; // Update this to match your backend

export const configureEncryption = async (encryptionRequest) => {
  return await axios.post(`${API_BASE_URL}/encryption`, encryptionRequest);
};

export const configureAudit = async (auditRequest) => {
  return await axios.post(`${API_BASE_URL}/audit`, auditRequest);
};

export const configureVPD = async (vpdRequest) => {
  return await axios.post(`${API_BASE_URL}/vpd`, vpdRequest);
};
