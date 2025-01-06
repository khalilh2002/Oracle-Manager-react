import React, { useState } from "react";
import { configureEncryption, configureAudit, configureVPD } from "../services/securityService";

const SecurityPolicyForm = () => {
  const [encryptionFormData, setEncryptionFormData] = useState({
    tableName: "",
    columnName: "",
    encryptionAlgorithm: "AES256",
  });

  const [auditFormData, setAuditFormData] = useState({
    actionName: "",
    objectName: "",
  });

  const [vpdFormData, setVpdFormData] = useState({
    schemaName: "",
    tableName: "",
    policyName: "",
    policyFunction: "",
    statementTypes: "SELECT",
  });

  const handleEncryptionChange = (e) => {
    const { name, value } = e.target;
    setEncryptionFormData({ ...encryptionFormData, [name]: value });
  };

  const handleAuditChange = (e) => {
    const { name, value } = e.target;
    setAuditFormData({ ...auditFormData, [name]: value });
  };

  const handleVPDChange = (e) => {
    const { name, value } = e.target;
    setVpdFormData({ ...vpdFormData, [name]: value });
  };

  const handleConfigureEncryption = async () => {
    try {
      const response = await configureEncryption(encryptionFormData);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response?.data || error.message);
    }
  };

  const handleConfigureAudit = async () => {
    try {
      const response = await configureAudit(auditFormData);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response?.data || error.message);
    }
  };

  const handleConfigureVPD = async () => {
    try {
      const response = await configureVPD(vpdFormData);
      alert(response.data);
    } catch (error) {
      alert("Error: " + error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Security Policy Management</h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Configure Encryption</h3>
          <form className="space-y-4">
            <FormField label="Table Name" name="tableName" value={encryptionFormData.tableName} onChange={handleEncryptionChange} />
            <FormField label="Column Name" name="columnName" value={encryptionFormData.columnName} onChange={handleEncryptionChange} />
            <FormField label="Encryption Algorithm" name="encryptionAlgorithm" value={encryptionFormData.encryptionAlgorithm} onChange={handleEncryptionChange} />
            <Button onClick={handleConfigureEncryption}>Configure Encryption</Button>
          </form>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Configure Audit</h3>
          <form className="space-y-4">
            <FormField label="Action Name" name="actionName" value={auditFormData.actionName} onChange={handleAuditChange} />
            <FormField label="Object Name" name="objectName" value={auditFormData.objectName} onChange={handleAuditChange} />
            <Button onClick={handleConfigureAudit}>Configure Audit</Button>
          </form>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Configure VPD</h3>
          <form className="space-y-4">
            <FormField label="Schema Name" name="schemaName" value={vpdFormData.schemaName} onChange={handleVPDChange} />
            <FormField label="Table Name" name="tableName" value={vpdFormData.tableName} onChange={handleVPDChange} />
            <FormField label="Policy Name" name="policyName" value={vpdFormData.policyName} onChange={handleVPDChange} />
            <FormField label="Policy Function" name="policyFunction" value={vpdFormData.policyFunction} onChange={handleVPDChange} />
            <FormField label="Statement Types" name="statementTypes" value={vpdFormData.statementTypes} onChange={handleVPDChange} />
            <Button onClick={handleConfigureVPD}>Configure VPD</Button>
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

export default SecurityPolicyForm;

