import React, { useEffect, useState } from "react";
import {collection, getDocs} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from 'react-router-dom';

const GameList = ({userId}) => {
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
            <h2 className="beta-title">Jeux en recommendations</h2>
            <div className="beta-announcements-list">
                {games.map((game, index) => (
                    <Link to={`../game_shop/${userId}/${game.id}`} key={game.id} className="beta-announcement-item">
                        <h2 className="beta-title number">{index+1}</h2>
                        <img className="classement-image" src={game.logo} />
                        <div className="announcement-content">
                            <h4 className="announcement-title">{game.name}</h4>
                            <div 
                                className="details-button"
                            >
                            DÉTAILS
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default GameList;