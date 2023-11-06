import React, { useState } from 'react';
import './Alert.css';
      
const url = 'http://localhost:5000/alerts';

const trigger_type = ["value_change", "percent_change"]

const DateTimePicker = ({ value, onChange }) => (
  <input type="datetime-local" value={value} onChange={(e) => onChange(e.target.value)} />
);

const Dropdown = ({ options, selectedOption, onChange }) => (
  <select value={selectedOption} onChange={(e) => onChange(e.target.value)}>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const Alert = () => {
  const [alert, setAlert] = useState({
    cryptocurrency: 'BTC',
    type: 'value_change',
    value: '2000',
    expiryDate: "2023-12-31T23:59"
  });

  const handleInputChange = (field, value) => {
    setAlert((prevAlert) => ({
      ...prevAlert,
      [field]: value,
    }));
  };

  const handleSaveAlert = async () => {
    try {
      const response = await fetch('http://localhost:5000/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alert),
      });

      if (!response.ok) {
        throw new Error('Failed to save alert');
      }

      console.log('Alert saved successfully');
    } catch (error) {
      console.error('Error saving alert:', error);
    }
  };

  return (
    <div className="alert-container">
      <h2>Add Alert</h2>

      <div className="form-group">
        <label htmlFor="cryptocurrencyPicker">Select Cryptocurrency:</label>
        <Dropdown
          options={['BTC', 'ETH', 'TON']}
          selectedOption={alert.cryptocurrency}
          onChange={(value) => handleInputChange('cryptocurrency', value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="typePicker">Select Type:</label>
        <Dropdown
          options={['Percent Change', 'Value Change']}
          selectedOption={alert.type}
          onChange={(value) => handleInputChange('type', value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="value">Value (USD):</label>
        <input
          type="text"
          value={alert.value}
          onChange={(e) => handleInputChange('value', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="datetimePicker">Expiry Date:</label>
        <DateTimePicker
          value={alert.expiryDate}
          onChange={(value) => handleInputChange('expiryDate', value)}
        />
      </div>

      <button className="save-button" type="submit" onClick={handleSaveAlert}>
        Save Alert
      </button>
    </div>
  );
};

export default Alert;
