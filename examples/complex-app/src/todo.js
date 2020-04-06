import React, { useState } from "react";

function todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        todo: input,
        completed: false,
      },
    ]);
    setInput("");
  };

  const toggleTodo = (t) => {
    const _todos = [...todos];
    setTodos(
      _todos.map(({ todo, completed }) =>
        todo === t ? { todo, completed: !completed } : { todo, completed }
      )
    );
  };

  return (
    <div>
      <h3>Todos:</h3>
      <ul>
        {todos.map(({ todo, completed }, i) => {
          if (completed) {
            return (
              <li onClick={() => toggleTodo(todo)} key={i}>
                <s>{todo}</s>
              </li>
            );
          }
          return (
            <li onClick={() => toggleTodo(todo)} key={i}>
              {todo}
            </li>
          );
        })}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" name="submit" onClick={addTodo}>
        Add Todo
      </button>
    </div>
  );
}

export default todo;
