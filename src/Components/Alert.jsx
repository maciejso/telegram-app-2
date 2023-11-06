import React, { useState } from 'react';
import './Alert.css';

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
    type: 'value',
    value: '50000',
    expiryDate: "2023-12-31T23:59"
  });

  const handleInputChange = (field, value) => {
    setAlert((prevAlert) => ({
      ...prevAlert,
      [field]: value,
    }));
  };

  const handleSaveAlert = () => {
    console.log('Alert saved:', alert);
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
        <label htmlFor="value">Value:</label>
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
