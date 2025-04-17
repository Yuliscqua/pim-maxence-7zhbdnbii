import React, { useEffect, useState } from "react";
import {collection, getDocs} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from 'react-router-dom';

const GameList = () => {
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
            <h2>Jeux en recommendations</h2>
            <ul>
                {games.map(game => (
                    <li key={game.id}>
                        <Link to="../game_shop" state={{id: game.id, name: game.name}}>{game.name}</Link> - {game.price}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GameList;