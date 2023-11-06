import { useState, useEffect } from "react";
import "./App.css";
import Alert from './Components/Alert'
import AlertList from "./Components/AlertList";
import Prices from "./Components/Prices";
const { getData } = require("./db/db");

const tele = window.Telegram.WebApp;


function App() {
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [alert, setAlert] = useState({
    cryptocurrency: 'BTC',
    type: 'Value Change',
    value: '20',
    expiryDate: "2023-12-31T23:59"
  });

  const handleInputChange = (field, value) => {
    setAlert((prevAlert) => ({
      ...prevAlert,
      [field]: value,
    }));
  };

  const handleCryptoDataChange = (data) => {
    setCryptoPrices(data);
  };


  useEffect(() => {
    tele.ready();
  },[alert, cryptoPrices])

  return (
    <div className="container">
      <h1>Crypto Alerts</h1>
      <Prices cryptoPrices={cryptoPrices} onCryptoDataChange={handleCryptoDataChange} />
      <AlertList onUpdate={handleCryptoDataChange} />
      <Alert cryptoPrices={cryptoPrices} alert={alert} handleInputChange={handleInputChange}/>
    </div>
  );
};

export default App;
