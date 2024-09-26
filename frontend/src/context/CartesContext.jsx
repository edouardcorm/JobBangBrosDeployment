import { createContext, useReducer } from "react";

export const ProfilsContext = createContext();

export const ProfilsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROFIL":
      return {
        profils: action.payload,
      };
    case "CREATE_PROFIL":
      return {
        profils: [action.payload, ...state.profils],
      };
    case "DELETE_PROFIL":
      return {
        profils: state.profils.filter((c) => c._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const ProfilsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfilsReducer, {
    profils: [],
  });

  return (
    <ProfilsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfilsContext.Provider>
  );
};
