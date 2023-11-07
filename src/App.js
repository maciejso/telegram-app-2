import { useState, useEffect } from "react";
import "./App.css";
import Alert from './Components/Alert'
import AlertList from "./Components/AlertList";
import Prices from "./Components/Prices";
const { getData } = require("./db/db");

const tele = window.Telegram.WebApp;


function App() {
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
      <AlertList onUpdate={handleCryptoDataChange} />
      <Alert cryptoPrices={cryptoPrices} />
      <p>by Mac</p>
    </div>
  );
};

export default App;
