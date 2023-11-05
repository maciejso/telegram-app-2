// Alert.js
import React, { useState } from 'react';
import './Alert.css';

const DateTimePicker = ({ value, onChange }) => (
  <input type="datetime-local" value={value} onChange={(e) => onChange(e.target.value)} />
);

const Dropdown = ({ options, value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const Alert = () => {
  const [alert, setAlert] = useState({
    datetime: '',
    cryptocurrency: '',
    type: '',
    expiryDate: '',
  });

  const handleInputChange = (field, value) => {
    setAlert((prevAlert) => ({
      ...prevAlert,
      [field]: value,
    }));
  };

  const handleSaveAlert = () => {
    // Implement your save logic using API here
    console.log('Alert saved:', alert);
  };

  return (
    <div className="alert-container">
      <h2>Add Cryptocurrency Alert</h2>

      <div className="form-group">
        <label htmlFor="datetimePicker">Select Date and Time:</label>
        <DateTimePicker
          value={alert.datetime}
          onChange={(value) => handleInputChange('datetime', value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cryptocurrencyPicker">Select Cryptocurrency:</label>
        <Dropdown
          options={['Bitcoin', 'Ethereum', 'Ton']} // Add more cryptocurrencies as needed
          value={alert.cryptocurrency}
          onChange={(value) => handleInputChange('cryptocurrency', value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="typePicker">Select Type:</label>
        <Dropdown
          options={['Percent Change', 'Value Change']}
          value={alert.type}
          onChange={(value) => handleInputChange('type', value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="expiryDatePicker">Select Expiry Date:</label>
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
