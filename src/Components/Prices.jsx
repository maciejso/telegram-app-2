// CoinPrices.js
import React, { useState, useEffect } from 'react';
import './Prices.css'; // Import the CSS file

const CoinPrices = ({ apiKey }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
          {
            headers: {
              'X-CMC_PRO_API_KEY': apiKey,
            'Access-Control-Allow-Origin': '*',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data from CoinMarketCap API');
        }

        const data = await response.json();
        setCryptoData(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  return (
    <div className="coin-prices-container">
      <h2 className="coin-prices-header">Crypto Prices</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="coin-list">
          {cryptoData.slice(0, 3).map((crypto) => (
            <li key={crypto.id} className="coin-list-item">
              <span className="coin-name">{crypto.name}</span>
              <span className="coin-price">${crypto.quote.USD.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoinPrices;
