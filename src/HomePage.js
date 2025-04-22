import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';
import './style.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

function HomePage() {
  const { userId } = useParams();
  const [dailyGames, setDailyGames] = useState([]);
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Catégories disponibles
  const categories = [
    { id: 'rpg', name: 'RPG', image: 'https://th.bing.com/th/id/OIP.NrgknVVzZVeVZMQ-j5vVdAHaEL?w=313&h=180&c=7&r=0&o=5&pid=1.7' },
    { id: 'roguelite', name: 'Roguelite', image: 'https://th.bing.com/th/id/OIP.fj5yAuoK1s5__gKZM37-JQHaEK?w=311&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
    { id: 'riche-en-recit', name: 'Riche en récit', image: 'https://th.bing.com/th/id/OIP.Md8IaTiZElUj0x0J_Fm59QHaEK?w=244&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' }
  ];

  // Données pour la bannière principale
  const heroBannerData = {
    image: 'https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_Celeste_image1600w.jpg',
    title: 'En avril, vous avez élu',
    games: [
      {
        id: 'celeste',
        name: 'Celeste',
        image: 'https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_Celeste_image1600w.jpg'
      },
      {
        id: 'hollow-knight',
        name: 'Hollow Knight',
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/367520/capsule_616x353.jpg?t=1667006028'
      },
      {
        id: 'light-fall',
        name: 'Light Fall',
        image: 'https://pbs.twimg.com/media/Dde9PfJVQAELPCr.jpg'
      }
    ]
  };

  // Récupérer les jeux depuis Firestore
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "games"));
        const gamesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Jeux du jour - par défaut
        const defaultDailyGames = [
          {
            id: 'celeste-daily',
            name: 'Celeste',
            logo: 'https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_Celeste_image1600w.jpg',
            price: '19.40 €',
            genre: 'Aventure'
          },
          {
            id: 'inscryption-daily',
            name: 'Inscryption',
            logo: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000056157/9a0b6d0860c999c2c48d682c0821bfde662c39c1d3cbad8034ec48b502a41e1b',
            price: '20.00 €',
            genre: 'Stratégie'
          },
          {
            id: 'omori-daily',
            name: 'Omori',
            logo: 'https://cdn.akamai.steamstatic.com/steam/apps/1150690/capsule_616x353.jpg?t=1666923826',
            price: '16.79 €',
            genre: 'Horreur psychologique'
          }
        ];

        // Jeux recommandés - par défaut
        const defaultRecommendedGames = [
          {
            id: 'hades-rec',
            name: 'Hades',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/capsule_616x353.jpg?t=1680293801',
            price: '24.99 €',
            genre: 'Action'
          },
          {
            id: 'hollow-knight-rec',
            name: 'Hollow Knight',
            logo: 'https://cdn.akamai.steamstatic.com/steam/apps/367520/capsule_616x353.jpg?t=1667006028',
            price: '14.99 €',
            genre: 'Aventure'
          },
          {
            id: 'cuphead-rec',
            name: 'Cuphead',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/268910/capsule_616x353.jpg?t=1695655205',
            price: '19.99 €',
            genre: 'Psychédélique'
          }
        ];

        // Si nous avons des jeux dans Firestore, on les utilise
        if (gamesData.length > 0) {
          // On récupère 3 jeux aléatoires
          const randomGames = [...gamesData].sort(() => Math.random() - 0.5).slice(0, 3);
          setDailyGames(randomGames.length === 3 ? randomGames : defaultDailyGames);
          
          // Pour les recommandations, on prend 3 autres jeux
          const otherRandomGames = [...gamesData]
            .filter(game => !randomGames.find(g => g.id === game.id))
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
          
          setRecommendedGames(otherRandomGames.length === 3 ? otherRandomGames : defaultRecommendedGames);
        } else {
          // Si pas de jeux dans Firestore, on utilise les jeux par défaut
          setDailyGames(defaultDailyGames);
          setRecommendedGames(defaultRecommendedGames);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des jeux:", error);
        // En cas d'erreur, on utilise les jeux par défaut
        setDailyGames([
          {
            id: 'celeste-daily',
            name: 'Celeste',
            logo: 'https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_Celeste_image1600w.jpg',
            price: '19.40 €',
            genre: 'Aventure'
          },
          {
            id: 'inscryption-daily',
            name: 'Inscryption',
            logo: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000056157/9a0b6d0860c999c2c48d682c0821bfde662c39c1d3cbad8034ec48b502a41e1b',
            price: '20.00 €',
            genre: 'Stratégie'
          },
          {
            id: 'omori-daily',
            name: 'Omori',
            logo: 'https://cdn.akamai.steamstatic.com/steam/apps/1150690/capsule_616x353.jpg?t=1666923826',
            price: '16.79 €',
            genre: 'Horreur psychologique'
          }
        ]);
        setRecommendedGames([
          {
            id: 'hades-rec',
            name: 'Hades',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/capsule_616x353.jpg?t=1680293801',
            price: '24.99 €',
            genre: 'Action'
          },
          {
            id: 'hollow-knight-rec',
            name: 'Hollow Knight',
            logo: 'https://cdn.akamai.steamstatic.com/steam/apps/367520/capsule_616x353.jpg?t=1667006028',
            price: '14.99 €',
            genre: 'Aventure'
          },
          {
            id: 'cuphead-rec',
            name: 'Cuphead',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/268910/capsule_616x353.jpg?t=1695655205',
            price: '19.99 €',
            genre: 'Psychédélique'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Si chargement en cours
  if (loading) {
    return (
      <div className="homePage">
        <Header userId={userId} />
        <div className="loading-container">
          <div className="loading-spinner">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="homePage">
      <Header userId={userId} />

      {/* Bannière principale */}
      <div className="hero-banner-container">
        <div className="hero-banner">
          <img 
            src={heroBannerData.image} 
            alt="Bannière du jeu" 
            className="hero-banner-image"
          />
          <div className="hero-content">
            <h2 className="hero-title">{heroBannerData.title}</h2>
            <div className="hero-games">
              {heroBannerData.games.map((game, index) => (
                <img key={index} src={game.image} alt={game.name} className="hero-game-image" />
              ))}
            </div>
            <button className="hero-button">Découvrir</button>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="search-container">
        <SearchBar />
      </div>

      {/* Jeux du jour - Carrousel */}
      <section className="games-section">
        <h3 className="section-title">Jeux du jour</h3>
        <div className="carousel-container">
          <div className="carousel-wrapper">
            {dailyGames.map((game, index) => (
              <Link to={`/game_shop/${userId}/${game.id}`} key={index} className="game-card-link">
                <div className="game-card">
                  <div className="game-card-image">
                    <img src={game.logo} alt={game.name} />
                    <div className="game-card-overlay">
                      <span className="game-card-tag">{game.genre}</span>
                    </div>
                  </div>
                  <div className="game-card-info">
                    <h4 className="game-card-title">{game.name}</h4>
                    <span className="game-card-price">{game.price}</span>
                  </div>
                  <div className="game-card-buttons">
                    <button className="game-card-btn">ACHETER</button>
                    <button className="game-card-btn">WISHLIST</button>
                    <button className="game-card-btn">INFO</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="see-more">
          <Link to={`/shop/${userId}/all`}>VOIR PLUS</Link>
        </div>
      </section>

      {/* Jeux recommandés - Carrousel */}
      <section className="games-section">
        <h3 className="section-title">Recommandé pour vous</h3>
        <div className="carousel-container">
          <div className="carousel-wrapper">
            {recommendedGames.map((game, index) => (
              <Link to={`/game_shop/${userId}/${game.id}`} key={index} className="game-card-link">
                <div className="game-card">
                  <div className="game-card-image">
                    <img src={game.logo} alt={game.name} />
                    <div className="game-card-overlay">
                      <span className="game-card-tag">{game.genre}</span>
                    </div>
                  </div>
                  <div className="game-card-info">
                    <h4 className="game-card-title">{game.name}</h4>
                    <span className="game-card-price">{game.price}</span>
                  </div>
                  <div className="game-card-buttons">
                    <button className="game-card-btn">ACHETER</button>
                    <button className="game-card-btn">WISHLIST</button>
                    <button className="game-card-btn">INFO</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="see-more">
          <Link to={`/shop/${userId}/recommended`}>VOIR PLUS</Link>
        </div>
      </section>

      {/* Catégories */}
      <section className="categories-section">
        <h3 className="section-title">Catégories qui pourraient vous plaire</h3>
        <div className="carousel-container">
          <div className="carousel-wrapper categories-wrapper">
            {categories.map((category, index) => (
              <Link key={index} to={`/shop/${userId}/category/${category.id}`} className="category-card">
                <img src={category.image} alt={category.name} className="category-image" />
                <div className="category-overlay">
                  <h4 className="category-name">{category.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;