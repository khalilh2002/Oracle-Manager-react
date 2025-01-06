import React, { useState } from "react";
import { createRole, grantPrivilege, revokePrivilege, deleteRole } from "../services/roleService";

const RoleForm = () => {
  const [formData, setFormData] = useState({
    roleName: "",
    privilege: "",
    grantToUser: "",
    withAdminOption: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleCreateRole = async () => {
    try {
      const response = await createRole({ roleName: formData.roleName });
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response.data);
    }
  };

  const handleGrantPrivilege = async () => {
    try {
      const response = await grantPrivilege(formData);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response.data);
    }
  };

  const handleRevokePrivilege = async () => {
    try {
      const response = await revokePrivilege(formData);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response.data);
    }
  };

  const handleDeleteRole = async () => {
    try {
      const response = await deleteRole({ roleName: formData.roleName });
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response.data);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Role Management</h2>
      <form className="space-y-4">
        <FormField label="Role Name" name="roleName" value={formData.roleName} onChange={handleChange} />
        <FormField label="Privilege" name="privilege" value={formData.privilege} onChange={handleChange} />
        <FormField label="Grant To User" name="grantToUser" value={formData.grantToUser} onChange={handleChange} />
        <div className="flex items-center">
          <input
            id="withAdminOption"
            type="checkbox"
            name="withAdminOption"
            checked={formData.withAdminOption}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="withAdminOption" className="ml-2 block text-sm text-gray-900">
            With Admin Option
          </label>
        </div>

        <div className="flex space-x-4">
          <Button onClick={handleCreateRole}>Create Role</Button>
          <Button onClick={handleGrantPrivilege}>Grant Privilege</Button>
          <Button onClick={handleRevokePrivilege}>Revoke Privilege</Button>
          <Button onClick={handleDeleteRole} className="bg-red-500 hover:bg-red-600">Delete Role</Button>
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

export default RoleForm;

