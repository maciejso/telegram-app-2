import { useState, useEffect } from "react";
import "./App.css";
import Alert from './Components/Alert'
import AlertList from "./Components/AlertList";
const { getData } = require("./db/db");

const tele = window.Telegram.WebApp;

function App() {
  const typeOptions = ['BTC', 'ETH', 'TON'];

  const handleSaveAlert = (newAlert) => {
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  const handleEditAlert = (editedAlert) => {
    // Handle the edited alert, e.g., update the state
    console.log('Edited Alert:', editedAlert);
  };

  const [alerts, setAlerts] = useState([
    { id: 1, cryptocurrency: 'BTC', type: "amount", value: "300000", currency: "USD", expiryDate: '2023-11-10' },
    { id: 2, cryptocurrency: 'ETH', type: "percent", value: "50", currency: "USD", expiryDate: '2023-11-15' },
    { id: 3, cryptocurrency: 'TON', type: "percent", value: "20", currency: "USD", expiryDate: '2023-11-15' },
  ]);

  useEffect(() => {
    tele.ready();
  });

  return (
    <div className="container">
      <AlertList alerts={alerts} onEditAlert={handleEditAlert} />
      <Alert />
    </div>
  );
};

export default App;
