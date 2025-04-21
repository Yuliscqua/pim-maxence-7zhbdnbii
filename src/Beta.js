import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDocs, getDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import Header from './components/Header';
import './style.css';

function Beta() {
  const { userId } = useParams();
  const [games, setGames] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les jeux en version beta et les annonces
  useEffect(() => {
    const fetchBetaGames = async () => {
      try {
        setLoading(true);
        
        // Récupérer les jeux en version beta
        const querySnapshot = await getDocs(collection(db, "games"));
        const betaGames = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(game => game.status === 'beta');
        
        setGames(betaGames);
        
        // Récupérer les annonces (simulé ici, à adapter selon votre structure de données)
        // Dans un cas réel, vous récupéreriez probablement ces données depuis une collection "announcements"
        const mockAnnouncements = [
          {
            id: '1',
            title: 'Paper Lily : Date de sortie',
            description: 'Petite Evocation vous informe, nous sommes heureux de vous annoncer que le Chapitre 8 arrive le 30 mai ! Il sera suivi du Chapitre 9 novembre cette année.',
            image: 'https://via.placeholder.com/100x80/333/fff?text=Paper+Lily',
          },
          {
            id: '2',
            title: 'Nouveauté : Port Valley',
            description: 'La demo est enfin sortie ! Vous pouvez la télécharger pour un petit port de pêche en cours de rénovation, vous amenera-t-il à plus ?',
            image: 'https://via.placeholder.com/100x80/333/fff?text=Port+Valley',
          },
          {
            id: '3',
            title: 'Nouvelle sortie : Felvidan',
            description: 'Le rpg médiéval Felvidan que beaucoup attendaient, est désormais jouable ! Vous pouvez y jouer dès maintenant pour 15€ !',
            image: 'https://via.placeholder.com/100x80/333/fff?text=Felvidan',
          }
        ];
        
        setAnnouncements(mockAnnouncements);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Impossible de charger les jeux en version beta");
      } finally {
        setLoading(false);
      }
    };

    fetchBetaGames();
  }, []);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="beta-page">
      <Header userId={userId} />
      
      <div className="beta-content">
        <h2 className="beta-title">Versions beta</h2>
        
        {/* Barre de recherche */}
        <div className="beta-search-bar">
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="search-input"
          />
          <div className="filter-icon">◀</div>
        </div>
        
        <div className="beta-section">
          <h3 className="beta-subtitle">Découvrez les futures succès</h3>
          
          {/* Grille de jeux beta */}
          <div className="beta-games-grid">
            {games.length > 0 ? (
              games.map(game => (
                <div key={game.id} className="beta-game-card">
                  <div className="beta-game-image">
                    <img src={game.logo || 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2067780/capsule_616x353.jpg?t=1703759640'} alt={game.name} />
                  </div>
                  <div className="beta-game-info">
                    <h4 className="beta-game-title">{game.name}</h4>
                    <p className="beta-game-price">{game.price} €</p>
                    <div className="beta-game-buttons">
                      <Link to={`/game_shop/${userId}/${game.id}`} className="game-btn primary">JOUER</Link>
                      <button className="game-btn">BETA</button>
                      <button className="game-btn">WISHLIST</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-games">Aucun jeu en version beta disponible actuellement.</p>
            )}
          </div>
        </div>
        
        <div className="beta-announcements-section">
          <h3 className="beta-section-title">Annonces</h3>
          
          {/* Liste d'annonces */}
          <div className="beta-announcements-list">
            {announcements.map(announcement => (
              <div key={announcement.id} className="beta-announcement-item">
                <div className="announcement-image">
                  <img src={announcement.image} alt={announcement.title} />
                </div>
                <div className="announcement-content">
                  <h4 className="announcement-title">{announcement.title}</h4>
                  <p className="announcement-description">{announcement.description}</p>
                  <button className="details-button">DÉTAILS</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Beta;