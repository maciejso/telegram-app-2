import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import Cart from "./Components/Cart/Cart";
const { getData } = require("./db/db");
const foods = getData();

const tele = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);
    const [todos, setTodos] = useState([
    { id: 1, text: 'Complete task 1', dueDate: '2023-11-10' },
    { id: 2, text: 'Read a book', dueDate: '2023-11-15' },
    // Add more tasks as needed
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
    <div className="todo-list">
      <h1>My Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={new Date(todo.dueDate) < new Date() ? ' overdue' : ''}>
            <span>{todo.text}</span>
            <span className="due-date">Due: {todo.dueDate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
/*
  return (
    <>
      <h1 className="heading">Set Alert</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout}/>
      <div className="cards__container">
        {foods.map((food) => {
          return (
            <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
          );
        })}
      </div>
    </>
  );
}
*/

export default App;
