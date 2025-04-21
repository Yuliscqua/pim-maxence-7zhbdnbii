import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDocs, updateDoc, arrayUnion, arrayRemove, collection, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import Header from './components/Header.js'

function TipsCreation () {
    const { userId } = useParams();
    const [tips, setTips] = useState([]);

    const fetchGames = async () => {
        const querySnapshot = await getDocs(collection(db, "tips"));
        const tipsArray = querySnapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data(),
        }));
        setTips(tipsArray);
    };

    useEffect(() => {
        fetchGames();
    }, []);
    
    return (
        <div className="tipscreation">
            <Header userId={userId} />
            <h4 className="beta-title">Tips / Création</h4>

            <div className="beta-search-bar">
                <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="search-input"
                />
                <div className="filter-icon">◀</div>
            </div>

            <h3 className="beta-subtitle">Maitrisez les moteurs de jeu</h3>
            <div className="category-cards">
                {tips.map(tip => (
                    <div className="category-card" key={tip.id}>
                        <img src={tip.image} />
                        <div className="category-name">{tip.name}</div>
                    </div>
                ))}
            </div>
            <h3 className="beta-subtitle">Communautés</h3>

            <div className="beta-communities-list">
            <div className='beta-community-item beta-community-red'>
                    <div className="legend">
                        <div>Apprendre à coder</div>
                        <div className="announcement-image ">
                            <img src="https://th.bing.com/th/id/OIP.02rSbybeuSCZH2tNpLhvUAHaEI?w=311&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"/>
                        </div>
                    </div>
                    <div className='infos'>
                        <div>592 membres</div>
                        <p>Ouverts aux débutants comme aux experts, utilisez cette communauté pour poser toutes vos questions sur le code dans le développement d’un jeu vidéo.</p>
                    </div>
                </div>
                <div className='beta-community-item beta-community-green '>
                    <div className="legend">
                        <div>Game Design</div>
                        <div className="announcement-image ">
                            <img src="https://th.bing.com/th/id/OIP.HMcLgC5AydATAqSr-kOEqwHaEK?rs=1&pid=ImgDetMain"/>
                        </div>
                    </div>
                    <div className='infos'>
                        <div>812 membres</div>
                        <p>Pour faire un bon jeu il faut savoir se mettre à la place du joueur, ce qui est difficile car chacun réfléchis différement, l’objectif de cette comunauté est de s’entraider afin de mieux comprendre la façon de penser des joueurs et comment les satisfaire.</p>
                    </div>
                </div>
                <div className='beta-community-item beta-community-violet'>
                    <div className="legend">
                        <div>Ecriture</div>
                        <div className="announcement-image ">
                            <img src="https://th.bing.com/th/id/OIP.NJSVbXDOnV5BKyTBL4Z9aQHaDt?w=288&h=175&c=7&r=0&o=5&dpr=1.3&pid=1.7tip"/>
                        </div>
                    </div>
                    <div className='infos'>
                        <div>412 membres</div>
                        <p>Lorsqu’on fait un jeu, le gameplay est souvent le plus important, mais en fonction de l’expérience que l’on cherche à procurer au joueur, le scénario peut l’etre tout autant. Cette communauté vise à aider les développeurs débutant à écrire des scénario impactants pour leurs jeux. </p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default TipsCreation;