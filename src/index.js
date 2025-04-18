import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import AddingPage from "./AddingPage.js"; 
import GameShop from "./GameShop.js"

const root = createRoot(document.getElementById('app'));

root.render(
  <div id="content">
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add_game" element={<AddingPage />}/>
          <Route path="/game_shop" element={<GameShop />}/>
        </Routes>
    </Router>
  </div>
);
