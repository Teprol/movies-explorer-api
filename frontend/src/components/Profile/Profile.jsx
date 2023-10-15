import React from "react";
import "./Profile.css";

import Form from "../Form/Form";
import Input from "../Input/Input";

import useFormsValidation from "../../hoocks/useFormsValidation.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import { paternEmail, paternName } from "../../utils/constants";

function Profile({
  loggedIn,
  logOut,
  editUser,
  isSuccessful,
  setIsSuccessful,
}) {
  const {
    handleChange,
    errors,
    valids,
    formValid,
    values,
    setValue,
    addDataInput,
  } = useFormsValidation();
  // стейт следит за тем что данные профиля не равны начальным
  const [isInputChanged, setIsInputChanged] = React.useState(false);
  // контекст инфы пользователя
  const currentUser = React.useContext(CurrentUserContext);

  //@ добавление информации пользователя
  React.useEffect(() => {
    addDataInput({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);

  //@ проврка на изменение данных
  React.useEffect(() => {
    const hasChanges =
      values.name !== currentUser.name || values.email !== currentUser.email;
    hasChanges ? setIsInputChanged(true) : setIsInputChanged(false);
  }, [values, currentUser]);

  // отправка формы
  function handleSubmit(e) {
    e.preventDefault();
    editUser(values.name, values.email);
  }

  return (
    <main className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
      <Form
        className="form_profile profile__form"
        name="profile"
        valid={formValid}
        logOut={logOut}
        onSubmit={handleSubmit}
        isSuccessful={isSuccessful}
        setIsSuccessful={setIsSuccessful}
        isInputChanged={isInputChanged}
      >
        <Input
          type="text"
          name="name"
          title="Имя"
          placeholder="введите имя"
          minLength="2"
          maxLength="20"
          onChange={handleChange}
          errors={errors.name}
          valids={valids.name}
          pattern={paternName}
          value={values.name || ""}
        ></Input>
        <Input
          className="input_no-border"
          type="email"
          name="email"
          title="E-mail"
          placeholder="введите почту"
          minLength="5"
          onChange={handleChange}
          errors={errors.email}
          valids={valids.email}
          pattern={paternEmail}
          value={values.email || ""}
        ></Input>
      </Form>
    </main>
  );
}

export default Profile;
