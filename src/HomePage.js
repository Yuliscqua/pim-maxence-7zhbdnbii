import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import GameList from "./components/GameList";
import SidebarMenu from './components/SidebarMenu';

function HomePage() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="homePage">
      <header className="header">
        <div className="header-content">
          <div className="hamburger-menu" onClick={toggleSidebar}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className="logo">INDIE<span className="link-text">LINK</span></div>
          <div className="header-icons">
            <div className="heart-icon">♡</div>
            <div className="profile-icon"></div>
          </div>
        </div>
        <Link to="/add_game" className="add-game-link">Ajouter un jeu</Link>
      </header>

      {showSidebar && <SidebarMenu onClose={toggleSidebar} />}

      <div className="body">
        <div className="searchBar"></div>
        <div className="dailyGame">
          <b>Jeux du jour</b>
          <div className="carrousel">
            <div className="games_card"></div>
          </div>
        </div>
        <div className="recommandations">
          <b>Recommandés pour vous</b>
          <div className="carrousel">
            <GameList />
          </div>
        </div>
        <div className="categories">
          <b>Catégories qui pourraient vous plaire</b>
          <div className="carrousel">
            <div className="categories_card"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;