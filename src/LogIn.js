
// src/pages/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Redirection vers la page de profil après connexion réussie
      navigate(`/shop/${userCredential.user.uid}`);
    } catch (err) {
      // Gestion des erreurs d'authentification
      let errorMessage = 'Échec de connexion';
      
      // Personnalisation des messages d'erreur pour une meilleure expérience utilisateur
      switch (err.code) {
        case 'auth/invalid-email':
          errorMessage = 'Adresse email invalide';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Aucun compte ne correspond à cette adresse email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Mot de passe incorrect';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Trop de tentatives de connexion échouées. Veuillez réessayer plus tard';
          break;
        default:
          errorMessage = `Échec de connexion: ${err.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = () => {
    navigate('/reset-password');
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="votre@email.com"
          />
        </div>
        
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Votre mot de passe"
          />
          <div className="forgot-password">
            <span onClick={handleResetPassword}>Mot de passe oublié?</span>
          </div>
        </div>
        
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
      
      <div className="signup-link">
        <p>
          Pas encore de compte? <Link to="/signin">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;