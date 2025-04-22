import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import '../style.css';

function SearchBar () {
    return (
        <div className="community-search-bar">
            <div className='custom-image'></div>
            <div class="custom-image"></div>
            <input 
                type="text" 
                placeholder="Rechercher..." 
                className="search-input"
            />
            <div className="filter-icon">◀</div>
        </div>
    )
}

export default SearchBar;