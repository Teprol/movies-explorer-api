import React from "react";
import { ErrorContext } from "../context/ErrorContext";

function useFormsValidation() {
  //стейты для отслеживания значений
  const [values, setValue] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [valids, setValids] = React.useState({});
  const [formValid, setFormValid] = React.useState(false);

  const { error, setError } = React.useContext(ErrorContext);

  //функция записывающая стейты
  function handleChange(e) {
    const element = e.target;
    const value = element.value;
    const name = element.name;
    const valid = element.validity.valid;
    const form = e.target.form;
    setValue({ ...values, [name]: value });
    setErrors({ ...errors, [name]: element.validationMessage });
    setValids({ ...valids, [name]: valid });
    setFormValid(form.checkValidity());
    // скидывать ошибку при вводе новых данных
    setError(false);
  }

  function resetError() {
    setError(false);
  }

  const addDataInput = React.useCallback((data = {}) => {
    setValue(data);
    const validData = { ...data, name: true, email: true };
    setValids(validData);
    setFormValid(true);
  }, []);

  return {
    values,
    errors,
    valids,
    handleChange,
    formValid,
    resetError,
    setValue,
    addDataInput,
  };
}

export default useFormsValidation;
