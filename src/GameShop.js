import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './firebase';
import Header from './components/Header';
import Noter from './components/Noter';
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

    // Fonction pour générer un placeholder de couleur si aucune image n'est disponible
    const getColorPlaceholder = (name) => {
        if (!name) return '#333'; // Couleur par défaut
        const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
        const hue = hash % 360;
        return `hsl(${hue}, 70%, 30%)`;
    };

    if (loading) return (
        <div className="loading-container">
            <Header userId={userId}/>
            <div className="loading-spinner">Chargement...</div>
        </div>
    );
    
    if (error) return (
        <div className="error-container">
            <Header userId={userId}/>
            <div className="error-message">{error}</div>
        </div>
    );
    
    if (!game) return (
        <div className="not-found-container">
            <Header userId={userId}/>
            <div className="not-found-message">Aucun jeu trouvé pour l'ID: {gameId}</div>
        </div>
    );

    return (
        <div className="game-detail-page">
            <Header userId={userId}/>
            
            <div className="game-detail-content">
                {/* Bannière du jeu */}
                <div className="game-banner-container">
                    {game.banner ? (
                        <img src={game.banner} alt={game.name} className="game-banner" />
                    ) : (
                        <div 
                            className="game-banner-placeholder" 
                            style={{ 
                                backgroundColor: getColorPlaceholder(game.name),
                                height: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '24px'
                            }}
                        >
                            {game.name}
                        </div>
                    )}
                </div>
                
                {/* Informations principales du jeu */}
                <div className="game-main-info">
                    <div className="game-header">
                        <h2 className="game-title">{game.name}</h2>
                        {game.logo && (
                            <div className="game-logo">
                                <img src={game.logo} alt={`Logo ${game.name}`} />
                            </div>
                        )}
                    </div>
                    
                    <div className="game-metadata">
                        {game.addedat && (
                            <span className="game-date">
                                Publié le: {new Date(game.addedat.seconds ? game.addedat.toDate() : game.addedat).toLocaleDateString()}
                            </span>
                        )}
                        {game.genre && <span className="game-genre">Catégorie: {game.genre}</span>}
                        {game.status && <span className="game-status">Statut: {game.status === 'beta' ? 'Version Beta' : 'Lancé'}</span>}
                    </div>
                </div>
                
                {/* Description et prix */}
                <div className="game-details">
                    <div className="game-description">
                        <h3>Description</h3>
                        <p>{game.description || "Aucune description disponible pour ce jeu."}</p>
                    </div>
                    
                    <div className="game-purchase-info">
                        {game.price && <div className="game-price">{game.price} €</div>}
                        
                        <button 
                            className="purchase-button"
                            onClick={handlePurchase}
                            disabled={purchasing}
                        >
                            {purchasing ? 'Achat en cours...' : 'Acheter ce jeu'}
                        </button>
                    </div>
                </div>
                
                {/* Composant d'avis */}
                <div className="game-reviews-section">
                    <Noter gameId={gameId} userId={userId} />
                </div>
            </div>
        </div>
    );
};

export default GameShop;