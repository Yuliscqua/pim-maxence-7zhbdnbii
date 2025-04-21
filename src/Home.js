import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Home () {
    return (
        <div className="Home">
            <div className="logo">INDIE<span className="link-text">LINK</span></div>
            <p>Bienvenue sur IndieLink ! Le site qui rassemble tous les amateurs de jeux vidéo indépendants ! Pour profiter de notre expérience en communauté, commencez à vous inscrire ou connectez-vous ! </p>
            <Link className="signin" to="/signin">S'inscrire</Link>
            <Link className="login" to="/login">Se connecter</Link>
        </div>
    )
}

export default Home;