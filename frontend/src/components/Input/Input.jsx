import React from "react";
import "./Input.css";

function Input({
  className,
  type,
  title,
  name,
  value,
  placeholder,
  maxlength,
  minLength,
  onChange,
  errors,
  valids,
  pattern,
}) {
  return (
    <div className={`input ${className ? className : ""}`}>
      <label className="input__label">
        <span className="input__title">{title}</span>
        <input
          className={`input__input hover ${!valids && "input__input_no-valid"}`}
          type={type}
          name={name}
          required
          value={value}
          placeholder={placeholder}
          maxLength={maxlength}
          minLength={minLength}
          onChange={onChange}
          pattern={pattern}
        />
      </label>
      <p className="input__eror">{errors}</p>
    </div>
  );
}

export default Input;
