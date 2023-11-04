import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import Cart from "./Components/Cart/Cart";
import DateTimePicker from "./Components/DateTimePicker";
const { getData } = require("./db/db");
const foods = getData();

const tele = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [alerts, setAlerts] = useState([
    { id: 1, cryptocurrency: 'BTC', dueDate: '2023-11-10' },
    { id: 2, cryptocurrency: 'ETH', dueDate: '2023-11-15' },
    { id: 3, cryptocurrency: 'TON', dueDate: '2023-11-15' },
  ]);

  useEffect(() => {
    tele.ready();
  });

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const onCheckout = () => {
    tele.MainButton.text = "Pay :)";
    tele.MainButton.show();
  };

  return (
    <>
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
    </>
  );
};

export default App;
