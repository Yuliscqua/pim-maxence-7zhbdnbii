import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const AddGame = ({ userId }) => {
    const [name, setName] = useState("");
    const [price,setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");
    const [banner, setBanner] = useState("");
    const [gameGenre, setGameGenre] = useState('');
    const [status, setStatus] = useState('');

    const gameGenres = [
        'Action', 'Aventure', 'RPG', 'FPS', 'Sport', 
        'Stratégie', 'Simulation', 'Puzzle', 'Course'
    ];

    const handleAddGame = async () => {
        if (!name || !description || !price || !status || !gameGenre) return alert("Champs requis non remplis !");
        await addDoc(collection(db, "games"), {
            name,
            price,
            description,
            creator: userId,
            genre: gameGenre,
            addedat: new Date(),
            status,
            banner,
            logo,
        })
        setName("");
        setPrice("");
        setDescription("");
        setLogo("");
        setBanner("");
        alert("Nouveau Jeu mis en ligne !");
    };

    return (
        <div>
            <h2>Ajouter un jeu</h2>
            <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <textarea
                placholder="Description du jeu"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input 
                type="number"
                placeholder="Prix"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <select
                value={gameGenre}
                onChange={(e) => setGameGenre(e.target.value)}
            >
                <option value="">Sélectionner un genre</option>
                {gameGenres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
            </select>
               <div>
                    <input onChange={(e) => setStatus(e.target.value)} type="radio" id="beta" name="status" value="beta" />
                    <label for="beta">Beta</label>
                </div> 
                <div>
                    <input onChange={(e) => setStatus(e.target.value)} type="radio" id="finished" name="status" value="launched" />
                    <label for="finished">Lancement</label>
                </div>
            <input 
                type="url"
                placeholder="Lien du logo de votre jeu"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
            />
            <input 
                type="url"
                placeholder="Lien de la bannière de votre jeu"
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
            />
            <br />
            <button onClick={handleAddGame}>Ajouter</button>
        </div>
    );
};

export default AddGame;