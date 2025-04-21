import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDocs, updateDoc, arrayUnion, arrayRemove, collection, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import Header from './components/Header.js'

function Beta () {
    const { userId } = useParams();
    const [games, setGames] = useState([]);

    const fetchGames = async () => {
        const querySnapshot = await getDocs(collection(db, "games"));
        const gamesArray = querySnapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data(),
        }));
        setGames(gamesArray);
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div>
            <Header userId={userId}/>
            <h2>Venez tester de nouveaux jeux !</h2>
            <div className="games-list">
                {games.map(game => {
                    if (game.status === 'beta'){
                        return (
                            <Link to={`../game_shop/${userId}/${game.id}`} className="game-item" key={game.id}>
                                <img  className="game-image" src={game.logo} />
                                <div className="game-info">
                                    <h4>{game.name}</h4>
                                    <p>{game.genre}</p>
                                </div>
                            </Link>
                        )
                    }
                }
                )}
            </div>
        </div>
    )
}

export default Beta;