import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import SidebarMenu from './components/SidebarMenu';

function HomePage() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Featured game data for the hero section
  const featuredGame = {
    title: "CELESTE",
    tagline: "En avril, vous avez élu",
    image: "/api/placeholder/400/320",
  };

  // Game cards data
  const gamesOfDay = [
    { id: 1, title: "Celeste", price: "18.50 €", image: "/api/placeholder/200/150", boutique: "BOUTIQUE" },
    { id: 2, title: "Inscryption", price: "20.00 €", image: "/api/placeholder/200/150", boutique: "BOUTIQUE" },
    { id: 3, title: "Omori", price: "18.18 €", image: "/api/placeholder/200/150", boutique: "BOUTIQUE" }
  ];

  const recommendedGames = [
    { id: 4, title: "Hades", price: "24.50 €", image: "/api/placeholder/200/150", boutique: "BOUTIQUE" },
    { id: 5, title: "Hollow Knight", price: "14.79 €", image: "/api/placeholder/200/150", boutique: "BOUTIQUE" },
    { id: 6, title: "Yuppie Psycho", price: "16.99 €", image: "/api/placeholder/200/150", boutique: "BOUTIQUE" }
  ];

  const categories = [
    { id: 1, name: "RPG", image: "/api/placeholder/300/100" },
    { id: 2, name: "Roguelite", image: "/api/placeholder/300/100" },
    { id: 3, name: "Riche en récit", image: "/api/placeholder/300/100" }
  ];

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
            <div className="heart-icon">♥</div>
            <div className="profile-icon">
              <img src="/api/placeholder/40/40" alt="Profile" className="pixel-avatar" />
            </div>
          </div>
        </div>
      </header>

      {showSidebar && <SidebarMenu onClose={toggleSidebar} />}

      <div className="page-content">
        {/* Hero banner */}
        <div className="hero-banner">
          <div className="hero-content">
            <p className="hero-tagline">{featuredGame.tagline}</p>
            <h2 className="hero-title">{featuredGame.title}</h2>
            <button className="discover-btn">Découvrir</button>
          </div>
        </div>

        {/* Search bar */}
        <div className="search-container">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Rechercher un jeu..." />
            <span className="filter-icon">⚙️</span>
          </div>
        </div>

        {/* Games of the day section */}
        <section className="games-section">
          <h2 className="section-title">Jeux du jour</h2>
          <div className="game-cards">
            {gamesOfDay.map(game => (
              <div className="game-card" key={game.id}>
                <div className="game-image">
                  <img src={game.image} alt={game.title} />
                  <span className="boutique-tag">{game.boutique}</span>
                </div>
                <div className="game-info">
                  <h3 className="game-title">{game.title}</h3>
                  <p className="game-price">{game.price}</p>
                </div>
                <div className="game-actions">
                  <button className="action-btn">ACHETER</button>
                  <button className="action-btn">WISHLIST</button>
                  <button className="action-btn">FAQ</button>
                </div>
              </div>
            ))}
          </div>
          <div className="see-more">VOIR PLUS</div>
        </section>

        {/* Recommended games section */}
        <section className="games-section">
          <h2 className="section-title">Recommandé pour vous</h2>
          <div className="game-cards">
            {recommendedGames.map(game => (
              <div className="game-card" key={game.id}>
                <div className="game-image">
                  <img src={game.image} alt={game.title} />
                  <span className="boutique-tag">{game.boutique}</span>
                </div>
                <div className="game-info">
                  <h3 className="game-title">{game.title}</h3>
                  <p className="game-price">{game.price}</p>
                </div>
                <div className="game-actions">
                  <button className="action-btn">ACHETER</button>
                  <button className="action-btn">WISHLIST</button>
                  <button className="action-btn">FAQ</button>
                </div>
              </div>
            ))}
          </div>
          <div className="see-more">VOIR PLUS</div>
        </section>

        {/* Categories section */}
        <section className="categories-section">
          <h2 className="section-title">Catégories qui pourraient vous plaire</h2>
          <div className="category-cards">
            {categories.map(category => (
              <div className="category-card" key={category.id}>
                <img src={category.image} alt={category.name} />
                <h3 className="category-name">{category.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;