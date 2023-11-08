import React from "react";
import "./Button.css";

function Button({ type, className, children, onClick, disabled }) {
  return (
    <button
      type={type}
      className={`${className} hover button button-component`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
