import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./DetailProfil.css";
import heightIcon from '../../assets/icon/iconGrandeur.png';
import astrologieIcon from '../../assets/icon/iconAstrologie.png';
import animalIcon from '../../assets/icon/iconAnimaux.png';
import sportIcon from '../../assets/icon/iconSport.png';
import hobbyIcon from '../../assets/icon/iconHobby.png';
import loginData from '../../data/LoginData';
import { useAuthContext } from "../../hooks/useAuthContext";

const iconMapping = {
  height: heightIcon,
  sign: astrologieIcon,
  fav_animal: animalIcon,
  sport: sportIcon,
  hobby: hobbyIcon
};

const DetailProfil = ({ profil, onDelete }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(true);
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

  const handleDelete = async () => {
    if (profil._id && loggedInUser) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/${profil._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedInUser.token}`, // Ajoute le token d'authentification
          },
        });
  
        if (response.ok) {
          console.log('Utilisateur supprimé avec succès');
          onDelete(profil._id); // Appelle le callback pour mettre à jour la liste
          setShowDeleteButton(false); // Cache le bouton après suppression
        } else {
          console.error('Erreur lors de la suppression de l\'utilisateur');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };
  

  return (
    <div className="JBB-detailprofil-container">
      <div className="JBB-detailprofil-photoAffichage"
        style={{ backgroundImage: `url(${profil.photo_de_profil})` }}
      >
        <div className="JBB-detailprofil-nomMetier">
          <p className="JBB-detailprofil-nom">{profil.name}, {profil.age}</p>
          <p className="JBB-detailprofil-metier">{profil.job}</p>
        </div>
      </div>
      <div className="JBB-detailprofil-infoProfil">
        <div className="JBB-detailprofil-bubbles">
          {profil.tags && Object.entries(profil.tags).filter(([key, value]) => value).map(([key, popup], index) => {
            const iconPopup = iconMapping[key];

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
        <div className="JBB-detailProfil-restInfo">
          <p className="JBB-detailProfil-phone">
            Téléphone :
            {profil.phone
              ? `(${profil.phone.slice(0, 3)})-${profil.phone.slice(3, 6)}-${profil.phone.slice(6)}`
              : ''}
          </p>
          {showDeleteButton && profileToDisplay?.admin && (
            <button
              className="JBB-detailprofil-supprimer"
              onClick={handleDelete}
            >
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// DetailProfil.propTypes = {
//   profil: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     photo_de_profil: PropTypes.string,
//     prenom: PropTypes.string.isRequired,
//     age: PropTypes.string,
//     metier: PropTypes.string,
//     grandeur: PropTypes.string,
//     phone: PropTypes.string,
//     bubble: PropTypes.objectOf(PropTypes.string),
//     phone: PropTypes.string,
//   }),
//   onDelete: PropTypes.func,
// };

export default DetailProfil;