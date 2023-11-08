import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import "./Login.css";

import Form from "../Form/Form";
import Input from "../Input/Input";

import logo from "../../images/logo.svg";
import useFormsValidation from "../../hoocks/useFormsValidation.js";
import { paternEmail } from "../../utils/constants";

function Login({ loggedIn, onLogin }) {
  const { handleChange, errors, valids, formValid, values } =
    useFormsValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <main className="login">
      <div className="login__container">
        <Link to="/" className="hover login__logo">
          <img src={logo} alt="Логотип" className="image" />
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <Form
          className="login__form"
          name="login"
          valid={formValid}
          onSubmit={handleSubmit}
        >
          <Input
            className="input_label-top"
            type="email"
            title="E-mail"
            placeholder="Почта"
            name="email"
            minLength="5"
            onChange={handleChange}
            errors={errors.email}
            valids={valids.email}
            pattern={paternEmail}
          ></Input>
          <Input
            className="input_label-top"
            type="password"
            title="Пароль"
            placeholder="Пароль"
            name="password"
            minLength="4"
            maxLength="18"
            onChange={handleChange}
            errors={errors.password}
            valids={valids.password}
          ></Input>
        </Form>
      </div>
    </main>
  );
}

export default Login;
