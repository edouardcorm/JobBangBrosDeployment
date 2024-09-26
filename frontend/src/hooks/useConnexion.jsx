import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useConnexion = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const connexion = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // Include user ID and other important information explicitly
      const userData = {
        _id: json.user._id,
        email: json.user.email,
        token : json.token,
        preference: json.user.preference,
      
      };
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch({ type: "CONNEXION", payload: userData });
      setIsLoading(false);
    }
  };
  return { connexion, isLoading, error };
};