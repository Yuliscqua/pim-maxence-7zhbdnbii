import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import '../style.css';

const Noter = ({ gameId, userId }) => {
    const [isRecommended, setIsRecommended] = useState(null);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const [userName, setUserName] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Charger les avis existants et les informations de l'utilisateur
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupérer les avis du jeu
                const gameRef = doc(db, 'games', gameId);
                const gameSnap = await getDoc(gameRef);
                
                if (gameSnap.exists()) {
                    const gameData = gameSnap.data();
                    setReviews(gameData.reviews || []);
                }

                // Récupérer le nom de l'utilisateur courant
                if (userId) {
                    const userRef = doc(db, 'users', userId);
                    const userSnap = await getDoc(userRef);
                    
                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        setUserName(userData.name || userData.displayName || userData.email || 'Utilisateur anonyme');
                    }
                }
            } catch (err) {
                console.error("Erreur lors du chargement des données:", err);
                setError("Impossible de charger les avis");
            }
        };

        fetchData();
    }, [gameId, userId]);

    // Soumettre un nouvel avis
    const handleSubmitReview = async () => {
        if (isRecommended === null) {
            setError("Veuillez indiquer si vous recommandez ce jeu");
            return;
        }

        if (!review.trim()) {
            setError("Veuillez saisir un avis");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const newReview = {
                userId,
                userName,
                text: review,
                recommended: isRecommended,
                date: new Date()
            };

            // Mettre à jour le document du jeu avec le nouvel avis
            const gameRef = doc(db, 'games', gameId);
            await updateDoc(gameRef, {
                reviews: arrayUnion(newReview)
            });

            // Mettre à jour l'état local
            setReviews([...reviews, newReview]);
            setReview('');
            setIsRecommended(null);
            
        } catch (err) {
            console.error("Erreur lors de la soumission de l'avis:", err);
            setError("Impossible de soumettre votre avis");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="game-reviews">
            <h3>Avis des joueurs</h3>
            {reviews.length === 0 ? (
                <p>Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>
            ) : (
                <div className="reviews-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <div className="review-header">
                                <strong>{review.userName}</strong>
                                <span className={`recommendation-badge ${review.recommended ? 'recommended' : 'not-recommended'}`}>
                                    {review.recommended ? 'Recommandé' : 'Non recommandé'}
                                </span>
                                {review.date && (
                                    <span className="review-date">
                                        {new Date(review.date.seconds ? review.date.toDate() : review.date).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                            <p className="review-text">{review.text}</p>
                        </div>
                    ))}
                </div>
            )}
            
            <h3>Donnez votre avis</h3>
            {error && <div className="error-message">{error}</div>}
            
            <div className="recommendation-buttons">
                <button 
                    className={`recommend-button ${isRecommended === true ? 'active' : ''}`}
                    style={{ backgroundColor: isRecommended === true ? '#3498db' : '#f0f0f0', color: isRecommended === true ? 'white' : 'black' }}
                    onClick={() => setIsRecommended(true)}
                >
                    Je recommande ce jeu
                </button>
                <button 
                    className={`not-recommend-button ${isRecommended === false ? 'active' : ''}`}
                    style={{ backgroundColor: isRecommended === false ? '#e74c3c' : '#f0f0f0', color: isRecommended === false ? 'white' : 'black' }}
                    onClick={() => setIsRecommended(false)}
                >
                    Je ne recommande pas
                </button>
            </div>
            
            <div className="review-input">
                <textarea 
                    placeholder="Partagez votre expérience avec ce jeu..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                />
                <button 
                    className="submit-review" 
                    onClick={handleSubmitReview}
                    disabled={submitting}
                >
                    {submitting ? 'Envoi en cours...' : 'Publier mon avis'}
                </button>
            </div>
        </div>
    );
};

export default Noter;