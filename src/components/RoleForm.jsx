import React, { useState, useEffect } from "react";
import { createRole, grantPrivilege, revokePrivilege, deleteRole, listRoles } from "../services/roleService";

const RoleForm = () => {
  const [roles, setRoles] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const fetchRoles = async () => {
    try {
      const response = await listRoles();
      console.log("Fetched roles:", response.data);
      setRoles(response.data); // Expecting an array of role names as strings
    } catch (error) {
      alert("Error fetching roles: " + (error.response?.data || error.message));
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreateClick = () => {
    setShowCreateForm(true);
    setSelectedRole(null);
  };

  const handleModifyClick = (role) => {
    setSelectedRole(role);
    setShowCreateForm(true);
  };

  const handleDeleteRole = async (roleName) => {
    try {
      const response = await deleteRole({ roleName });
      alert(response.data);
      fetchRoles();
    } catch (error) {
      alert("Error deleting role: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Role Management</h2>

      {!showCreateForm && (
        <>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            onClick={handleCreateClick}
          >
            Create Role
          </button>
          <RoleTable roles={roles} onModify={handleModifyClick} onDelete={handleDeleteRole} />
        </>
      )}

      {showCreateForm && (
        <CreateOrModifyRoleForm
          onCancel={() => setShowCreateForm(false)}
          onRoleUpdated={fetchRoles}
          role={selectedRole}
        />
      )}
    </div>
  );
};

const RoleTable = ({ roles, onModify, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-md rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border-b font-semibold text-gray-700">Role Name</th>
          <th className="py-2 px-4 border-b font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
            <td className="py-2 px-4 border-b text-gray-700">{role}</td>
            <td className="py-2 px-4 border-b text-gray-700">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                onClick={() => onModify(role)}
              >
                Modify
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                onClick={() => onDelete(role)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CreateOrModifyRoleForm = ({ onCancel, onRoleUpdated, role }) => {
  const [formData, setFormData] = useState({
    roleName: role || "",
    privilege: "",
    grantToUser: "",
    withAdminOption: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGrantPrivilege = async () => {
    try {
      await grantPrivilege(formData);
      alert(`Privilege granted to role ${formData.roleName}`);
      onRoleUpdated();
    } catch (error) {
      alert("Error granting privilege: " + (error.response?.data || error.message));
    }
  };

  const handleRevokePrivilege = async () => {
    try {
      await revokePrivilege(formData);
      alert(`Privilege revoked from role ${formData.roleName}`);
      onRoleUpdated();
    } catch (error) {
      alert("Error revoking privilege: " + (error.response?.data || error.message));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!role) {
        const response = await createRole({ roleName: formData.roleName });
        alert(response.data);
        onRoleUpdated();
        onCancel();
      }
    } catch (error) {
      alert("Error: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{role ? "Modify Role" : "Create Role"}</h2>
      <form className="space-y-4">
        <FormField
          label="Role Name"
          name="roleName"
          value={formData.roleName}
          onChange={handleChange}
          disabled={!!role}
        />
        {role && (
          <>
            <FormField
              label="Privilege"
              name="privilege"
              value={formData.privilege}
              onChange={handleChange}
            />
            <FormField
              label="Grant to User"
              name="grantToUser"
              value={formData.grantToUser}
              onChange={handleChange}
            />
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <input
                  type="checkbox"
                  name="withAdminOption"
                  checked={formData.withAdminOption}
                  onChange={handleChange}
                  className="mr-2"
                />
                With Admin Option
              </label>
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleGrantPrivilege}>Grant Privilege</Button>
              <Button onClick={handleRevokePrivilege} className="bg-red-500 hover:bg-red-600">
                Revoke Privilege
              </Button>
            </div>
          </>
        )}
        {!role && (
          <div className="flex space-x-4">
            <Button onClick={handleSubmit}>Create</Button>
            <Button onClick={onCancel} className="bg-gray-400 hover:bg-gray-500">
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

// Helper Components
const FormField = ({ label, name, value, onChange, type = "text", disabled = false }) => (
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
      disabled={disabled}
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
