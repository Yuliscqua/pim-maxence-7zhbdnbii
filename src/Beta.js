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
            <ul>
                {games.map(game => {
                    if (game.status === 'beta'){
                        return (
                            <li key={game.id}>
                                <img  src={game.logo} />
                                <Link to={`../game_shop/${userId}/${game.id}`}>{game.name}</Link> - {game.genre}
                            </li>
                        )
                    }
                }
                )}
            </ul>
        </div>
    )
}

export default Beta;