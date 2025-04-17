import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const AddGame = () => {
    const [name, setName] = useState("");
    const [price,setPrice] = useState("");
    const [description, setDescription] = useState("");

    const handleAddGame = async () => {
        if (!name || !description) return alert("Champs requis non remplis !");
        await addDoc(collection(db, "games"), {
            name,
            price,
            description,
        })
        setName("");
        setPrice("");
        setDescription("");
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
            <br />
            <button onClick={handleAddGame}>Ajouter</button>
        </div>
    );
};

export default AddGame;