import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [userGames, setUserGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [gameCategories, setGameCategories] = useState([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [addGameMode, setAddGameMode] = useState(false);
  const [gameTitle, setGameTitle] = useState('');
  const [gameGenre, setGameGenre] = useState('');

  const gameGenres = [
    'Action', 'Aventure', 'RPG', 'FPS', 'Sport', 
    'Stratégie', 'Simulation', 'Puzzle', 'Course'
  ];

  // Vérifier si l'utilisateur connecté est le propriétaire du profil
  const isOwner = auth.currentUser && auth.currentUser.uid === userId;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
          setName(data.name);
          setGameCategories(data.gameCategories || []);
          setProfilePictureUrl(data.profilePicture || '');
          
          // Récupérer les jeux de l'utilisateur
          if (data.games && data.games.length > 0) {
            const gamesData = await Promise.all(
              data.games.map(gameId => getDoc(doc(db, 'games', gameId)))
            );
            
            setUserGames(gamesData.map(game => ({
              id: game.id,
              ...game.data()
            })));
          }
        } else {
          setError('Utilisateur non trouvé');
        }
      } catch (err) {
        setError('Erreur lors du chargement des données: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [userId]);

  const handleCategoryChange = (category) => {
    if (gameCategories.includes(category)) {
      setGameCategories(gameCategories.filter(cat => cat !== category));
    } else {
      setGameCategories([...gameCategories, category]);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const userRef = doc(db, 'users', userId);
      
      // Mise à jour des données de base
      const updateData = {
        name,
        gameCategories,
        profilePicture: profilePictureUrl || 'https://via.placeholder.com/150' // URL par défaut si vide
      };
      
      await updateDoc(userRef, updateData);
      
      // Mettre à jour les données locales
      setUserData({
        ...userData,
        ...updateData
      });
      setEditMode(false);
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil: ' + err.message);
    }
  };

  const handleAddGame = async () => {
    try {
      // Créer un nouveau jeu
      const newGameRef = doc(collection(db, 'games'));
      await setDoc(newGameRef, {
        title: gameTitle,
        genre: gameGenre,
        addedBy: userId,
        addedAt: new Date()
      });
      
      // Ajouter l'ID du jeu à la liste des jeux de l'utilisateur
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        games: arrayUnion(newGameRef.id)
      });
      
      // Ajouter le jeu localement
      setUserGames([...userGames, {
        id: newGameRef.id,
        title: gameTitle,
        genre: gameGenre
      }]);
      
      // Réinitialiser le formulaire
      setGameTitle('');
      setGameGenre('');
      setAddGameMode(false);
    } catch (err) {
      setError('Erreur lors de l\'ajout du jeu: ' + err.message);
    }
  };

  const handleRemoveGame = async (gameId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        games: arrayRemove(gameId)
      });
      
      // Retirer le jeu localement
      setUserGames(userGames.filter(game => game.id !== gameId));
    } catch (err) {
      setError('Erreur lors de la suppression du jeu: ' + err.message);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!userData) return <div>Utilisateur non disponible</div>;

  return (
    <div className="profile-container">
      <h2>Profil de {userData.name}</h2>
      
      <div className="profile-header">
        <div className="profile-picture">
          {userData.profilePicture ? (
            <img src={userData.profilePicture} alt="Photo de profil" />
          ) : (
            <div className="default-profile-picture">
              {userData.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        {isOwner && !editMode && (
          <button onClick={() => setEditMode(true)}>
            Modifier le profil
          </button>
        )}
      </div>
      
      {editMode ? (
        <div className="edit-profile">
          <h3>Modifier le profil</h3>
          
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>URL de la photo de profil</label>
            <input
              type="url"
              value={profilePictureUrl}
              onChange={(e) => setProfilePictureUrl(e.target.value)}
              placeholder="https://exemple.com/image.jpg"
            />
            <small>Laissez vide pour utiliser l'image par défaut</small>
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
          
          <div className="action-buttons">
            <button onClick={handleUpdateProfile}>Enregistrer</button>
            <button onClick={() => setEditMode(false)}>Annuler</button>
          </div>
        </div>
      ) : (
        <div className="profile-info">
          <div className="info-item">
            <strong>Email:</strong> {userData.email}
          </div>
          
          <div className="info-item">
            <strong>Catégories préférées:</strong>
            <div className="categories-list">
              {userData.gameCategories && userData.gameCategories.length > 0 ? (
                userData.gameCategories.map(category => (
                  <span key={category} className="category-tag">
                    {category}
                  </span>
                ))
              ) : (
                <span>Aucune catégorie sélectionnée</span>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="games-section">
        <h3>Jeux possédés</h3>
        
        {isOwner && (
          <button onClick={() => setAddGameMode(!addGameMode)}>
            {addGameMode ? 'Annuler' : 'Ajouter un jeu'}
          </button>
        )}
        
        {addGameMode && (
          <div className="add-game-form">
            <div className="form-group">
              <label>Titre du jeu</label>
              <input
                type="text"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Genre</label>
              <select
                value={gameGenre}
                onChange={(e) => setGameGenre(e.target.value)}
              >
                <option value="">Sélectionner un genre</option>
                {gameGenres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            
            <button onClick={handleAddGame}>Ajouter</button>
          </div>
        )}
        
        <div className="games-list">
          {userGames.length > 0 ? (
            userGames.map(game => (
              <div key={game.id} className="game-item">
                <div className="game-info">
                  <h4>{game.title}</h4>
                  <p>{game.genre}</p>
                </div>
                
                {isOwner && (
                  <button
                    className="remove-game"
                    onClick={() => handleRemoveGame(game.id)}
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>Aucun jeu dans la collection</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
