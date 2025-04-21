import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDocs, updateDoc, arrayUnion, arrayRemove, collection, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import Header from './components/Header.js'

function TipsCreation () {
    const { userId } = useParams();
    
    return (
        <div className="tipscreation">
            <Header userId={userId} />
            <h4>Tips / Création</h4>
        </div>
        
    )
}

export default TipsCreation;