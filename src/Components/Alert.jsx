import React, { useState } from 'react';
import './Alert.css';

const url = 'http://localhost:5000/alerts';

const trigger_type = {"Value Change": "value_change", "Percent Change": "percent_change"}

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

const Alert = ({ cryptoPrices, alert, handleInputChange }) => {

  const handleSaveAlert = async () => {
    try {
      const currentPrice = cryptoPrices.find(data => data.cryptocurrency === alert.cryptocurrency)?.value || 0;
      //console.log(trigger_type[alert.type])
      const alertWithPrice = {
        cryptocurrency: alert.cryptocurrency,
        trigger_value: parseInt(alert.value, 10),
        trigger_type: trigger_type[alert.type],
        base_value: currentPrice,
        user_id: "mac",
        expires_at: alert.expiryDate
      };

      console.log(JSON.stringify(alertWithPrice))

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alertWithPrice),
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
        <label htmlFor="value">Value {alert.type == "Percent Change" ? "in %" : "in $"}:</label>
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

