// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebase';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gameCategories, setGameCategories] = useState([]);
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const gameGenres = [
    'Action', 'Aventure', 'RPG', 'FPS', 'Sport', 
    'Stratégie', 'Simulation', 'Puzzle', 'Course'
  ];

  const handleCategoryChange = (category) => {
    if (gameCategories.includes(category)) {
      setGameCategories(gameCategories.filter(cat => cat !== category));
    } else {
      setGameCategories([...gameCategories, category]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Créer l'utilisateur avec email et mot de passe
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 3. Enregistrer les données utilisateur dans Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        gameCategories,
        profilePicture,
        games: [],
        createdAt: new Date()
      });
      
      // 4. Rediriger vers la page de profil
      navigate(`/shop/${user.uid}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Inscription</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        
        <div className="form-group">
          <label>Photo de profil</label>
          <input
            type="url"
            onChange={(e) => setProfilePicture(e.target.value)}
            accept="image/*"
          />
        </div>
        
        <div className="form-group">
          <label>Catégories de jeux préférées</label>
          <div className="categories-container">
            {gameGenres.map(genre => (
              <label key={genre} className="category-checkbox">
                <input
                  type="checkbox"
                  checked={gameCategories.includes(genre)}
                  onChange={() => handleCategoryChange(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Inscription en cours...' : 'S\'inscrire'}
        </button>
      </form>
    </div>
  );
};

export default Signup;