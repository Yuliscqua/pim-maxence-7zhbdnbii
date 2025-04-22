import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home.js';
import HomePage from './HomePage';
import AddingPage from "./AddingPage.js"; 
import AllGames from "./AllGames.js";
import GameShop from "./GameShop.js";
import Contact from "./Contact.js";
import SignIn from "./SignIn.js";
import Profile from "./Profile.js";
import LogIn from "./LogIn.js";
import Library from "./Library.js";
import Beta from "./Beta.js";
import Community from "./Community.js";
import TipsCreation from "./Tips-creation.js";
import Classement from "./Classement.js";
import Events from "./Events.js";
import About from "./About.js";
import LegalNotice from "./LegalNotice.js";

const root = createRoot(document.getElementById('app'));

root.render(
  <div id="content">
    <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signin" element ={<SignIn />}/>
          <Route path="/login" element={<LogIn />}/>
          <Route path="/shop/:userId" element={<HomePage />} />
          <Route path="/allgames/:userId/:category" element={<AllGames />} />
          <Route path="/profile/:userId" element={<Profile />}/>
          <Route path="/add_game/:userId" element={<AddingPage />}/>
          <Route path="/game_shop/:userId/:gameId" element={<GameShop />}/>
          <Route path="/contact/:userId" element={<Contact />}/>
          <Route path="/library/:userId" element={<Library />}></Route>
          <Route path="/versions-beta/:userId" element={<Beta />}></Route>
          <Route path="/community/:userId" element={<Community />}></Route>
          <Route path="/tips-creation/:userId" element={<TipsCreation />}></Route>
          <Route path="/classement/:userId" element={<Classement />}></Route>
          <Route path="/events/:userId" element={<Events />}></Route>
          <Route path="/a-propos/:userId" element={<About/>}></Route>
          <Route path="/mentions-legales/:userId" element={<LegalNotice />}></Route>
        </Routes>
    </Router>
  </div>
);
