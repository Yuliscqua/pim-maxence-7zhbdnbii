import React from 'react'
import './style.css'
import Header from './components/Header'
import { useParams } from 'react-router-dom';

function Contact () {
    const { userId } = useParams();
    return (
        <div className="contact">
            <Header userId={userId}/>
            <h2>Une question ? une idée ? On vous écoute !</h2>
            <p>Chez IndieLink, on est une petite équipe passionnée à l’écoute de notre communauté. Que vous soyez un joueur curieux, un vendeur, un développeur indé, ou juste un amoureux du pixel : contactez-nous !</p>
            <div className='form'>
                Formulaire de contact 
            </div>
        </div>
        
    )
}

export default Contact;