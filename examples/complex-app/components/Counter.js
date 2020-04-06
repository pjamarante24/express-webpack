import React, { useState } from "react";
import Button from "./Button";

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  return (
    <div>
      <span>{count}</span>
      <Button onClick={increment} label="Increment" />
    </div>
  );
}

export default Counter;
