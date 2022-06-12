import React, { useState } from "react";
import Context from "./Context";
import { theme } from "../utils";

export default function ContextWrapper(props) {
  // to control log in / log out
  const [isAuth, setIsAuth] = useState(false);
  const globalValues = {
    isAuth: isAuth,
    login: () => {
      setIsAuth(true);
    },
    logout: () => {
      setIsAuth(false);
    },
    theme: theme,
  };

  return (
    <Context.Provider value={{ globalValues }}>
      {props.children}
    </Context.Provider>
  );
}
