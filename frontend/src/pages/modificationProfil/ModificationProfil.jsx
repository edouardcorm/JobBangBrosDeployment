import React, { useState } from 'react';
import './ModificationProfil.css';
import heightIcon from '../../assets/icon/iconGrandeur.png';
import astrologieIcon from '../../assets/icon/iconAstrologie.png';
import animalIcon from '../../assets/icon/iconAnimaux.png';
import sportIcon from '../../assets/icon/iconSport.png';
import hobbyIcon from '../../assets/icon/iconHobby.png';
import iconTelephone from '../../assets/icon/iconTelephone.png';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useUserContext } from '../../hooks/useUserContext';

const ModificationProfil = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");
  const [sign, setSign] = useState("");
  const [fav_animal, setFavAnimal] = useState("");
  const [sport, setSport] = useState("");
  const [hobby, setHobby] = useState("");
  const [orientation, setOrientation] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [preference, setPreference] = useState("");
  const [error, setError] = useState(null);

  const handleSelectChange = (e) => {
    setPreference(e.target.value);
  };

  const { updateUser } = useUserContext();

  const handleEnregistrer = async (e) => {
    e.preventDefault();

    const profil = {
      name,
      age,
      job,
      phone,
      tags: {
      height,
      sign,
      fav_animal,
      sport,
      hobby,
      },
      orientation,
      profilePicture,
      preference,
    };

    console.log("Profile data to be saved:", profil);
    console.log("User object:", user);

    try {
      if (user && user._id) {
        await updateUser(user._id, profil);
        console.log("User updated");
      } else {
        console.error("User ID is not available");
        setError("User ID is not available");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error.message);
    }
  };


  return (
    <div className="JBB-modificationprofil-body">
      <form className="JBB-modificationprofil-container" onSubmit={handleEnregistrer}>
        <div className="JBB-modificationprofil-bouton">
          <Preference preference={preference} handleSelectChange={handleSelectChange} />
          <div className="JBB-modificationprofil-Bouton">
            <button>Enregistrer</button>
            {error && <div className="error">{error}</div>}
          </div>
        </div>
        <div className="JBB-modificationprofil-page">
          <PhotoProfil />
          <div className="JBB-modificationprofil-ProfilDefinition">
            {/* <Age age={age} setAge={setAge}/> */}
            <PhoneNumber phone={phone} setPhone={setPhone}/>
          </div>
        </div>
        <div className="JBB-modificationprofil-info">
          <h1 className="JBB-modificationprofil-textTitre">Vous informations rapides</h1>
          <h4 className="JBB-modificationprofil-textTitre">- Elles apparaîtront directement sur votre profil -</h4>
          <InputGrandeur tag1={height} setTag1={setHeight} />
          <InputSign tag2={sign} setTag2={setSign} />
          <InputFavAnimal tag3={fav_animal} setTag3={setFavAnimal} />
          <InputSport tag4={sport} setTag4={setSport} />
          <InputHobby tag5={hobby} setTag5={setHobby} />
          <InputPhone phone={phone} setPhone={setPhone} />
        </div>
      </form>
    </div>
  );
};

const Preference = ({ preference, handleSelectChange }) => {
  return (
    <div className="JBB-modificationprofil-ComboBoxBouton">
      <div className="JBB-modificationprofil-Preference">
        <label htmlFor="combo-box">Quelles sont vos péférences sexuelles:</label>
        <select id="combo-box" value={preference} onChange={handleSelectChange}>
          <option value="">Aucune</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
        </select>
      </div>
    </div>
  );
};

const PhotoProfil = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const imageArray = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(imageArray);
    }
  };

  return (
    <div className="JBB-modificationprofil-image">
      <label className={selectedImages.length === 0 ? "JBB-modificationprofil-imageInput inputVisble" : "JBB-modificationprofil-imageInput inputInvisble"}>
        +
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="JBB-modificationprofil-fileinput"
        />
      </label>
      <div className="JBB-modificationprofil-imageContainer">
        {selectedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`preview-${index}`}
            className="JBB-modificationprofil-imagePreview"
          />
        ))}
      </div>
    </div>
  );
};

const ProfilDefinition = () => {
  return (
    <div >
      <h4>Quelle est votre </h4>
      <input
        type="text"
        placeholder="Type here..."
      />
    </div>
  );
};

const PhoneNumber = ({ phone, setPhone }) => {
  return (
    <div >
      {/* <h4>Quelle est votre numémro de téléphone</h4> */}
      <input
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
        type="text"
        placeholder="Type here..."
      />
    </div>
  );
};

const Age = ({ age, setAge }) => {
  return (
    <div className="JBB-modificationprofil-ProfilDefinition">
      <h4>Quelle est votre </h4>
      <input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        type="text"
        placeholder="Type here...."
      />
    </div>
  );
};

const InputGrandeur = ({ tag1, setTag1 }) => {
  return (
    <div className="JBB-modificationprofil-InputInfoRapide">
      <h4>Quelle est votre grandeur (pieds)</h4>
      <div className="JBB-modificationprofil-InputZone">
        <img src={heightIcon} alt="heightIcon" className="JBB-modificationprofil-InputImage" />
        <input
          type="text"
          value={tag1}
          onChange={(e) => setTag1(e.target.value)}
          placeholder="Type here..."
        />
      </div>
    </div>
  );
};

const InputSign = ({ tag2, setTag2 }) => {
  return (
    <div className="JBB-modificationprofil-InputInfoRapide">
      <h4>Quelle est votre signe astrologique</h4>
      <div className="JBB-modificationprofil-InputZone">
        <img src={astrologieIcon} alt="astrologieIcon" className="JBB-modificationprofil-InputImage" />
        <input
          type="text"
          value={tag2}
          onChange={(e) => setTag2(e.target.value)}
          placeholder="Type here..."
        />
      </div>
    </div>
  );
};

const InputFavAnimal = ({ tag3, setTag3 }) => {
  return (
    <div className="JBB-modificationprofil-InputInfoRapide">
      <h4>Quelle est votre animal préféré</h4>
      <div className="JBB-modificationprofil-InputZone">
        <img src={animalIcon} alt="animalIcon" className="JBB-modificationprofil-InputImage" />
        <input
          type="text"
          value={tag3}
          onChange={(e) => setTag3(e.target.value)}
          placeholder="Type here..."
        />
      </div>
    </div>
  );
};

const InputSport = ({ tag4, setTag4 }) => {
  return (
    <div className="JBB-modificationprofil-InputInfoRapide">
      <h4>Quelle est votre sport préféré</h4>
      <div className="JBB-modificationprofil-InputZone">
        <img src={sportIcon} alt="sportIcon" className="JBB-modificationprofil-InputImage" />
        <input
          type="text"
          value={tag4}
          onChange={(e) => setTag4(e.target.value)}
          placeholder="Type here..."
        />
      </div>
    </div>
  );
};

const InputHobby = ({ tag5, setTag5 }) => {
  return (
    <div className="JBB-modificationprofil-InputInfoRapide">
      <h4>Quelle est votre passe-temps préféré</h4>
      <div className="JBB-modificationprofil-InputZone">
        <img src={hobbyIcon} alt="hobbyIcon" className="JBB-modificationprofil-InputImage" />
        <input
          type="text"
          value={tag5}
          onChange={(e) => setTag5(e.target.value)}
          placeholder="Type here..."
        />
      </div>
    </div>
  );
};

const InputPhone = ({ phone, setPhone }) => {
  const handleChange = (e) => {
    setPhone(e.target.value.slice(0, 3).replace(/\D/g, ""));
  };

  return (
    <div className="JBB-modificationprofil-InputInfoRapide">
      <h4>Quelle est votre numéro de téléphone</h4>
      <div className="JBB-modificationprofil-InputZone">
        <img src={iconTelephone} alt="iconTelephone" className="JBB-modificationprofil-InputImage" />
        <input
          type="text"
          placeholder="Type here..."
          value={phone}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ModificationProfil;