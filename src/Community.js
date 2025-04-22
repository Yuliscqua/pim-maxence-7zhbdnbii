import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';
import Header from './components/Header';
import './style.css';
import SearchBar from './components/SearchBar';

function Community() {
    const { userId } = useParams();
    const [loading, setLoading] = useState(false);
    
    // Données pour les hubs de jeux
    const gameHubs = [
        {
            id: 'oneshot',
            title: 'OneShot',
            image: 'https://media.senscritique.com/media/000020929809/0/oneshot.jpg',
            link: '#'
        },
        {
            id: 'hustle',
            title: 'Your Only Move Is HUSTLE',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUdbV3w0s0g58xaYpOQ2Jy-yoexGfV4fy9SQ&s',
            link: '#'
        },
        {
            id: 'noirville',
            title: 'Noir Ville',
            image: 'https://products.eneba.games/resized-products/Mbo46L-poeI8RviTYyhZ68OjFbonJTtscPf54WmDBFc_350x200_1x-0.jpeg',
            link: '#'
        }
    ];
    
    // Données pour les publications
    const publications = [
        {
            id: 'omori-guide',
            title: 'Omori : Guide',
            author: 'Barinee',
            content: 'Comment obtenir le 100 %',
            description: 'Dans ce guide je vais vous expliquer comment obtenir toutes les fins et toutes les cachés du jeu.',
            image: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Omori_cover.jpg',
            type: 'guide'
        },
        {
            id: 'oneshot-eval',
            title: 'OneShot : Évaluation',
            author: 'Minotorus',
            content: '"J\'ai adoré chaque instant de ce jeu. L\'histoire comme les mécaniques sont formidables, et je me suis tellement attaché au personnage que j\'aimerais pouvoir revivre cette expérience aux côtés de Niko!"',
            image: 'https://img.opencritic.com/game/3647/o/7L8iXPEg.jpg',
            type: 'evaluation'
        },
        {
            id: 'undertale-fan',
            title: 'Undertale : Création de Fan',
            author: 'Fiodon',
            content: '',
            // Pas d'image ici car nous utilisons une bannière complète
            type: 'fan',
            isBanner: true,
            bannerImage: 'https://timelinecovers.pro/facebook-cover/download/video-game-undertale-sans-facebook-cover.jpg'
        }
    ];
    
    // Données pour les événements
    const events = [
        {
            id: 'hustle-tournament',
            title: 'Your Only Move Is Hustle : Tournoi',
            description: 'Le jeu de combat indépendant "Your only move is hustle" organise son premier tournois officiel le 2 mai à 18h. Des rewards seront offerts aux gagnants, venez nombreux.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUdbV3w0s0g58xaYpOQ2Jy-yoexGfV4fy9SQ&s',
            action: 'INSCRIPTIONS',
            link: '#'
        },
        {
            id: 'neon-doctrine',
            title: 'Neon Doctrine : Annonce',
            description: 'L\'éditeur Neon Doctrine nous annonce qu\'un jeu aurait été gardé propre pour les mois à venir. Ils nous diront tout dans l\'annonce qui aura lieu sur leur chaine youtube le 03 avril.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvrOnuniFoboU3Ny6vP8BVYsuFJoFpP2mIZQ&s',
            action: 'DÉTAILS',
            link: '#'
        },
        {
            id: 'game-of-month',
            title: 'Élisez le jeu du mois',
            description: 'La fin touche à sa fin, une envoi pas particulier mais pas d\'inquiétude, vous pouvez voter pour désigner le jeu qui vous a le plus marqué dernièrement. Le gagnant sera mis à l\'honneur et sa mascotte décorera notre site.',
            image: null,
            logoText: 'INDIELINK',
            action: 'DÉTAILS',
            link: '#'
        }
    ];

    return (
        <div className="community-page">
            <Header userId={userId} />
            
            <div className="community-content">
                <h2 className="community-title">Communauté</h2>
                
                {/* Hubs de jeux */}
                <section className="community-section">
                    <h3 className="section-title">Hubs de vos jeux</h3>
                    
                    <div className="game-hubs">
                        {gameHubs.map(hub => (
                            <div key={hub.id} className="game-hub-card">
                                <Link to={hub.link}>
                                    <img src={hub.image} alt={hub.title} className="hub-image" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Barre de recherche */}
                <SearchBar />
                
                {/* Publications */}
                <section className="community-section">
                    <h3 className="section-title">Publications qui pourraient vous intéresser</h3>
                    
                    <div className="publications-list">
                        {publications.map(pub => (
                            pub.isBanner ? (
                                // Affichage spécial pour la bannière Undertale
                                <div key={pub.id} className="publication-banner">
                                    <img src={pub.bannerImage} alt={pub.title} className="banner-image" />
                                    <div className="banner-overlay">
                                        <h4 className="banner-title">{pub.title}</h4>
                                        <p className="banner-author">par {pub.author}</p>
                                    </div>
                                </div>
                            ) : (
                                // Affichage normal pour les autres publications
                                <div key={pub.id} className={`publication-card ${pub.type}`}>
                                    <div className="publication-image">
                                        <img src={pub.image} alt={pub.title} />
                                    </div>
                                    <div className="publication-content">
                                        <h4 className="publication-title">{pub.title}</h4>
                                        <p className="publication-author">par {pub.author}</p>
                                        <p className="publication-text">{pub.content}</p>
                                        {pub.description && <p className="publication-description">{pub.description}</p>}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </section>
                
                {/* Événements */}
                <section className="community-section">
                    <h3 className="section-title">Événements à venir</h3>
                    
                    <div className="events-list">
                        {events.map(event => (
                            <div key={event.id} className="event-card">
                                <div className="event-image">
                                    {event.image ? (
                                        <img src={event.image} alt={event.title} />
                                    ) : (
                                        <div className="event-logo-text">{event.logoText}</div>
                                    )}
                                </div>
                                <div className="event-content">
                                    <h4 className="event-title">{event.title}</h4>
                                    <p className="event-description">{event.description}</p>
                                    <Link to={event.link} className="event-action-btn">
                                        {event.action}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Community;