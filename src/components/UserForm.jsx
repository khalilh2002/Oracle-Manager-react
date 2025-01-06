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
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>
      <form className="space-y-4">
        <FormField label="Username" name="username" value={formData.username} onChange={handleChange} />
        <FormField label="Password" name="password" value={formData.password} onChange={handleChange} type="password" />
        <FormField label="Default Tablespace" name="defaultTablespace" value={formData.defaultTablespace} onChange={handleChange} />
        <FormField label="Temporary Tablespace" name="tempTablespace" value={formData.tempTablespace} onChange={handleChange} />
        <FormField label="Role" name="role" value={formData.role} onChange={handleChange} />

        <div className="flex space-x-4">
          <Button onClick={handleCreate}>Create User</Button>
          <Button onClick={handleModify}>Modify User</Button>
          <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete User</Button>
        </div>
      </form>
    </div>
  );
};

const FormField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}:
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

const Button = ({ onClick, children, className = "" }) => (
  <button
    className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${className}`}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

export default UserForm;

