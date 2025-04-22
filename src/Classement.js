import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDocs, updateDoc, arrayUnion, arrayRemove, collection, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import Header from './components/Header.js';
import SearchBar from './components/SearchBar.js';
import './style.css';

function Classement () {
    const { userId } = useParams();
    
    return (
        <div>
            <Header userId={userId} />
            <h2 className="beta-title">Classement</h2>
            <SearchBar/>
        </div>
    )
}

export default Classement;