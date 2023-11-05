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
                  <p><strong>Date and Time:</strong> <input type="datetime-local" value={editedAlert.datetime} onChange={(e) => handleInputChange('datetime', e.target.value)} /></p>
                  <p><strong>Cryptocurrency:</strong> <input type="text" value={editedAlert.cryptocurrency} onChange={(e) => handleInputChange('cryptocurrency', e.target.value)} /></p>
                  <p><strong>Type:</strong> <input type="text" value={editedAlert.type} onChange={(e) => handleInputChange('type', e.target.value)} /></p>
                  <p><strong>Expiry Date:</strong> <input type="text" value={editedAlert.expiryDate} onChange={(e) => handleInputChange('expiryDate', e.target.value)} /></p>
                </>
              ) : (
                <>
                  <p><strong>Date and Time:</strong> {alert.datetime}</p>
                  <p><strong>Cryptocurrency:</strong> {alert.cryptocurrency}</p>
                  <p><strong>Type:</strong> {alert.type}</p>
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
