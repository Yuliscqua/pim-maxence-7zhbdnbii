import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDocs, updateDoc, arrayUnion, arrayRemove, collection, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import Header from './components/Header.js'

function TipsCreation () {
    const { userId } = useParams();
    
    return (
        <Header userId={userId} />
    )
}

export default TipsCreation;