import React, { useState, useEffect } from "react";
import "./App.css";
import Alert from './Components/Alert'
import AlertList from "./Components/AlertList";
import Prices from "./Components/Prices";
import { IAlert, IAlertListProps } from "./models/Alert"
import { ICryptoPrice } from "./models/Price";


const App: React.FC = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);
  const [userId, setUserId] = useState<string>("mac");
  const [cryptoPrices, setCryptoPrices] = useState<IAlert[]>([]);

  const handleCryptoDataChange = (data: any) => {
    setCryptoPrices(data);
  };

  const tele = (window as any).Telegram.WebApp;

  function getUserData() {
    const initDataUnsafe = (window as any).Telegram.WebApp.initDataUnsafe || {};
    const userId = initDataUnsafe.user && initDataUnsafe.user.id;
    const username = initDataUnsafe.user && initDataUnsafe.user.username;

    console.log('User ID:', userId);
    console.log('Username:', username);
    setUserId(userId);
  }


  useEffect(() => {
    tele.onEvent('mainButtonClicked', () => {
    });
    tele.ready();
    getUserData();
    console.log("###")
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
