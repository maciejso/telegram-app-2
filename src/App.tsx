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
  const [isLoading, setIsLoading] = useState(true);

  const handleCryptoDataChange = (data: any) => {
    setCryptoPrices(data);
  };

  const tele = (window as any).Telegram.WebApp;

  function getUserData() {
    const initDataUnsafe = tele.initDataUnsafe || {};
    const userId = initDataUnsafe.user && initDataUnsafe.user.id || "mac"
    const firstName = initDataUnsafe.user && initDataUnsafe.user.first_name;

    console.log('User ID:', userId);
    console.log('Username:', firstName);
    setUserId(userId.toString());
  }


  useEffect(() => {
      const handleWebAppReady = () => {
      console.log('Telegram Web App is ready');
      getUserData(); // Assuming this is a function to fetch user data
    };
    setIsLoading(true);
    tele.ready();
    getUserData();
    setIsLoading(false);
    tele.onEvent('web_app_ready', handleWebAppReady);
  }, [userId]);

  const onAlertUpdate = (newAlert: IAlert) => {
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  if (isLoading){
    <div className="container">
      <div>Loading...</div>
    </div>
  }
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
