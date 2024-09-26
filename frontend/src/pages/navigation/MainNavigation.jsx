import React, { useState } from "react";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerIsOpen((prevState) => !prevState);
  };

  return (
    <div className={`main-navigation ${drawerIsOpen ? "expanded" : ""}`}>
      <button className="main-navigation__menu-btn" onClick={toggleDrawer}>
        <span />
        <span />
        <span />
      </button>
      <NavLinks drawerIsOpen={drawerIsOpen} />
    </div>
  );
};

export default MainNavigation;
