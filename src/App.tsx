import React, { useState, useEffect } from "react";
import "./App.css";
import Alert from './Components/Alert'
import AlertList from "./Components/AlertList";
import Prices from "./Components/Prices";
import { IAlert, IAlertListProps } from "./models/Alert"
import { ICryptoPrice } from "./models/Price";


const App: React.FC = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);
  const [userId, setUserId] = useState<string>("unknown");
  const [cryptoPrices, setCryptoPrices] = useState<IAlert[]>([]);

  const handleCryptoDataChange = (data: any) => {
    setCryptoPrices(data);
  };

  const tele = (window as any).Telegram.WebApp;

  function getUserData() {
    const initDataUnsafe = tele.initDataUnsafe || {};
    const userId = initDataUnsafe.user && initDataUnsafe.user.id || "unknown"
    const firstName = initDataUnsafe.user && initDataUnsafe.user.first_name;

    console.log('User ID:', userId);
    console.log('Username:', firstName);
    setUserId(userId.toString());
  }


  useEffect(() => {
    tele.ready();
    getUserData();
  }, []);

  const onAlertUpdate = (newAlert: IAlert) => {
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  return (
    <div className="container">
      <h1>Crypto Alerts</h1>
      <Prices cryptoPrices={cryptoPrices} onCryptoDataChange={handleCryptoDataChange} />
      <AlertList alerts={alerts} setAlerts={setAlerts} userId={userId} />
      <Alert cryptoPrices={cryptoPrices} onAlertUpdate={onAlertUpdate} userId={userId} />
    </div>
  );
};



export default App;
