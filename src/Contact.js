import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import Header from './components/Header';

function Contact() {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'technical',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message envoyé !');
    setFormData({
      name: '',
      email: '',
      subject: 'technical',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <Header userId={userId} />

      <main className="contact-main">
        <section className="contact-intro">
          <h2>Une question ? Une idée ?</h2>
          <h2>On vous écoute !</h2>
          
          <div className="loading-circle"></div>
          
          <p>
            Chez IndieLink, on est une petite équipe 
            passionnée à l'écoute de notre communauté.
            Que vous soyez un joueur curieux, un vendeur,
            un développeur indé, ou juste un amoureux du
            pixel, contactez-nous !
          </p>
        </section>
        
        <section className="contact-form-section">
          <h3>Formulaire de contact</h3>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-field">
              <label htmlFor="name">Nom :</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="email">Adresse email :</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-field">
              <label>Sujet :</label>
              <div className="radio-options">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="subject" 
                    value="technical"
                    checked={formData.subject === 'technical'}
                    onChange={handleChange}
                  />
                  Problème technique
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="subject" 
                    value="suggestion"
                    checked={formData.subject === 'suggestion'}
                    onChange={handleChange}
                  />
                  Suggestion / Idée d'amélioration
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="subject" 
                    value="partnership"
                    checked={formData.subject === 'partnership'}
                    onChange={handleChange}
                  />
                  Partenariat / Presse
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="subject" 
                    value="other"
                    checked={formData.subject === 'other'}
                    onChange={handleChange}
                  />
                  Autre
                </label>
              </div>
            </div>
            
            <div className="form-field">
              <label htmlFor="message">Message :</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="[---]"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Envoyer</button>
          </form>
        </section>
        
        <section className="direct-contact">
          <h3>Contact direct</h3>
          <ul>
            <li>• Email général : contact@indielink.io</li>
            <li>• Support utilisateur : support@indielink.io</li>
            <li>• Partenariats & presse : hello@indielink.io</li>
          </ul>
        </section>
        
        <section className="location">
          <h3>Où nous trouver ?</h3>
          <div className="address">
            <p>IndieLink</p>
            <p>55 rue des Pixels Libres</p>
            <p>75000 Paris - France</p>
            <p>(Visite uniquement sur rendez-vous)</p>
          </div>
          
          <div className="social">
            <h4>Suivez & soutenez-nous</h4>
            <ul>
              <li>• Instagram</li>
              <li>• Twitter/X</li>
              <li>• Discord communautaire</li>
              <li>• [Itch.io / Steam page (à venir)]</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Contact;