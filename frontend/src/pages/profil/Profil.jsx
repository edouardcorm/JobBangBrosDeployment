import React from "react";
import "./Profil.css";
import heightIcon from "../../assets/icon/iconGrandeur.png";
import astrologieIcon from "../../assets/icon/iconAstrologie.png";
import animalIcon from "../../assets/icon/iconAnimaux.png";
import sportIcon from "../../assets/icon/iconSport.png";
import hobbyIcon from "../../assets/icon/iconHobby.png";
import loginData from "../../data/LoginData";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const iconMapping = {
  height: heightIcon,
  sign: astrologieIcon,
  fav_animal: animalIcon,
  sport: sportIcon,
  hobby: hobbyIcon,
};

const Profil = () => {
  const [profileToDisplay, setProfileToDisplay] = useState(null);
  const { user: loggedInUser } = useAuthContext();

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
    <div className="JBB-profil-body">
      <div className="JBB-profil-container">
        <div
          className="JBB-profil-photoAffichage"
          style={{
            backgroundImage: `url(${profileToDisplay.profile_picture})`,
          }}
        >
          <div className="JBB-profil-nomMetier">
            <p className="JBB-profil-nom">
              {profileToDisplay.name}, {profileToDisplay.age}
            </p>
            <p className="JBB-profil-metier">{profileToDisplay.job}</p>
          </div>
        </div>
        <div className="JBB-profil-infoProfil">
        <div className="JBB-detailprofil-bubbles">
  {profileToDisplay.tags && Object.entries(profileToDisplay.tags)
    .filter(([key, value]) => value)
    .map(([key, popup], index) => {
      const iconPopup = iconMapping[key];

      // Format height properly if key is 'Height'
      const displayValue = key === 'Height'
        ? popup.split(' ').map((part, idx) => idx === 0 ? `${part}'` : `${part}"`).join('')
        : popup;

      return (
        <div className="JBB-detailprofil-popup" key={index}>
          <img className="JBB-detailprofil-logopopup" src={iconPopup} alt="Logo PopUp" />
          <p className="JBB-detailprofil-infopopup">{displayValue}</p>
        </div>
      );
    })}
</div>
          Téléphone :
          {profileToDisplay.phone
            ? `(${profileToDisplay.phone.slice(
              0,
              3
            )})-${profileToDisplay.phone.slice(
              3,
              6
            )}-${profileToDisplay.phone.slice(6)}`
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Profil;
