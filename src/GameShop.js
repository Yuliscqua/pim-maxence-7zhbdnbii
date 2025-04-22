import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from './firebase';
import Header from './components/Header';
import './style.css';

const GameShop = () => {
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [newReview, setNewReview] = useState('');
    const [isRecommended, setIsRecommended] = useState(null);
    const [submittingReview, setSubmittingReview] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [creatorName, setCreatorName] = useState('');
    
    // Pour la redirection
    const navigate = useNavigate();
    
    // Récupérer l'ID depuis les paramètres d'URL
    const { userId, gameId } = useParams();

    useEffect(() => {
        // Fonction pour récupérer les infos du jeu
        const fetchGameById = async () => {
            try {
                setLoading(true);
                
                if (!gameId) {
                    setError("ID de jeu non fourni");
                    return;
                }
                
                // Récupérer les données du jeu
                const docRef = doc(db, "games", gameId);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const gameData = docSnap.data();
                    
                    setGame({
                        id: docSnap.id,
                        ...gameData
                    });
                    
                    // Récupérer le nom du créateur si l'ID est disponible
                    if (gameData.creator) {
                        try {
                            const creatorRef = doc(db, "users", gameData.creator);
                            const creatorSnap = await getDoc(creatorRef);
                            
                            if (creatorSnap.exists()) {
                                const creatorData = creatorSnap.data();
                                setCreatorName(creatorData.name || "Développeur IndieLink");
                            } else {
                                setCreatorName("Développeur IndieLink");
                            }
                        } catch (err) {
                            console.error("Erreur lors de la récupération du créateur:", err);
                            setCreatorName("Développeur IndieLink");
                        }
                    } else {
                        setCreatorName("Studio IndieLink");
                    }
                    
                    // Récupérer les avis pour ce jeu
                    if (gameData.reviews && gameData.reviews.length > 0) {
                        setReviews(gameData.reviews);
                    } else {
                        // Avis par défaut si aucun n'existe
                        setReviews([
                            {
                                userId: 'user1',
                                userName: "Retsuno",
                                text: "Jeu à couper le souffle. À faire sans avoir été spolier c'est ma découverte de l'année.",
                                recommended: true,
                                date: new Date()
                            },
                            {
                                userId: 'user2',
                                userName: "Ohamaiow",
                                text: "J'ai commencé à jouer à ce JEU qui se savait que le magnifique titre que c'est. J'ai pu l'écumer à fond et je peux vous dire que je ne trouve aucun défaut à ce jeu.",
                                recommended: true,
                                date: new Date()
                            }
                        ]);
                    }
                    
                    // Vérifier si l'utilisateur a mis ce jeu en favori
                    if (userId) {
                        const userRef = doc(db, 'users', userId);
                        const userSnap = await getDoc(userRef);
                        
                        if (userSnap.exists()) {
                            const userData = userSnap.data();
                            setUserInfo({
                                name: userData.name || 'Utilisateur',
                                profilePicture: userData.profilePicture || ''
                            });
                            
                            // Vérifier si le jeu est en favori
                            if (userData.favorites && userData.favorites.includes(gameId)) {
                                setIsFavorite(true);
                            }
                        }
                    }
                    
                } else {
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
    }, [gameId, userId]);

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
            
            // Rediriger vers la page principale
            navigate(`/shop/${userId}`);
            
        } catch (err) {
            console.error("Erreur lors de l'achat:", err);
            setError("Une erreur est survenue lors de l'achat du jeu");
            setPurchasing(false);
        }
    };

    // Toggle favori
    const toggleFavorite = async () => {
        if (!userId) {
            setError("Vous devez être connecté pour ajouter aux favoris");
            return;
        }
        
        try {
            const userRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userRef);
            
            if (!userSnap.exists()) {
                setError("Utilisateur non trouvé");
                return;
            }
            
            const userData = userSnap.data();
            const favorites = userData.favorites || [];
            
            if (favorites.includes(gameId)) {
                // Retirer des favoris
                await updateDoc(userRef, {
                    favorites: favorites.filter(id => id !== gameId)
                });
                setIsFavorite(false);
            } else {
                // Ajouter aux favoris
                await updateDoc(userRef, {
                    favorites: [...favorites, gameId]
                });
                setIsFavorite(true);
            }
            
        } catch (err) {
            console.error("Erreur lors de la gestion des favoris:", err);
            setError("Une erreur est survenue");
        }
    };
    
    // Soumettre un avis
    const handleSubmitReview = async () => {
        if (!userId) {
            setError("Vous devez être connecté pour publier un avis");
            return;
        }
        
        if (isRecommended === null) {
            setError("Veuillez indiquer si vous recommandez ce jeu");
            return;
        }
        
        if (!newReview.trim()) {
            setError("Veuillez saisir un avis");
            return;
        }
        
        try {
            setSubmittingReview(true);
            
            const review = {
                userId,
                userName: userInfo.name,
                text: newReview,
                recommended: isRecommended,
                date: new Date()
            };
            
            // Mettre à jour le document du jeu
            const gameRef = doc(db, 'games', gameId);
            
            // Récupérer les avis existants
            const gameSnap = await getDoc(gameRef);
            let currentReviews = gameSnap.exists() && gameSnap.data().reviews ? 
                                gameSnap.data().reviews : [];
            
            // Ajouter le nouvel avis en haut de la liste
            const updatedReviews = [review, ...currentReviews];
            
            await updateDoc(gameRef, {
                reviews: updatedReviews
            });
            
            // Mettre à jour l'affichage
            setReviews(updatedReviews);
            setNewReview('');
            setIsRecommended(null);
            
        } catch (err) {
            console.error("Erreur lors de la soumission de l'avis:", err);
            setError("Une erreur est survenue lors de la publication de l'avis");
        } finally {
            setSubmittingReview(false);
        }
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

    // Si le jeu est Omori spécifiquement, on affiche OMOCAT comme créateur
    const displayCreator = game.name?.toLowerCase() === 'omori' ? 'OMOCAT, LLC' : creatorName;

    return (
        <div className="game-detail-omori">
            <Header userId={userId}/>
            
            {/* Bannière du jeu avec capture d'écran */}
            <div className="game-banner-full">
                {game.banner ? (
                    <img src={game.banner} alt={game.name} className="game-banner-img" />
                ) : (
                    <div className="game-banner-placeholder">
                        <div className="game-banner-text">{game.name}</div>
                    </div>
                )}
            </div>
            
            {/* Titre et information du jeu */}
            <div className="game-header-info">
                <h1 className="game-title">{game.name}</h1>
                <p className="game-developer">Par : {displayCreator}</p>
                {game.addedat && (
                    <p className="game-release-date">
                        {new Date(game.addedat.seconds ? game.addedat.toDate() : game.addedat).toLocaleDateString()}
                    </p>
                )}
                
                <div className="game-categories">
                    <span className="category-tag">{game.genre || "Jeu indépendant"}</span>
                </div>
                
                <p className="game-rating">
                    {game.positiveRating || "91"}% d'évaluation positives
                </p>
            </div>
            
            {/* Avis des joueurs */}
            {reviews.length > 0 && (
                <div className="game-reviews-highlight">
                    {reviews.slice(0, 2).map((review, index) => (
                        <div key={index} className="review-card">
                            <div className="review-header">
                                <span className="reviewer-avatar">
                                    {review.recommended ? "👍" : "👎"}
                                </span>
                                <span className="reviewer-name">{review.userName}</span>
                            </div>
                            <div className="review-content">
                                <p className="review-text">"{review.text}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Images du jeu */}
            <div className="game-images">
                <div className="game-image-row">
                    <div className="game-image-box">
                        {game.logo ? (
                            <img src={game.logo} alt={`${game.name} Logo`} className="game-logo-img" />
                        ) : (
                            <img src="https://via.placeholder.com/200x200/333/fff?text=Logo" alt="Logo du jeu" className="game-logo-img" />
                        )}
                    </div>
                    <div className="game-image-box">
                        <img src={game.coverImage || "https://via.placeholder.com/200x200/333/fff?text=Cover"} alt="Couverture du jeu" className="game-cover-img" />
                    </div>
                </div>
            </div>
            
            {/* Description */}
            <div className="game-description-section">
                <h2 className="section-title">DESCRIPTION</h2>
                <p className="game-description">
                    {game.description || "Explorez un monde étrange, peuplé d'amis et d'ennemis hauts en couleur. Le moment venu, le chemin que vous aurez choisi déterminera votre destin... et peut-être celui des autres."}
                </p>
                
                {/* Bouton d'achat et favori */}
                <div className="game-action-buttons">
                    <button 
                        className="purchase-button"
                        onClick={handlePurchase}
                        disabled={purchasing}
                    >
                        {purchasing ? 'ACHAT EN COURS...' : 'ACHETER'}
                    </button>
                    
                    <button 
                        className={`favorite-button ${isFavorite ? 'active' : ''}`}
                        onClick={toggleFavorite}
                    >
                        {isFavorite ? '❤️' : '♡'}
                    </button>
                </div>
            </div>
            
            {/* Making-of et assets */}
            <div className="game-extras-section">
                <div className="game-making-of">
                    <h2 className="section-title">Découvrez le Making of du Jeu !</h2>
                    
                    <div className="making-of-videos">
                        <div className="video-item">
                            <div className="video-thumbnail">
                                <div className="play-button">▶</div>
                            </div>
                            <div className="video-info">
                                <span>Développement</span>
                            </div>
                        </div>
                        
                        <div className="video-item">
                            <div className="video-thumbnail">
                                <div className="play-button">▶</div>
                            </div>
                            <div className="video-info">
                                <span>Financement</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="game-assets">
                        <h3 className="assets-title">Télécharger les assets</h3>
                        
                        <ul className="assets-list">
                            <li className="asset-item">
                                <span>Sprites / Animations</span>
                                <span className="download-icon">↓</span>
                            </li>
                            <li className="asset-item">
                                <span>Sons / Musiques</span>
                                <span className="download-icon">↓</span>
                            </li>
                            <li className="asset-item">
                                <span>Images</span>
                                <span className="download-icon">↓</span>
                            </li>
                            <li className="asset-item">
                                <span>Moteur de jeu</span>
                                <span className="download-icon">↓</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Section pour ajouter un avis */}
            <div className="game-review-section">
                <h2 className="section-title">Donnez votre avis</h2>
                
                <div className="review-recommendation">
                    <button 
                        className={`recommend-button ${isRecommended === true ? 'active' : ''}`}
                        onClick={() => setIsRecommended(true)}
                    >
                        Je recommande ce jeu 👍
                    </button>
                    <button 
                        className={`not-recommend-button ${isRecommended === false ? 'active' : ''}`}
                        onClick={() => setIsRecommended(false)}
                    >
                        Je ne recommande pas 👎
                    </button>
                </div>
                
                <div className="review-input-area">
                    <textarea 
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Partagez votre expérience avec ce jeu..."
                        rows={4}
                    />
                    
                    <button 
                        className="submit-review-button"
                        onClick={handleSubmitReview}
                        disabled={submittingReview}
                    >
                        {submittingReview ? 'Publication...' : 'Publier mon avis'}
                    </button>
                </div>
                
                {error && <p className="review-error">{error}</p>}
            </div>
            
            {/* Avis de la communauté */}
            <div className="game-community-section">
                <h2 className="section-title">Avis de la communauté</h2>
                
                <div className="community-reviews">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className={`community-review ${review.recommended ? 'positive' : 'negative'}`}>
                                <div className="review-header">
                                    <span className="reviewer-name">{review.userName}</span>
                                    <span className="review-recommendation">
                                        {review.recommended ? '👍 Recommandé' : '👎 Non recommandé'}
                                    </span>
                                </div>
                                <p className="review-text">"{review.text}"</p>
                                {review.date && (
                                    <span className="review-date">
                                        {new Date(review.date.seconds ? review.date.toDate() : review.date).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="no-reviews">Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameShop;