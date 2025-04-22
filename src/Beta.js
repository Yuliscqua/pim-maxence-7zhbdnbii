import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDocs, updateDoc, arrayUnion, arrayRemove, collection, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import Header from './components/Header.js';

function Beta () {
    const { userId } = useParams();
    const [games, setGames] = useState([]);
    const [announcements, setAnnouncements] = useState([
        {
            id: '1',
            title: 'Paper Lily : Date de sortie',
            description: 'Petite Evocation vous informe, nous sommes heureux de vous annoncer que le Chapitre 8 arrive le 30 mai ! Il sera suivi du Chapitre 9 novembre cette année.',
            image: 'https://gaming-cdn.com/images/products/15862/orig/paper-lily-chapter-1-pc-jeu-steam-cover.jpg?v=1710155437',
            gameId: 'PAPER_LILY_GAME_ID' // Remplacez par l'ID réel du jeu dans Firestore
        },
        {
            id: '2',
            title: 'Nouveauté : Port Valley',
            description: 'La demo est enfin sortie ! Vous pouvez la télécharger pour un petit port de pêche en cours de rénovation, vous amenera-t-il à plus ?',
            image: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/904450/capsule_616x353.jpg?t=1726600602',
            gameId: 'PORT_VALLEY_GAME_ID' // Remplacez par l'ID réel du jeu dans Firestore
        },
        {
            id: '3',
            title: 'Nouvelle sortie : Felvidan',
            description: 'Le rpg médiéval Felvidan que beaucoup attendaient, est désormais jouable ! Vous pouvez y jouer dès maintenant pour 15€ !',
            image: 'https://i.ytimg.com/vi/RbReDMBTbC4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAous9leehe2uIanlpUkNCjyfewdA',
            gameId: 'FELVIDAN_GAME_ID' // Remplacez par l'ID réel du jeu dans Firestore
        }
    ]);

    const fetchGames = async () => {
        const querySnapshot = await getDocs(collection(db, "games"));
        const gamesArray = querySnapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data(),
        }));
        setGames(gamesArray);
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div className="beta-page">
            <Header userId={userId}/>
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

            <h3 className="beta-subtitle">Découvrez les futurs succès</h3>
            
            {/* Jeux en version beta */}
            <div className="beta-games-grid">
                {games.map(game => {
                    if (game.status === 'beta') {
                        return (
                            <Link to={`/game_shop/${userId}/${game.id}`} key={game.id} className="beta-game-card">
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
                            </Link>
                        )
                    }
                    return null;
                })}
            </div>

            {/* Section annonces */}
            <h3 className="beta-section-title">Annonces</h3>
            <div className="beta-announcements-list">
                {announcements.map(announcement => (
                    <div key={announcement.id} className="beta-announcement-item">
                        <div className="announcement-image">
                            <img src={announcement.image} alt={announcement.title} />
                        </div>
                        <div className="announcement-content">
                            <h4 className="announcement-title">{announcement.title}</h4>
                            <p className="announcement-description">{announcement.description}</p>
                            <Link 
                                to={`/game_shop/${userId}/${announcement.gameId}`} 
                                className="details-button"
                            >
                                DÉTAILS
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Beta;