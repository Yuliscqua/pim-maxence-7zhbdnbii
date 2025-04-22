import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './components/Header.js';
import SearchBar from './components/SearchBar.js';
import GameList from './components/GameList.js';
import './style.css';

function Classement () {
    const { userId } = useParams();
    
    return (
        <div>
            <Header userId={userId} />
            <h2 className="beta-title">Classement</h2>
            <SearchBar/>

            <h3 className="beta-subtitle classement">
                <label className="classement-label" for="orderBy">Classement par : </label>
                <select className="details-button" name="orderBy" id="orderBy">
                    <option value="notes">Recommendations</option>
                    <option value="sold">Ventes 2025</option>
                    <option value="posts">Engagement</option>
                </select>
            </h3>
            <GameList userId={ userId }/>
        </div>
    )
}

export default Classement;