import React, { useEffect } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import LogoDeconnexion from "../../assets/icon/iconDeconnexion.png";
import LogoCommunaute from "../../assets/icon/iconCommunity.png";
import LogoCollection from "../../assets/icon/iconCommunication.png";
import LogoModification from "../../assets/icon/iconModification.png";
import LogoGestion from "../../assets/icon/iconGestion.png";
import LogoProfil from "../../assets/icon/iconProfil.png";
import { useUserContext } from "../../hooks/useUserContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDeconnexion } from "../../hooks/useDeconnexion";

const NavLinks = ({ drawerIsOpen }) => {
  const { deconnexion } = useDeconnexion();

  const handleDeconnexion = () => {
    deconnexion();
  };

  return (
    <ul className={`nav-links ${drawerIsOpen ? "drawer-open" : ""}`}>
      <li>
        <NavLink to="/community">
          <img src={LogoCommunaute} alt="Community" />
          {drawerIsOpen && "ㆍCommunity"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/communication">
          <img src={LogoCollection} alt="Communication" />
          {drawerIsOpen && "ㆍCommunication"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/modificationProfil">
          <img src={LogoModification} alt="ModificationProfil" />
          {drawerIsOpen && "ㆍModification"}
        </NavLink>
      </li>
      <li className="JBB-NavLinks-bottom">
        <NavLink to="/" onClick={handleDeconnexion}>
          <img src={LogoDeconnexion} alt="Déconnexion" />
          {drawerIsOpen && "ㆍDéconnexion"}
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
