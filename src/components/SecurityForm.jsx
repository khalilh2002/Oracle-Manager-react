'use client'

import React, { useState } from "react"
import { Shield, Lock, Eye, FileText, AlertCircle, ChevronDown } from 'lucide-react'
import { configureEncryption, configureAudit, configureVPD } from "../services/securityService"

const SecurityPolicyForm = () => {
  const [activeTab, setActiveTab] = useState("encryption")
  const [loading, setLoading] = useState(false)
  const [encryptionFormData, setEncryptionFormData] = useState({
    tableName: "",
    columnName: "",
    encryptionAlgorithm: "AES256",
  })

  const [auditFormData, setAuditFormData] = useState({
    actionName: "",
    objectName: "",
  })

  const [vpdFormData, setVpdFormData] = useState({
    schemaName: "",
    tableName: "",
    policyName: "",
    policyFunction: "",
    statementTypes: "SELECT",
  })

  const handleEncryptionChange = (e) => {
    const { name, value } = e.target
    setEncryptionFormData({ ...encryptionFormData, [name]: value })
  }

  const handleAuditChange = (e) => {
    const { name, value } = e.target
    setAuditFormData({ ...auditFormData, [name]: value })
  }

  const handleVPDChange = (e) => {
    const { name, value } = e.target
    setVpdFormData({ ...vpdFormData, [name]: value })
  }

  const handleConfigureEncryption = async () => {
    setLoading(true)
    try {
      const response = await configureEncryption(encryptionFormData)
      alert(response.data)
    } catch (error) {
      alert(`Error: ${error.response?.data || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleConfigureAudit = async () => {
    setLoading(true)
    try {
      const response = await configureAudit(auditFormData)
      alert(response.data)
    } catch (error) {
      alert(`Error: ${error.response?.data || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleConfigureVPD = async () => {
    setLoading(true)
    try {
      const response = await configureVPD(vpdFormData)
      alert(response.data)
    } catch (error) {
      alert(`Error: ${error.response?.data || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Security Policy Management</h1>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
        <div className="flex">
          <AlertCircle className="h-6 w-6 mr-2" />
          <div>
            <p className="font-bold">Important</p>
            <p>Configuring security policies may affect database performance. Please review your settings carefully.</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <ul className="flex border-b">
          <li className="-mb-px mr-1">
            <a
              className={`bg-white inline-block py-2 px-4 font-semibold ${
                activeTab === "encryption" ? "border-l border-t border-r rounded-t text-blue-700" : "text-blue-500 hover:text-blue-800"
              }`}
              onClick={() => setActiveTab("encryption")}
              href="#encryption"
            >
              Encryption
            </a>
          </li>
          <li className="mr-1">
            <a
              className={`bg-white inline-block py-2 px-4 font-semibold ${
                activeTab === "audit" ? "border-l border-t border-r rounded-t text-blue-700" : "text-blue-500 hover:text-blue-800"
              }`}
              onClick={() => setActiveTab("audit")}
              href="#audit"
            >
              Audit
            </a>
          </li>
          <li className="mr-1">
            <a
              className={`bg-white inline-block py-2 px-4 font-semibold ${
                activeTab === "vpd" ? "border-l border-t border-r rounded-t text-blue-700" : "text-blue-500 hover:text-blue-800"
              }`}
              onClick={() => setActiveTab("vpd")}
              href="#vpd"
            >
              VPD
            </a>
          </li>
        </ul>
      </div>
      {activeTab === "encryption" && (
        <EncryptionForm
          formData={encryptionFormData}
          onChange={handleEncryptionChange}
          onSubmit={handleConfigureEncryption}
          loading={loading}
        />
      )}
      {activeTab === "audit" && (
        <AuditForm
          formData={auditFormData}
          onChange={handleAuditChange}
          onSubmit={handleConfigureAudit}
          loading={loading}
        />
      )}
      {activeTab === "vpd" && (
        <VPDForm
          formData={vpdFormData}
          onChange={handleVPDChange}
          onSubmit={handleConfigureVPD}
          loading={loading}
        />
      )}
    </div>
  )
}

const EncryptionForm = ({ formData, onChange, onSubmit, loading }) => (
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 className="text-2xl font-bold mb-6">Configure Encryption</h2>
    <p className="mb-4 text-gray-600">Set up encryption for your database tables and columns</p>
    <form>
      <FormField
        label="Table Name"
        name="tableName"
        value={formData.tableName}
        onChange={onChange}
        icon={<FileText className="h-5 w-5 text-gray-400" />}
      />
      <FormField
        label="Column Name"
        name="columnName"
        value={formData.columnName}
        onChange={onChange}
        icon={<FileText className="h-5 w-5 text-gray-400" />}
      />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="encryptionAlgorithm">
          Encryption Algorithm
        </label>
        <div className="relative">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="encryptionAlgorithm"
            name="encryptionAlgorithm"
            value={formData.encryptionAlgorithm}
            onChange={onChange}
          >
            <option value="AES256">AES256</option>
            <option value="3DES168">3DES168</option>
            <option value="BLOWFISH128">BLOWFISH128</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
      >
        <Lock className="mr-2 h-5 w-5" />
        {loading ? 'Configuring...' : 'Configure Encryption'}
      </button>
    </form>
  </div>
)

const AuditForm = ({ formData, onChange, onSubmit, loading }) => (
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 className="text-2xl font-bold mb-6">Configure Audit</h2>
    <p className="mb-4 text-gray-600">Set up auditing for your database actions and objects</p>
    <form>
      <FormField
        label="Action Name"
        name="actionName"
        value={formData.actionName}
        onChange={onChange}
        icon={<Eye className="h-5 w-5 text-gray-400" />}
      />
      <FormField
        label="Object Name"
        name="objectName"
        value={formData.objectName}
        onChange={onChange}
        icon={<FileText className="h-5 w-5 text-gray-400" />}
      />
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
      >
        <Eye className="mr-2 h-5 w-5" />
        {loading ? 'Configuring...' : 'Configure Audit'}
      </button>
    </form>
  </div>
)

const VPDForm = ({ formData, onChange, onSubmit, loading }) => (
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 className="text-2xl font-bold mb-6">Configure VPD</h2>
    <p className="mb-4 text-gray-600">Set up Virtual Private Database policies</p>
    <form>
      <FormField
        label="Schema Name"
        name="schemaName"
        value={formData.schemaName}
        onChange={onChange}
        icon={<FileText className="h-5 w-5 text-gray-400" />}
      />
      <FormField
        label="Table Name"
        name="tableName"
        value={formData.tableName}
        onChange={onChange}
        icon={<FileText className="h-5 w-5 text-gray-400" />}
      />
      <FormField
        label="Policy Name"
        name="policyName"
        value={formData.policyName}
        onChange={onChange}
        icon={<Shield className="h-5 w-5 text-gray-400" />}
      />
      <FormField
        label="Policy Function"
        name="policyFunction"
        value={formData.policyFunction}
        onChange={onChange}
        icon={<FileText className="h-5 w-5 text-gray-400" />}
      />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="statementTypes">
          Statement Types
        </label>
        <div className="relative">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="statementTypes"
            name="statementTypes"
            value={formData.statementTypes}
            onChange={onChange}
          >
            <option value="SELECT">SELECT</option>
            <option value="INSERT">INSERT</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
      >
        <Shield className="mr-2 h-5 w-5" />
        {loading ? 'Configuring...' : 'Configure VPD'}
      </button>
    </form>
  </div>
)

const FormField = ({ label, name, value, onChange, icon }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </span>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
        id={name}
        type="text"
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
)

export default SecurityPolicyForm

