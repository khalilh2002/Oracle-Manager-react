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
    <div>
      <h2>Role Management</h2>
      <form>
        <label>Role Name:</label>
        <input name="roleName" value={formData.roleName} onChange={handleChange} />

        <label>Privilege:</label>
        <input name="privilege" value={formData.privilege} onChange={handleChange} />

        <label>Grant To User:</label>
        <input name="grantToUser" value={formData.grantToUser} onChange={handleChange} />

        <label>
          With Admin Option:
          <input type="checkbox" name="withAdminOption" checked={formData.withAdminOption} onChange={handleChange} />
        </label>

        <div>
          <button type="button" onClick={handleCreateRole}>Create Role</button>
          <button type="button" onClick={handleGrantPrivilege}>Grant Privilege</button>
          <button type="button" onClick={handleRevokePrivilege}>Revoke Privilege</button>
          <button type="button" onClick={handleDeleteRole}>Delete Role</button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
