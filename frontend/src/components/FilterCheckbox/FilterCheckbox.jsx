import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ checked, onCheck }) {
  return (
    <label className="filter-Checkbox">
      <input
        type="checkbox"
        className="filter-Checkbox__input"
        onChange={onCheck}
        checked={checked}
      ></input>
      <span className="filter-Checkbox__slider"></span>
    </label>
  );
}

export default FilterCheckbox;
