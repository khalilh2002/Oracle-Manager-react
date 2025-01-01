import React, { useState } from "react";
import { createPolicy, assignPolicyToUser, deletePolicy } from "../services/passwordPolicyService";

const PasswordPolicyForm = () => {
  const [policyFormData, setPolicyFormData] = useState({
    profileName: "",
    passwordLifeTime: 0,
    passwordReuseTime: 0,
    passwordLockTime: 0,
  });

  const [assignFormData, setAssignFormData] = useState({
    username: "",
    profileName: "",
  });

  const [deleteFormData, setDeleteFormData] = useState({
    profileName: "",
  });

  const handlePolicyChange = (e) => {
    const { name, value } = e.target;
    setPolicyFormData({ ...policyFormData, [name]: value });
  };

  const handleAssignChange = (e) => {
    const { name, value } = e.target;
    setAssignFormData({ ...assignFormData, [name]: value });
  };

  const handleDeleteChange = (e) => {
    const { name, value } = e.target;
    setDeleteFormData({ ...deleteFormData, [name]: value });
  };

  const handleCreatePolicy = async () => {
    try {
      const response = await createPolicy(policyFormData);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response?.data || error.message);
    }
  };

  const handleAssignPolicy = async () => {
    try {
      const response = await assignPolicyToUser(assignFormData);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response?.data || error.message);
    }
  };

  const handleDeletePolicy = async () => {
    try {
      const response = await deletePolicy(deleteFormData);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Password Policy Management</h2>

      <section>
        <h3>Create Policy</h3>
        <form>
          <label>Profile Name:</label>
          <input
            type="text"
            name="profileName"
            value={policyFormData.profileName}
            onChange={handlePolicyChange}
            required
          />

          <label>Password Life Time (days):</label>
          <input
            type="number"
            name="passwordLifeTime"
            value={policyFormData.passwordLifeTime}
            onChange={handlePolicyChange}
          />

          <label>Password Reuse Time (days):</label>
          <input
            type="number"
            name="passwordReuseTime"
            value={policyFormData.passwordReuseTime}
            onChange={handlePolicyChange}
          />

          <label>Password Lock Time (days):</label>
          <input
            type="number"
            name="passwordLockTime"
            value={policyFormData.passwordLockTime}
            onChange={handlePolicyChange}
          />

          <button type="button" onClick={handleCreatePolicy}>
            Create Policy
          </button>
        </form>
      </section>

      <section>
        <h3>Assign Policy to User</h3>
        <form>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={assignFormData.username}
            onChange={handleAssignChange}
            required
          />

          <label>Profile Name:</label>
          <input
            type="text"
            name="profileName"
            value={assignFormData.profileName}
            onChange={handleAssignChange}
            required
          />

          <button type="button" onClick={handleAssignPolicy}>
            Assign Policy
          </button>
        </form>
      </section>

      <section>
        <h3>Delete Policy</h3>
        <form>
          <label>Profile Name:</label>
          <input
            type="text"
            name="profileName"
            value={deleteFormData.profileName}
            onChange={handleDeleteChange}
            required
          />

          <button type="button" onClick={handleDeletePolicy}>
            Delete Policy
          </button>
        </form>
      </section>
    </div>
  );
};

export default PasswordPolicyForm;
