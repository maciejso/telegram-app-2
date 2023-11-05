// AlertList.js
import React, { useState } from 'react';
import './AlertList.css';

const AlertList = ({ alerts, onEditAlert }) => {
  const [editingAlertId, setEditingAlertId] = useState(null);
  const [editedAlert, setEditedAlert] = useState({});

  const handleEditClick = (alertId) => {
    setEditingAlertId(alertId);
    setEditedAlert(alerts.find((alert) => alert.id === alertId));
  };

  const handleCancelEdit = () => {
    setEditingAlertId(null);
    setEditedAlert({});
  };

  const handleSaveEdit = () => {
    onEditAlert(editedAlert);
    setEditingAlertId(null);
    setEditedAlert({});
  };

  const handleInputChange = (field, value) => {
    setEditedAlert((prevEditedAlert) => ({
      ...prevEditedAlert,
      [field]: value,
    }));
  };

  return (
    <div className="alert-list-container">
      <h2>Alert List</h2>

      <ul className="alert-list">
        {alerts.map((alert) => (
          <li key={alert.id} className={editingAlertId === alert.id ? 'editing' : ''}>
            <div className="alert-details">
              {editingAlertId === alert.id ? (
                <>
                  <p><strong>Cryptocurrency:</strong> 
                    <select value={editedAlert.cryptocurrency} onChange={(e) => handleInputChange('cryptocurrency', e.target.value)}>
                      <option value="Bitcoin">BTC</option>
                      <option value="Ethereum">ETH</option>
                      <option value="Ton">TON</option>
                      {/* Add more cryptocurrencies as needed */}
                    </select>
                  </p>
                  <p><strong>Type:</strong> 
                    <select value={editedAlert.type} onChange={(e) => handleInputChange('type', e.target.value)}>
                      <option value="Percent Change">Percent Change</option>
                      <option value="Value Change">Value Change</option>
                      {/* Add more types as needed */}
                    </select>
                  </p>
                  <p><strong>Value:</strong> 
                    <input type="text" value={editedAlert.value} onChange={(e) => handleInputChange('value', e.target.value)} />
                  </p>
                  <p><strong>Expiry Date:</strong> 
                    <input type="datetime-local" value={editedAlert.datetime} onChange={(e) => handleInputChange('datetime', e.target.value)} />
                  </p>
                </>
              ) : (
                <>
                  <p><strong>Cryptocurrency:</strong> {alert.cryptocurrency}</p>
                  <p><strong>Type:</strong> {alert.type}</p>
                  <p><strong>Value:</strong> {alert.value}</p>
                  <p><strong>Expiry Date:</strong> {alert.expiryDate}</p>
                </>
              )}
            </div>
            <div className="alert-actions">
              {editingAlertId === alert.id ? (
                <>
                  <button onClick={handleCancelEdit}>Cancel</button>
                  <button onClick={handleSaveEdit}>Save</button>
                </>
              ) : (
                <button onClick={() => handleEditClick(alert.id)}>Edit</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertList;
