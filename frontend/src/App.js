import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import RootLayout from "./containers/Roots";
import Communication from './pages/communication/Communication';
import Community from './pages/community/Community';
import ConnexionAdmin from './pages/connexionAdmin/ConnexionAdmin';
import ConnexionUser from './pages/connexionUser/ConnexionUser';
import Inscription from './pages/inscription/Inscription';
import ModificationProfil from './pages/modificationProfil/ModificationProfil';
import Profil from './pages/profil/Profil';

const App = () => {
  const { user } = useAuthContext();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "", element: !user ? <ConnexionUser /> : <Navigate to="/profil" />},
        { path: "communication", element: user ? <Communication /> : <Navigate to="/" />},
        { path: "community", element: user ? <Community /> : <Navigate to="/" />},
        { path: "connexionAdmin", element: !user ? <ConnexionAdmin /> : <Navigate to="/profil"/>},
        { path: "inscription", element: !user ? <Inscription /> : <Navigate to="/profil"/>},
        { path: "modificationProfil", element: user ? <ModificationProfil /> : <Navigate to="/" />},
        { path: "profil", element: user ? <Profil /> : <Navigate to="/" />},

      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
