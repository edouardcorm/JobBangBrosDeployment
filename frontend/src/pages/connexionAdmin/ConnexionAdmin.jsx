import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ConnexionAdmin.css";
import "../../index.css";

const ConnexionAdmin = () => {
    return (
        <div className="CBL-connexion-body">
            <BoutonUser />
            <div className="CBL-connexion-container">
                <div className="CBL-connexion-intro">
                    <Admin />
                </div>
                <div className="CBL-connexion-form">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

const BoutonUser = () => {
    return (
        <Link className="JBB-connexionAdmin-btnUser" to="/">
            User
        </Link>
    );
};



const Admin = () => {
    return (
        <div>
            <p className="JBB-connexionAdmin-adminLog">
                Admin Login
            </p>
        </div>
    );
};

const LoginForm = () => {
    const [montrerMDP, setAffichageMDP] = useState(true);
    const [courriel, setCourriel] = useState("");
    const [password, setPassword] = useState("");

    const affichageMDP = () => {
        setAffichageMDP((prevShowPassword) => !prevShowPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();


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

export default ConnexionAdmin;
