import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDocs, updateDoc, arrayUnion, arrayRemove, collection, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import Header from './components/Header.js'
import SearchBar from './components/SearchBar.js'

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

            <SearchBar />

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
                <div class="custom-image-fraise"></div>
                <div class="custom-image-lookup"></div>
                <div className='beta-community-item beta-community-red'>
                    <div className="legend">
                        <div>Apprendre à coder</div>
                        <div className="announcement-image ">
                            <img src="https://th.bing.com/th/id/OIP.02rSbybeuSCZH2tNpLhvUAHaEI?w=311&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"/>
                        </div>
                    </div>
                    <div className='infos'>
                        <div>592 membres</div>
                        <p>Venez apprendre ! Ouverts aux débutants comme aux experts !</p>
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
                        <p>Apprenez comment satisfaire les attentes de vos joueurs !</p>
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
                        <p>Rejoignez notre groupe pour obtenir des conseils pour raconter une histoire </p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default TipsCreation;