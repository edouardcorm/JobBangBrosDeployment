import React, { useState } from "react";
import PropTypes from "prop-types";
import "./DetailProfil.css";
import heightIcon from '../../assets/icon/iconGrandeur.png';
import astrologieIcon from '../../assets/icon/iconAstrologie.png';
import animalIcon from '../../assets/icon/iconAnimaux.png';
import sportIcon from '../../assets/icon/iconSport.png';
import hobbyIcon from '../../assets/icon/iconHobby.png';
import loginData from '../../data/LoginData';

const iconMapping = {
  Height: heightIcon,
  Sign: astrologieIcon,
  FavAnimal: animalIcon,
  Sport: sportIcon,
  Hobby: hobbyIcon
};

const DetailProfil = ({ profil, onDelete }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(true);
  const profileToDisplay = loginData[0];

  if (!profil) {
    return <p>Profile information is not available.</p>;
  }

  const handleDelete = () => {
    if (onDelete && profil.id) {
      onDelete(profil.id); // Call the delete handler passed from parent
      setShowDeleteButton(false); // Hide the delete button after deletion
    }
  };

  return (
    <div className="JBB-detailprofil-container">
      <div
        className="JBB-detailprofil-photoAffichage"
        style={{ backgroundImage: `url(${profil.photo_de_profil})` }}
      >
        <div className="JBB-detailprofil-nomMetier">
          <p className="JBB-detailprofil-nom">{profil.prenom}, {profil.age}</p>
          <p className="JBB-detailprofil-metier">{profil.metier}</p>
        </div>
      </div>
      <div className="JBB-detailprofil-infoProfil">
        <div className="JBB-detailprofil-bubbles">
          {profil.bubble && Object.entries(profil.bubble).filter(([key, value]) => value).map(([key, popup], index) => {
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
          <p className="JBB-detailProfil-name">
            Nom : {profil.name}
          </p>
          {showDeleteButton && profileToDisplay?.admin && (
            <button
              className="JBB-detailprofil-supprimer"
              onClick={handleDelete}
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

DetailProfil.propTypes = {
  profil: PropTypes.shape({
    id: PropTypes.number.isRequired,
    photo_de_profil: PropTypes.string,
    prenom: PropTypes.string.isRequired,
    age: PropTypes.string,
    metier: PropTypes.string,
    grandeur: PropTypes.string,
    description: PropTypes.string,
    bubble: PropTypes.objectOf(PropTypes.string),
    phone: PropTypes.string,
  }),
  onDelete: PropTypes.func,
};

export default DetailProfil;