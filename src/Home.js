import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Home () {
    return (
        <div className="Home">
            <Link to="/signin">S'inscrire</Link>
            <Link to="/login">Se connecter</Link>
        </div>
    )
}

export default Home;