// AlertList.js
import React, { useState } from 'react';
import './AlertList.css';

const AlertList = ({ alerts, onEditAlert }) => {
  const [editingAlertId, setEditingAlertId] = useState(null);

  const handleEditClick = (alertId) => {
    setEditingAlertId(alertId);
    onEditAlert(alertId);
  };

  const handleCancelEdit = () => {
    setEditingAlertId(null);
  };

  return (
    <div className="alert-list-container">
      <h2>Alert List</h2>

      <ul className="alert-list">
        {alerts.map((alert) => (
          <li key={alert.id} className={editingAlertId === alert.id ? 'editing' : ''}>
            <div className="alert-details">
              <p><strong>Cryptocurrency:</strong> {alert.cryptocurrency}</p>
              <p><strong>Type:</strong> {alert.type}</p>
              <p><strong>Value:</strong> {alert.value}</p>
              <p><strong>Currency:</strong> {alert.currency}</p>
              <p><strong>Expiry Date:</strong> {alert.expiryDate}</p>
            </div>
            <div className="alert-actions">
              {editingAlertId === alert.id ? (
                <button onClick={handleCancelEdit}>Cancel</button>
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
