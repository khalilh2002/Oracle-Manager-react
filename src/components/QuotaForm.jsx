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
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Quota Management</h2>
      <form className="space-y-4">
        <FormField label="Username" name="username" value={formData.username} onChange={handleChange} />
        <FormField label="Quota Size (MB)" name="quotaSize" value={formData.quotaSize} onChange={handleChange} type="number" />
        <FormField label="Tablespace Name" name="tablespaceName" value={formData.tablespaceName} onChange={handleChange} />

        <div className="flex space-x-4">
          <Button onClick={handleAssignQuota}>Assign Quota</Button>
          <Button onClick={handleRemoveQuota} className="bg-red-500 hover:bg-red-600">Remove Quota</Button>
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

export default QuotaForm;

