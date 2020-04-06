import React from "react";

function Button({ label, onClick }) {
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  );
}

export default Button;
