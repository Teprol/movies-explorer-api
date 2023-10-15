import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ProtectedRoute = ({ element: Component, ...props }) => {
  const { pathname } = useLocation(); //отселдить урл
  return props.loggedIn ? (
    <>
      <Header loggedIn={props.loggedIn}></Header>
      <Component {...props} />
      {pathname === "/profile" ? "" : <Footer></Footer>}
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
