import React, { useState, useEffect } from 'react';
import './style.css';

function HomePage() {
  return (
    <div className="homePage">
      <header className="header"></header>
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
            <div className="games_card"></div>
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
