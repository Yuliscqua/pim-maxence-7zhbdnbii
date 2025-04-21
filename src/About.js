import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import Header from './components/Header';

function About() {
  const { userId } = useParams();

  return (
    <div className="about-page">
      <Header userId={userId} />

      <main className="about-main">
        <section className="about-intro">
          <h2>IndieLink, la plateforme des amoureux du jeu indépendant</h2>
          
          <p className="about-tagline">
            Achetez, vendez ou échangez vos jeux indés 
            dans un espace conçu pour les passionnés.
            Humain, simple, intelligent.
          </p>
        </section>
        
        <div className="separator"></div>
        
        <section className="about-why">
          <h3>Pourquoi IndieLink ?</h3>
          
          <p>
            Parce que les jeux indépendants méritent mieux 
            qu'un coin perdu sur une marketplace 
            généraliste.
          </p>
          <p>
            IndieLink est né d'une envie simple : connecter
            les joueurs entre eux autour de jeux rares,
            créatifs et profonds.
          </p>
          <p>
            Comparer les offres, découvrir des pépites,
            échanger avec d'autres passionnés — le tout,
            sans prise de tête.
          </p>
        </section>
        
        <section className="features">
          <div className="feature-item">
            <div className="feature-icon search-icon"></div>
            <p className="feature-text">
              Comparateur intelligent : trouvez la meilleure 
              annonce en un clin d'œil
            </p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon exchange-icon"></div>
            <p className="feature-text">
              Matching de troc : proposez vos jeux, trouvez 
              des échanges pertinents
            </p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon ai-icon"></div>
            <p className="feature-text">
              Assistant IA : recommandations personnalisées
              & création d'annonce assistée
            </p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon daily-icon"></div>
            <p className="feature-text">
              Curation indé : chaque jour une nouvelle pépite à 
              découvrir
            </p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon details-icon"></div>
            <p className="feature-text">
              Fiches jeu détaillées : infos, avis, rareté,
              formats disponibles
            </p>
          </div>
        </section>
        
        <section className="about-team">
          <p>
            Derrière IndieLink, c'est une petite équipe de
            développeurs, designers, créateurs et joueurs
            indés.
          </p>
          <p>
            On fait tout pour construire un espace qui vous
            ressemble.
          </p>
          <p>
            IndieLink, c'est autant vous que nous.
          </p>
        </section>
        
        <section className="join-us">
          <h3>Envie de faire partie de l'aventure ?</h3>
          
          <p>
            Contacte-nous si tu es développeur, vendeur ou
            joueur
          </p>
          <p>
            Rejoins notre communauté Discord
          </p>
          <p>
            Suis-nous pour découvrir les prochaines
            fonctionnalités
          </p>
          
          <div className="join-buttons">
            <Link to={`/community/${userId}`} className="join-button">
              Rejoindre la communauté
            </Link>
            <Link to={`/contact/${userId}`} className="contact-button">
              Nous contacter
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;