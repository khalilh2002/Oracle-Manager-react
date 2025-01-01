import React, { useState } from "react";
import { configureEncryption, configureAudit, configureVPD } from "../services/securityService";

const SecurityPolicyForm = () => {
  const [encryptionFormData, setEncryptionFormData] = useState({
    tableName: "",
    columnName: "",
    encryptionAlgorithm: "AES256", // Default encryption algorithm
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
    statementTypes: "SELECT", // Default to SELECT
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
    <div>
      <h2>Security Policy Management</h2>

      <section>
        <h3>Configure Encryption</h3>
        <form>
          <label>Table Name:</label>
          <input
            type="text"
            name="tableName"
            value={encryptionFormData.tableName}
            onChange={handleEncryptionChange}
            required
          />

          <label>Column Name:</label>
          <input
            type="text"
            name="columnName"
            value={encryptionFormData.columnName}
            onChange={handleEncryptionChange}
            required
          />

          <label>Encryption Algorithm:</label>
          <input
            type="text"
            name="encryptionAlgorithm"
            value={encryptionFormData.encryptionAlgorithm}
            onChange={handleEncryptionChange}
          />

          <button type="button" onClick={handleConfigureEncryption}>
            Configure Encryption
          </button>
        </form>
      </section>

      <section>
        <h3>Configure Audit</h3>
        <form>
          <label>Action Name:</label>
          <input
            type="text"
            name="actionName"
            value={auditFormData.actionName}
            onChange={handleAuditChange}
            required
          />

          <label>Object Name:</label>
          <input
            type="text"
            name="objectName"
            value={auditFormData.objectName}
            onChange={handleAuditChange}
            required
          />

          <button type="button" onClick={handleConfigureAudit}>
            Configure Audit
          </button>
        </form>
      </section>

      <section>
        <h3>Configure VPD</h3>
        <form>
          <label>Schema Name:</label>
          <input
            type="text"
            name="schemaName"
            value={vpdFormData.schemaName}
            onChange={handleVPDChange}
          />

          <label>Table Name:</label>
          <input
            type="text"
            name="tableName"
            value={vpdFormData.tableName}
            onChange={handleVPDChange}
            required
          />

          <label>Policy Name:</label>
          <input
            type="text"
            name="policyName"
            value={vpdFormData.policyName}
            onChange={handleVPDChange}
            required
          />

          <label>Policy Function:</label>
          <input
            type="text"
            name="policyFunction"
            value={vpdFormData.policyFunction}
            onChange={handleVPDChange}
            required
          />

          <label>Statement Types:</label>
          <input
            type="text"
            name="statementTypes"
            value={vpdFormData.statementTypes}
            onChange={handleVPDChange}
          />

          <button type="button" onClick={handleConfigureVPD}>
            Configure VPD
          </button>
        </form>
      </section>
    </div>
  );
};

export default SecurityPolicyForm;
