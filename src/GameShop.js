import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom'; // Remplacez useLocation par useParams
import { db } from './firebase';
import Header from './components/Header';
import './style.css';

const GameShop = () => {
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Récupérer l'ID depuis les paramètres d'URL
    const { gameId } = useParams();

    useEffect(() => {
        const fetchGameById = async () => {
            try {
                setLoading(true);
                console.log("Tentative de chargement du jeu avec ID:", gameId);
                
                if (!gameId) {
                    setError("ID de jeu non fourni");
                    return;
                }
                
                const docRef = doc(db, "games", gameId);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    console.log("Jeu trouvé:", docSnap.data());
                    setGame({
                        id: docSnap.id,
                        ...docSnap.data()
                    });
                } else {
                    console.log("Aucun jeu trouvé avec l'ID:", gameId);
                    setError("Aucun jeu trouvé avec cet identifiant.");
                }
                
            } catch (err) {
                console.error("Erreur lors de la récupération du jeu:", err);
                setError("Impossible de charger les détails du jeu.");
            } finally {
                setLoading(false);
            }
        };

        fetchGameById();
    }, [gameId]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!game) return <div>Aucun jeu trouvé pour l'ID: {gameId}</div>;

    return (
        <div className="game-detail">
            <Header />
            <h2>{game.name}</h2>
            <div className="game-info">
                {game.price && <p>Prix: {game.price}</p>}
                {game.description && <p>Description: {game.description}</p>}
            </div>
        </div>
    );
};

export default GameShop;