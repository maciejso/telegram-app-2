import React, { useState, useEffect } from 'react';
import './AlertList.css';

const url = "http://localhost:5000/alerts?state=active"

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const [editingAlertId, setEditingAlertId] = useState(null);
  const [editedAlert, setEditedAlert] = useState({});
  const [loading, setLoading] = useState(true);

  const handleSaveAlert = (newAlert) => {
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  const onEditAlert = (editedAlert) => {
    console.log('Edited Alert:', editedAlert);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);
        setAlerts(data);
        setLoading(false);  // Update loading state
      } catch (error) {
        console.error(error);
        setLoading(false);  // Update loading state in case of error
      }
    };

    fetchData();
  }, []);


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
      <h2>Alerts List</h2>
      {loading ? (<p>Loading...</p>) : (

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
                      </select>
                    </p>
                    <p><strong>Type:</strong>
                      <select value={editedAlert.type} onChange={(e) => handleInputChange('type', e.target.value)}>
                        <option value="Percent Change">Percent Change</option>
                        <option value="Value Change">Value Change</option>
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
                    <p><strong>Cryptocurrency: </strong> {alert.cryptocurrency}</p>
                    <p><strong>Type: </strong> {alert.trigger_type}</p>
                    <p><strong>Value: </strong>{ alert.trigger_type == "value_change" ? "$" : ""} {alert.trigger_value}{alert.trigger_type == "percent_change" ? "%" : ""}</p>
                    <p><strong>Expiry Date :</strong> {alert.expires_at}</p>
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
        </ul>)}
    </div>
  );
};

export default AlertList;
