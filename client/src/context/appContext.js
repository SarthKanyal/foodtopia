import React from "react";
import { useContext, useState, useReducer } from "react";
import reducer from "./reducer";
import { DISPLAY_ALERT, CLEAR_AlERT, LOADING } from "../context/actions";

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  //const [state, setState] = useState(initialState);
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_AlERT });
    }, 3000);
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
