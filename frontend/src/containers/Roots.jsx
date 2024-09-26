import React from "react";
import { Outlet, useLocation } from "react-router-dom"; 
import MainNavigation from "../pages/navigation/MainNavigation";
import { useAuthContext } from "../hooks/useAuthContext";

export default function RootLayout() {
  const location = useLocation();
  const { user } = useAuthContext(); // Get the user from the context

  const afficherNavigation = !!user; // Check if user is logged in

  console.log("User:", user); // Debugging statement
  console.log("Location Pathname:", location.pathname); // Debugging statement
  console.log("Afficher Navigation:", afficherNavigation); // Debugging statement

  return (
    <>
      {afficherNavigation && <MainNavigation />}
      <main>
        <Outlet />
      </main>
    </>
  );
}
