import { useState, useEffect } from "react";
import "./App.css";
import Alert from './Components/Alert'
import AlertList from "./Components/AlertList";
import Prices from "./Components/Prices";
const { getData } = require("./db/db");

const tele = window.Telegram.WebApp;


function App() {
   const [cryptoData, setCryptoData] = useState([]);

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
      <Alert cryptoData={cryptoData} />
    </div>
  );
};

export default App;
