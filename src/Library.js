import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import Header from './components/Header.js'

function Library () {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [userGames, setUserGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!userData) return <div>Utilisateur non disponible</div>;
    return (
        <div className="library">
            <Header userId={userId}/>
            <h3>Jeux possédés</h3>
            <div className="games-list">
                {userGames.length > 0 ? (
                    userGames.map(game => (
                        <div key={game.id} className="game-item">
                            <div className="game-info">
                                <h4>{game.name}</h4>
                                <p>{game.genre}</p>
                            </div>
                        </div>
                    ))
                ) : (<p>Aucun jeu dans la collection</p>)}
            </div>
        </div>
    )
}

export default Library;