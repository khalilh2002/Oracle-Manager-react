import React, { useState } from 'react';
import FormTemplate, { FormField, SubmitButton } from './FormTemplate';
import { dataGuardService } from '../services/dataGuardService';

const DataGuardForm = () => {
  const [formData, setFormData] = useState({
    primaryDatabase: '',
    standbyDatabase: '',
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfigure = async (e) => {
    e.preventDefault();
    try {
      const response = await dataGuardService.configureDataGuard(formData.primaryDatabase, formData.standbyDatabase);
      setResult(response);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const handleMonitor = async (e) => {
    e.preventDefault();
    try {
      const response = await dataGuardService.monitorDataGuard(formData.primaryDatabase, formData.standbyDatabase);
      setResult(response);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const handleFailover = async (e) => {
    e.preventDefault();
    try {
      const response = await dataGuardService.simulateFailover(formData.primaryDatabase, formData.standbyDatabase);
      setResult(response);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const handleReinstate = async (e) => {
    e.preventDefault();
    try {
      const response = await dataGuardService.reinstatePrimary(formData.primaryDatabase);
      setResult(response);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <FormTemplate title="Data Guard Management">
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
      <div className="grid grid-cols-2 gap-4">
        <SubmitButton onClick={handleConfigure}>Configure Data Guard</SubmitButton>
        <SubmitButton onClick={handleMonitor}>Monitor Data Guard</SubmitButton>
        <SubmitButton onClick={handleFailover}>Simulate Failover</SubmitButton>
        <SubmitButton onClick={handleReinstate}>Reinstate Primary</SubmitButton>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h4 className="text-lg font-semibold mb-2">Result:</h4>
          <p>{result}</p>
        </div>
      )}
    </FormTemplate>
  );
};

export default DataGuardForm;

