import React, { useState, useEffect } from "react";
import "./App.css";
import Alert from './Components/Alert'
import AlertList from "./Components/AlertList";
import Prices from "./Components/Prices";
import {IAlert, IAlertListProps} from "./models/Alert"
import { ICryptoPrice } from "./models/Price";


const App: React.FC = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);
  const [userId, setUserId] = useState<string>("mac");
  const [cryptoPrices, setCryptoPrices] = useState<IAlert[]>([]);

  const handleCryptoDataChange = (data: any) => {
  setCryptoPrices(data);
};

  const tele = (window as any).Telegram.WebApp;

  useEffect(() => {
  // Set up an event listener for when the Telegram WebApp is ready
  tele.ready(() => {
    // Now you can safely call methods on the `tele` object
    tele.MainButton.show();
    
    // If you need to request user data, you should do it here
    tele.getUser().then((user:any) => {
      console.log(user);
    }).catch((error:any) => {
      console.error(error);
    });
  });
}, []);

  const onAlertUpdate = (newAlert: IAlert) => {
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  return (
    <div className="container">
      <h1>Crypto Alerts</h1>
      <Prices cryptoPrices={cryptoPrices} onCryptoDataChange={handleCryptoDataChange} />
      <AlertList alerts={alerts} setAlerts={setAlerts} />
      <Alert cryptoPrices={cryptoPrices} onAlertUpdate={onAlertUpdate} userId={userId} />
    </div>
  );
};

export default App;
