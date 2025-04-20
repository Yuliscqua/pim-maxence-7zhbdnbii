import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './firebase';
import Header from './components/Header';
import './style.css';

const GameShop = () => {
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dateData, setDateData] = useState(null);
    const [purchasing, setPurchasing] = useState(false);
    
    // Pour la redirection
    const navigate = useNavigate();
    
    // Récupérer l'ID depuis les paramètres d'URL
    const { userId, gameId } = useParams();

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
                    const gameData = docSnap.data();
                    console.log("Jeu trouvé:", gameData);
                    
                    setGame({
                        id: docSnap.id,
                        ...gameData
                    });
                    
                    // Vérifiez si la date existe
                    if (gameData.addedat) {
                        if (gameData.addedat.toDate) {
                            const date = gameData.addedat.toDate();
                            setDateData(date);
                        } else if (typeof gameData.addedat === 'string') {
                            const date = new Date(gameData.addedat);
                            setDateData(date);
                        }
                    }
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

    // Fonction pour gérer l'achat du jeu
    const handlePurchase = async () => {
        if (!userId) {
            setError("Vous devez être connecté pour acheter un jeu");
            return;
        }
        
        try {
            setPurchasing(true);
            
            // Récupérer les données utilisateur pour vérifier s'il possède déjà le jeu
            const userRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userRef);
            
            if (!userSnap.exists()) {
                setError("Utilisateur non trouvé");
                return;
            }
            
            const userData = userSnap.data();
            const userGames = userData.games || [];
            
            // Vérifier si l'utilisateur possède déjà le jeu
            if (userGames.includes(gameId)) {
                setError("Vous possédez déjà ce jeu");
                setPurchasing(false);
                return;
            }
            
            // Ajouter l'ID du jeu aux jeux de l'utilisateur
            await updateDoc(userRef, {
                games: arrayUnion(gameId)
            });
            
            console.log("Jeu ajouté avec succès à la collection de l'utilisateur");
            
            // Rediriger vers la page principale
            navigate(`/shop/${userId}`);
            
        } catch (err) {
            console.error("Erreur lors de l'achat:", err);
            setError("Une erreur est survenue lors de l'achat du jeu");
            setPurchasing(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        
        return date.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!game) return <div>Aucun jeu trouvé pour l'ID: {gameId}</div>;

    return (
        <div className="game-detail">
            <Header userId={userId}/>
            {game.banner && <img src={game.banner} alt={game.name} className="game-banner" />}
            <h2>{game.name}</h2>
            <div className="game-info">
                {game.addedat && <p>Lancé le : {dateData ? formatDate(dateData) : 'Date non disponible'}</p>}
                {game.price && <p>Prix: {game.price} €</p>}
                {game.description && <p>Description: {game.description}</p>}
                {game.genre && <p>Catégorie : {game.genre}</p>}
                
                {/* Bouton d'achat */}
                <button 
                    className="purchase-button"
                    onClick={handlePurchase}
                    disabled={purchasing}
                >
                    {purchasing ? 'Achat en cours...' : 'Acheter ce jeu'}
                </button>
            </div>
        </div>
    );
};

export default GameShop;