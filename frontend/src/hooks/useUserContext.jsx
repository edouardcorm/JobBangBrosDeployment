import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useUserContext = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, dispatch } = useAuthContext(); // Destructure user from context

  const fetchUser = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `users/`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch user data");
      }

      // Dispatch action to update user context
      dispatch({ type: "UPDATE_USER", payload: data });

      setIsLoading(false);
      return data;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const updateUser = async (userId, userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}` // Include the authorization token
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update user");
      }

      // Dispatch action to update user context
      dispatch({ type: "UPDATE_USER", payload: data });

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { fetchUser, updateUser, isLoading, error };
};

export { useUserContext };