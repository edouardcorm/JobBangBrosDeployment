import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useInscription } from "../../hooks/useInscription";
import "./Inscription.css";

const Inscription = () => {
  const [showPW, setShowPW] = useState(true);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { inscription, error, isLoading } = useInscription();

  const displayPW = () => {
    setShowPW((prevShowPassword) => !prevShowPassword);
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setGender(selectedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debugging statement
    console.log("Form data:", { name, gender, email, password }); // Debugging statement
    await inscription(name, gender, email, password);
    console.log("Inscription function called"); // Debugging statement
  };

  return (
    <div className="JBB-inscription-body">
      <div className="JBB-inscription-container">
        <div className="JBB-inscription-intro">
          <MessageBienvenue />
          <Connexion />
        </div>
        <div className="JBB-inscription-form">
          <form onSubmit={handleSubmit}>
            <h1 className="JBB-inscription-titre">Inscription</h1>
            <div className="JBB-inscription-nom">
              <input
                type="text"
                name="name"
                id="name"
                className="JBB-inscription-textBox"
                placeholder="Entrez votre Nom"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="JBB-inscription-prenom">
              <select
                name="gender"
                id="gender"
                className="JBB-inscription-comboBox"
                onChange={handleSelectChange}
                value={gender}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="JBB-inscription-email">
              <input
                type="email"
                name="email"
                id="email"
                className="JBB-inscription-textBox"
                placeholder="Entrez votre Courriel"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="JBB-inscription-motPasse">
              <input
                type={showPW ? "password" : "text"}
                name="password"
                id="password"
                className="JBB-inscription-textBox"
                placeholder="Entrez votre Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="JBB-inscription-cacher">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="JBB-inscription-checkBox"
                checked={!showPW}
                onChange={displayPW}
              />
              <label htmlFor="remember">Cacher le mot de passe</label>
            </div>
            <div className="JBB-inscription-lien">
              <button className="JBB-inscription-button" disabled={isLoading}>
                S'inscrire
              </button>
              {error && <div className="JBB-inscription-error">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const MessageBienvenue = () => {
  return <h4 className="JBB-inscription-bienvenue">Bienvenue!</h4>;
};

const Connexion = () => {
  return (
    <div>
      <p className="JBB-inscription-connexion">Vous avez déjà un compte?</p>
      <Link className="JBB-inscription-connexionLien" to="/">
        Connectez-vous ici
      </Link>
    </div>
  );
};

export default Inscription;