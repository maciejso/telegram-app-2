import React, { useState, useEffect } from "react";
import "./App.css";
import Alert from './Components/Alert'
import AlertList from "./Components/AlertList";
import Prices from "./Components/Prices";
import { IAlert, IAlertListProps } from "./models/Alert"
import { ICryptoPrice } from "./models/Price";


const App: React.FC = () => {
  const [down, setDown] = useState(true);
  const [alerts, setAlerts] = useState<IAlert[]>([]);
  const [userId, setUserId] = useState<string>("unknown");
  const [cryptoPrices, setCryptoPrices] = useState<IAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCryptoDataChange = (data: any) => {
    setCryptoPrices(data);
  };

  const tele = (window as any).Telegram.WebApp;

  function getUserData() {
    console.log("get user data");
    const initDataUnsafe = tele.initDataUnsafe || {};
    const userId = initDataUnsafe.user && initDataUnsafe.user.id || "mac"
    const firstName = initDataUnsafe.user && initDataUnsafe.user.first_name;

    console.log('User ID:', userId);
    console.log('Username:', firstName);
    setUserId(userId.toString());
  }


  useEffect(() => {
    setIsLoading(true);
    tele.ready();
    getUserData();
    setIsLoading(false);
  }, []);

  const onAlertUpdate = (newAlert: IAlert) => {
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  return (
    (down ? 
      <>
      <h1>App down for maintenance</h1>
      <p>Please send an email to m.soczka@gmail.com to get the app up and running</p>
      </>
    :(isLoading ? (
      <div className="container">
        <div>Loading...</div>
      </div>
    ) : (
      <div className="container">
        <h1>Crypto Alerts</h1>
        <Prices cryptoPrices={cryptoPrices} onCryptoDataChange={handleCryptoDataChange} />
        <AlertList alerts={alerts} cryptoPrices={cryptoPrices} setAlerts={setAlerts} userId={userId} />
        <Alert cryptoPrices={cryptoPrices} onAlertUpdate={onAlertUpdate} userId={userId} />
      </div>
    )
  )));
};



export default App;
