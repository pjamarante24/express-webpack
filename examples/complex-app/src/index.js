import { hot } from "react-hot-loader/root";
import React from "react";

const App = () => {
  return (
    <ul>
      <li>
        <a href="counter">Counter</a>
      </li>
      <li>
        <a href="todo">Todo</a>
      </li>
    </ul>
  );
};

export default hot(App);
