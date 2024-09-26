import { useAuthContext } from "./useAuthContext";
//import { useCartesContext } from "./useCartesContext";

export const useDeconnexion = () => {
  const { dispatch } = useAuthContext();
  //const { dispatch: cartesDispatch } = useCartesContext();
  const deconnexion = () => {
    localStorage.removeItem("user");

    dispatch({ type: "DECONNEXION" });
    //cartesDispatch({ type: "SET_CARTE", payload: null });
  };

  return { deconnexion };
};
