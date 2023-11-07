import { useState, useEffect } from "react";
import "./App.css";
import Alert from './Components/Alert'
import AlertList from "./Components/AlertList";
import Prices from "./Components/Prices";

const tele = window.Telegram.WebApp;


function App() {
  const [alerts, setAlerts] = useState([]);
  const [userId, setUserId] = useState("mac");
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const handleCryptoDataChange = (data) => {
    setCryptoPrices(data);
  };


  useEffect(() => {
    tele.ready();
    setUserId(tele.WebAppUser?.first_name || "unknown")
  },[cryptoPrices])

    const onAlertUpdate= (newAlert) => setAlerts((prevAlerts) => [...prevAlerts, newAlert])

  return (
    <div className="container">
      <h1>Crypto Alerts</h1>
      <Prices cryptoPrices={cryptoPrices} onCryptoDataChange={handleCryptoDataChange} />
      <AlertList alerts={alerts} setAlerts={setAlerts} />
      <Alert cryptoPrices={cryptoPrices}  onAlertUpdate={onAlertUpdate} userId={userId}  />
    </div>
  );
};

export default App;
