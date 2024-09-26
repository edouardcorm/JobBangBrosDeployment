import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ConnexionUser.css";
import "../../index.css";
import { useConnexion } from "../../hooks/useConnexion";


const ConnexionUser = () => {
  return (
    <div className="CBL-connexion-body">
      <BoutonAdmin />
      <div className="CBL-connexion-container">
        <div className="CBL-connexion-intro">
          <Inscription />
        </div>
        <div className="CBL-connexion-form">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

const BoutonAdmin = () => {
  return (
    <Link className="JBB-connexionUser-btnAdmin" to="/connexionAdmin">
      Admin
    </Link>
  );
};



const Inscription = () => {
  return (
    <div>
      <p className="CBL-connexion-inscription">
        Vous n'avez pas encore de compte?
      </p>
      <Link className="CBL-connexion-inscriptionLien" to="/inscription">
        Cliquez ici pour vous inscrire
      </Link>
    </div>
  );
};

const LoginForm = () => {
  const { connexion, isLoading, error } = useConnexion();  
  const [montrerMDP, setAffichageMDP] = useState(true);
  const [courriel, setCourriel] = useState("");
  const [password, setPassword] = useState("");

  const affichageMDP = () => {
    setAffichageMDP((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debugging statement
    await connexion(courriel, password);
    console.log("Connexion function called"); // Debugging statement
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="CBL-connexion-titre">CONNEXION</h1>
      <div className="CBL-connexion-email">
        <input
          type="text"
          name="email"
          id="email"
          className="CBL-connexion-textBox"
          placeholder="Entrez votre Courriel"
          onChange={(e) => setCourriel(e.target.value)}
          value={courriel}
        />
      </div>
      <div className="CBL-connexion-motPasse">
        <input
          type={montrerMDP ? "password" : "text"}
          name="password"
          id="password"
          className="CBL-connexion-textBox"
          placeholder="Entrez votre Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="CBL-connexion-cacher">
        <input
          type="checkbox"
          name="remember"
          id="remember"
          checked={montrerMDP}
          onChange={affichageMDP}
        />
        <label htmlFor="remember">Cacher le mot de passe</label>
      </div>
      <div className="CBL-connexion-lien">
        <button
          type="submit"

          className="CBL-connexion-button"
        >
          Connexion
        </button>

      </div>
    </form>
  );
};

export default ConnexionUser;