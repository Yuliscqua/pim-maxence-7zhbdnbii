import React, { useEffect, useState } from "react";
import {collection, getDocs} from "firebase/firestore";
import { db } from "../firebase";

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
                        <strong>{game.name}</strong> - {game.price}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GameList;