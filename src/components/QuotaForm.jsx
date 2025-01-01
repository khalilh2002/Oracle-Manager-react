import React, { useState } from "react";
import { assignQuota, removeQuota } from "../services/quotaService";

const QuotaForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    quotaSize: 0,
    tablespaceName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAssignQuota = async () => {
    try {
      const response = await assignQuota(formData);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response?.data || error.message);
    }
  };

  const handleRemoveQuota = async () => {
    try {
      const response = await removeQuota(formData);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Quota Management</h2>
      <form>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Quota Size (MB):</label>
        <input
          type="number"
          name="quotaSize"
          value={formData.quotaSize}
          onChange={handleChange}
        />

        <label>Tablespace Name:</label>
        <input
          type="text"
          name="tablespaceName"
          value={formData.tablespaceName}
          onChange={handleChange}
          required
        />

        <div>
          <button type="button" onClick={handleAssignQuota}>
            Assign Quota
          </button>
          <button type="button" onClick={handleRemoveQuota}>
            Remove Quota
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuotaForm;
