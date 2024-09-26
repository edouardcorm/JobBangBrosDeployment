  
import React, { useState, useEffect } from "react";
import NavLinks from "./NavLinks";
import NavLinksAdmin from "./NavLinksAdmin"; // Assuming you have a separate component for admin links
import { useAuthContext } from "../../hooks/useAuthContext";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [profileToDisplay, setProfileToDisplay] = useState(null);
  const { user: loggedInUser } = useAuthContext();

  const toggleDrawer = () => {
    setDrawerIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!loggedInUser) {
        console.error("No logged-in user found");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}users/${loggedInUser._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${loggedInUser.token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setProfileToDisplay(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [loggedInUser]);

  if (!profileToDisplay) {
    return <p>Profile information is not available.</p>;
  }

  return (
    <div className={`main-navigation ${drawerIsOpen ? "expanded" : ""}`}>
      <button className="main-navigation__menu-btn" onClick={toggleDrawer}>
        <span />
        <span />
        <span />
      </button>
      {profileToDisplay.admin ? (
        <NavLinksAdmin drawerIsOpen={drawerIsOpen} />
      ) : (
        <NavLinks drawerIsOpen={drawerIsOpen} />
      )}
    </div>
  );
};

export default MainNavigation;