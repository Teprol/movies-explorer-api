import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import "./Register.css";

import Form from "../Form/Form";
import Input from "../Input/Input";

import logo from "../../images/logo.svg";
import useFormsValidation from "../../hoocks/useFormsValidation.js";
import { paternEmail, paternName } from "../../utils/constants";

function Register({ loggedIn, onRegist }) {
  const { handleChange, errors, valids, formValid, values } =
    useFormsValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegist(values);
  }

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <main className="register">
      <div className="register__container">
        <Link to="/" className="hover register__logo">
          <img src={logo} alt="Логотип" className="image" />
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <Form
          className="register__form"
          name="registration"
          valid={formValid}
          onSubmit={handleSubmit}
        >
          <Input
            className="input_label-top"
            type="text"
            title="Имя"
            placeholder="Введите ваше Имя"
            name="name"
            minLength="2"
            maxLength="20"
            onChange={handleChange}
            errors={errors.name}
            valids={valids.name}
            pattern={paternName}
          ></Input>
          <Input
            className="input_label-top"
            type="email"
            title="E-mail"
            placeholder="Введите вашу почту"
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
            placeholder="Введите пароль"
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

export default Register;
