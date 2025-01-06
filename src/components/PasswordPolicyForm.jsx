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
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Password Policy Management</h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Create Policy</h3>
          <form className="space-y-4">
            <FormField label="Profile Name" name="profileName" value={policyFormData.profileName} onChange={handlePolicyChange} />
            <FormField label="Password Life Time (days)" name="passwordLifeTime" value={policyFormData.passwordLifeTime} onChange={handlePolicyChange} type="number" />
            <FormField label="Password Reuse Time (days)" name="passwordReuseTime" value={policyFormData.passwordReuseTime} onChange={handlePolicyChange} type="number" />
            <FormField label="Password Lock Time (days)" name="passwordLockTime" value={policyFormData.passwordLockTime} onChange={handlePolicyChange} type="number" />
            <Button onClick={handleCreatePolicy}>Create Policy</Button>
          </form>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Assign Policy to User</h3>
          <form className="space-y-4">
            <FormField label="Username" name="username" value={assignFormData.username} onChange={handleAssignChange} />
            <FormField label="Profile Name" name="profileName" value={assignFormData.profileName} onChange={handleAssignChange} />
            <Button onClick={handleAssignPolicy}>Assign Policy</Button>
          </form>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Delete Policy</h3>
          <form className="space-y-4">
            <FormField label="Profile Name" name="profileName" value={deleteFormData.profileName} onChange={handleDeleteChange} />
            <Button onClick={handleDeletePolicy} className="bg-red-500 hover:bg-red-600">Delete Policy</Button>
          </form>
        </section>
      </div>
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

export default PasswordPolicyForm;

