import { useState, useEffect } from "react";
import "./App.css";
import Alert from './Components/Alert'
import AlertList from "./Components/AlertList";
import Prices from "./Components/Prices";
const { getData } = require("./db/db");

const tele = window.Telegram.WebApp;


function App() {
  const [alerts, setAlerts] = useState([]);
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const handleCryptoDataChange = (data) => {
    setCryptoPrices(data);
  };


  useEffect(() => {
    tele.ready();
  },[cryptoPrices])

  return (
    <div className="container">
      <h1>Crypto Alerts</h1>
      <Prices cryptoPrices={cryptoPrices} onCryptoDataChange={handleCryptoDataChange} />
      <AlertList alerts={alerts} setAlerts={setAlerts} />
      <Alert cryptoPrices={cryptoPrices} onAlertUpdate={(newAlert) => setAlerts((prevAlerts) => [...prevAlerts, newAlert])} />
      <p>by Mac</p>
    </div>
  );
};

export default App;
