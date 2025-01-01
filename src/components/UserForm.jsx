import React, { useState } from "react";
import { createUser, modifyUser, deleteUser } from "../services/userService";

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    defaultTablespace: "",
    tempTablespace: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const response = await createUser(formData);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response.data);
    }
  };

  const handleModify = async () => {
    try {
      const response = await modifyUser(formData);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response.data);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteUser(formData.username);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response.data);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <form>
        <label>Username:</label>
        <input name="username" value={formData.username} onChange={handleChange} />

        <label>Password:</label>
        <input name="password" value={formData.password} onChange={handleChange} />

        <label>Default Tablespace:</label>
        <input name="defaultTablespace" value={formData.defaultTablespace} onChange={handleChange} />

        <label>Temporary Tablespace:</label>
        <input name="tempTablespace" value={formData.tempTablespace} onChange={handleChange} />

        <label>Role:</label>
        <input name="role" value={formData.role} onChange={handleChange} />

        <div>
          <button type="button" onClick={handleCreate}>Create User</button>
          <button type="button" onClick={handleModify}>Modify User</button>
          <button type="button" onClick={handleDelete}>Delete User</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
