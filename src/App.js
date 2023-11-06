import { useState, useEffect } from "react";
import "./App.css";
import Alert from './Components/Alert'
import AlertList from "./Components/AlertList";
import Prices from "./Components/Prices";
const { getData } = require("./db/db");

const tele = window.Telegram.WebApp;


function App() {
  const [cryptoData, setCryptoData] = useState([]);
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
    setCryptoData(data);
  };


  useEffect(() => {
    tele.ready();
  })

  return (
    <div className="container">
      <h1>Crypto Alerts</h1>
      <Prices cryptoData={cryptoData} onCryptoDataChange={handleCryptoDataChange} />
      <AlertList />
      <Alert cryptoData={cryptoData} alert={alert} handleInputChange={handleInputChange}/>
    </div>
  );
};

export default App;
