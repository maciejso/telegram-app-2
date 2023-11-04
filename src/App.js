import { useState, useEffect } from "react";
import "./App.css";
import DateTimePicker from "./Components/DateTimePicker";
import Dropdown from "./Components/Dropdown";
const { getData } = require("./db/db");

const tele = window.Telegram.WebApp;

function App() {
   const typeOptions = ['Option1', 'Option2', 'Option3'];

  const handleTypeSelect = (selectedType) => {
    console.log('Selected Type:', selectedType);
    // Handle the selected type as needed
  };

  const [alerts, setAlerts] = useState([
    { id: 1, cryptocurrency: 'BTC', dueDate: '2023-11-10' },
    { id: 2, cryptocurrency: 'ETH', dueDate: '2023-11-15' },
    { id: 3, cryptocurrency: 'TON', dueDate: '2023-11-15' },
  ]);

  useEffect(() => {
    tele.ready();
  });

  return (
    <div className="container">
      <div className="alert-list">
        <h1>Cryptocurrencies:</h1>
        <h1>My Alerts</h1>
        <ul>
          {alerts.map((todo) => (
            <li key={todo.id} className={new Date(todo.dueDate) < new Date() ? ' overdue' : ''}>
              <span>{todo.cryptocurrency}</span>
              <span className="due-date">Due: {todo.dueDate}</span>
            </li>
          ))}
        </ul>
      </div>
      <h1>Set Alert</h1>
      <DateTimePicker />
      <Dropdown options={typeOptions} onSelect={handleTypeSelect} />
    </div>
  );
};

export default App;
