import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import GameList from "./components/GameList";
import Header from './components/Header';

function HomePage() {
  const { userId } = useParams();
  return (
    <div className="homePage">
      <Header userId={userId}/>

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
            <GameList userId={userId}/>
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