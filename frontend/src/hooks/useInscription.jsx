import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useInscription = () => {
  const [error, setErreur] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const inscription = async (name, gender, email, password) => {
    setIsLoading(true);
    setErreur(null);

    console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL); // Debugging statement
    console.log("Inscription data:", { name, gender, email, password }); // Debugging statement

    try {
      const reponse = await fetch(
        process.env.REACT_APP_BACKEND_URL + "users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, gender, email, password }),
        }
      );

      const json = await reponse.json();

      console.log("Response:", reponse); // Debugging statement
      console.log("JSON:", json); // Debugging statement

      if (!reponse.ok) {
        setIsLoading(false);
        setErreur(json.error);
        return;
      }

      if (json.user && json.token) {
        const userData = {
          _id: json.user._id,
          email: json.user.email,
          token: json.token,
          preference: json.user.preference
        };

        // Save user to local storage
        localStorage.setItem("user", JSON.stringify(userData));
        // Update auth context
        dispatch({ type: "CONNEXION", payload: userData });
      } else {
        setErreur("Invalid response from server");
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErreur(error.message);
      console.log("Signup error:", error); // Debugging statement
    }
  };

  return { inscription, isLoading, error };
};