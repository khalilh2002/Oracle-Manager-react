import React, { useState } from 'react';
import { Shield, Monitor, RefreshCw, RotateCw } from 'react-feather';
import { dataGuardService } from '../services/dataGuardService';

const DataGuardForm = () => {
  const [formData, setFormData] = useState({
    primaryDatabase: '',
    standbyDatabase: '',
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAction = async (action) => {
    setLoading(true);
    try {
      let response;
      switch (action) {
        case 'configure':
          response = await dataGuardService.configureDataGuard(formData.primaryDatabase, formData.standbyDatabase);
          break;
        case 'monitor':
          response = await dataGuardService.monitorDataGuard(formData.primaryDatabase, formData.standbyDatabase);
          break;
        case 'failover':
          response = await dataGuardService.simulateFailover(formData.primaryDatabase, formData.standbyDatabase);
          break;
        case 'reinstate':
          response = await dataGuardService.reinstatePrimary(formData.primaryDatabase);
          break;
        default:
          throw new Error('Invalid action');
      }
      setResult(response);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const FormField = ({ label, name, value, onChange, required }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2 font-semibold text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oracle-red focus:border-transparent transition duration-200"
      />
    </div>
  );

  const ActionButton = ({ icon, onClick, disabled, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center px-4 py-2 bg-oracle-red text-white rounded-md hover:bg-oracle-dark-red focus:outline-none focus:ring-2 focus:ring-oracle-red focus:ring-opacity-50 transition duration-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {icon}
      <span className="ml-2">{children}</span>
    </button>
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Data Guard Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FormField
          label="Primary Database"
          name="primaryDatabase"
          value={formData.primaryDatabase}
          onChange={handleChange}
          required
        />
        <FormField
          label="Standby Database"
          name="standbyDatabase"
          value={formData.standbyDatabase}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <ActionButton
          icon={<Shield className="w-5 h-5" />}
          onClick={() => handleAction('configure')}
          disabled={loading}
        >
          Configure Data Guard
        </ActionButton>
        <ActionButton
          icon={<Monitor className="w-5 h-5" />}
          onClick={() => handleAction('monitor')}
          disabled={loading}
        >
          Monitor Data Guard
        </ActionButton>
        <ActionButton
          icon={<RefreshCw className="w-5 h-5" />}
          onClick={() => handleAction('failover')}
          disabled={loading}
        >
          Simulate Failover
        </ActionButton>
        <ActionButton
          icon={<RotateCw className="w-5 h-5" />}
          onClick={() => handleAction('reinstate')}
          disabled={loading}
        >
          Reinstate Primary
        </ActionButton>
      </div>
      {(result || loading) && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-xl font-semibold mb-4 text-gray-800">Result:</h4>
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-oracle-red"></div>
              <span className="ml-2 text-gray-600">Processing...</span>
            </div>
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DataGuardForm;

