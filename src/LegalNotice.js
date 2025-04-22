import React from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import Header from './components/Header';

function LegalNotice() {
  const { userId } = useParams();

  return (
    <div className="legal-page">
      <Header userId={userId} />

      <div className="legal-content">
        <h2 className="legal-title">Mentions Légales</h2>
        
        <section className="legal-section">
          <h3 className="legal-subtitle">1. Informations sur la société</h3>
          
          <div className="legal-block">
            <p><strong>Éditeur du site :</strong> IndieLink SAS</p>
            <p><strong>Siège social :</strong> 55 rue des Pixels Libres, 75000 Paris, France</p>
            <p><strong>SIRET :</strong> 123 456 789 00012</p>
            <p><strong>Capital social :</strong> 10 000 €</p>
            <p><strong>Directeur de la publication :</strong> Alex Martin</p>
            <p><strong>Contact :</strong> legal@indielink.io</p>
          </div>
        </section>
        
        <section className="legal-section">
          <h3 className="legal-subtitle">2. Hébergement</h3>
          
          <div className="legal-block">
            <p><strong>Hébergeur :</strong> CloudPixels</p>
            <p><strong>Adresse :</strong> 42 Avenue du Cloud, 69000 Lyon, France</p>
            <p><strong>Contact :</strong> support@cloudpixels.com</p>
          </div>
        </section>
        
        <section className="legal-section">
          <h3 className="legal-subtitle">3. Propriété intellectuelle</h3>
          
          <div className="legal-block">
            <p>L'ensemble des éléments constituant le site IndieLink (textes, graphismes, logiciels, photographies, images, sons, plans, logos, marques, etc.) sont la propriété exclusive d'IndieLink SAS ou font l'objet d'une autorisation d'utilisation. Ces éléments sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.</p>
            <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable d'IndieLink SAS.</p>
            <p>Les marques et logos reproduits sur le site sont déposés par les sociétés qui en sont propriétaires.</p>
          </div>
        </section>
        
        <section className="legal-section">
          <h3 className="legal-subtitle">4. Données personnelles</h3>
          
          <div className="legal-block">
            <p>IndieLink SAS s'engage à respecter la confidentialité des données personnelles communiquées par les utilisateurs du site et à les traiter dans le respect du Règlement Général sur la Protection des Données (RGPD) et de la loi Informatique et Libertés.</p>
            <p>Les utilisateurs disposent d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles les concernant, qu'ils peuvent exercer en envoyant un courriel à privacy@indielink.io.</p>
            <p>Pour plus d'informations sur la façon dont nous traitons vos données, veuillez consulter notre Politique de Confidentialité accessible depuis le pied de page du site.</p>
          </div>
        </section>
        
        <section className="legal-section">
          <h3 className="legal-subtitle">5. Cookies</h3>
          
          <div className="legal-block">
            <p>Le site IndieLink utilise des cookies pour améliorer l'expérience utilisateur, assurer le bon fonctionnement du site, et collecter des statistiques de visite.</p>
            <p>Les utilisateurs peuvent configurer leur navigateur pour refuser les cookies. Cependant, certaines fonctionnalités du site pourraient ne plus être accessibles.</p>
          </div>
        </section>
        
        <section className="legal-section">
          <h3 className="legal-subtitle">6. Limitations de responsabilité</h3>
          
          <div className="legal-block">
            <p>IndieLink SAS ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site indielink.io.</p>
            <p>IndieLink SAS se réserve le droit de modifier le contenu du site à tout moment et sans préavis.</p>
            <p>IndieLink SAS ne saurait être tenue pour responsable des inexactitudes ou omissions présentes sur son site.</p>
            <p>IndieLink SAS décline toute responsabilité quant au contenu des sites auxquels les utilisateurs pourraient accéder via les liens hypertextes présents sur son site.</p>
          </div>
        </section>
        
        <section className="legal-section">
          <h3 className="legal-subtitle">7. Litiges</h3>
          
          <div className="legal-block">
            <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront compétents.</p>
          </div>
        </section>
        
        <section className="legal-section">
          <h3 className="legal-subtitle">8. Médiation</h3>
          
          <div className="legal-block">
            <p>Conformément aux dispositions du Code de la consommation concernant le règlement amiable des litiges, IndieLink SAS adhère au Service du Médiateur de la consommation de PixelRights. Après démarche préalable écrite des consommateurs vis-à-vis d'IndieLink SAS, le Service du Médiateur peut être saisi pour tout litige de consommation dont le règlement n'aurait pas abouti.</p>
            <p>Pour connaître les modalités de saisine du Médiateur, cliquer <span className="legal-link">ici</span>.</p>
          </div>
        </section>
        
        <div className="legal-update">
          <p>Dernière mise à jour : 15 avril 2025</p>
        </div>
      </div>
    </div>
  );
}

export default LegalNotice;