import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home.js';
import HomePage from './HomePage';
import AddingPage from "./AddingPage.js"; 
import GameShop from "./GameShop.js";
import Contact from "./Contact.js";
import SignIn from "./SignIn.js";
import Profile from "./Profile.js";
import LogIn from "./LogIn.js";

const root = createRoot(document.getElementById('app'));

root.render(
  <div id="content">
    <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signin" element ={<SignIn />}/>
          <Route path="/login" element={<LogIn />}/>
          <Route path="/shop/:userId" element={<HomePage />} />
          <Route path="/profile/:userId" element={<Profile />}/>
          <Route path="/add_game" element={<AddingPage />}/>
          <Route path="/game_shop/:gameId" element={<GameShop />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
    </Router>
  </div>
);
