import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import './style.css';

function AllGames() {
  const { userId, category } = useParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "games"));
        
        let gamesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Filtrer les jeux en fonction de la catégorie si nécessaire
        if (category && category !== 'all') {
          if (category === 'recommended') {
            // Logique pour les jeux recommandés
            // Par exemple, on pourrait trier par note ou prendre des jeux aléatoires
            gamesData = gamesData.sort(() => Math.random() - 0.5);
          } else {
            // Filtrer par genre si c'est une catégorie spécifique
            gamesData = gamesData.filter(game => 
              game.genre && game.genre.toLowerCase() === category.toLowerCase()
            );
          }
        }
        
        setGames(gamesData);
      } catch (err) {
        console.error("Erreur lors du chargement des jeux:", err);
        setError("Une erreur est survenue lors du chargement des jeux.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [category]);

  // Titre de la page en fonction de la catégorie
  const getPageTitle = () => {
    if (!category || category === 'all') return "Tous les jeux";
    if (category === 'recommended') return "Jeux recommandés pour vous";
    return `Jeux ${category}`;
  };

  if (loading) {
    return (
      <div className="all-games-page">
        <Header userId={userId} />
        <div className="loading-container">
          <div className="loading-spinner">Chargement...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-games-page">
        <Header userId={userId} />
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="all-games-page">
      <Header userId={userId} />
      <h2 className="beta-title">{getPageTitle()}</h2>
      
      <SearchBar />
      
      <div className="all-games-grid">
        {games.length > 0 ? (
          games.map(game => (
            <Link to={`/game_shop/${userId}/${game.id}`} key={game.id} className="game-card-link">
              <div className="game-card">
                <div className="game-card-image">
                  <img 
                    src={game.logo || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={game.name} 
                  />
                  <div className="game-card-overlay">
                    <span className="game-card-tag">{game.genre || 'Indie'}</span>
                  </div>
                </div>
                <div className="game-card-info">
                  <h4 className="game-card-title">{game.name}</h4>
                  <span className="game-card-price">{game.price ? `${game.price} €` : 'Gratuit'}</span>
                </div>
                <div className="game-card-buttons">
                  <button className="game-card-btn">ACHETER</button>
                  <button className="game-card-btn">WISHLIST</button>
                  <button className="game-card-btn">INFO</button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-games-message">Aucun jeu trouvé pour cette catégorie.</p>
        )}
      </div>
    </div>
  );
}

export default AllGames;