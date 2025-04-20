import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc} from 'firebase/firestore';
import { db } from '../firebase';
import './SidebarMenu.css';

const SidebarMenu = ({ userId, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const menuItems = [
    { name: 'BIBLIOTHÈQUE', path: '/bibliotheque' },
    { name: 'COMMUNAUTÉ', path: '/communaute' },
    { name: 'TIPS/CRÉATION', path: '/tips-creation' },
    { name: 'VERSIONS BETA', path: '/versions-beta' },
    { name: 'CLASSEMENT', path: '/classement' },
    { name: 'ÉVÉNEMENTS', path: '/evenements' },
    { name: 'CONTACT', path: '/contact' },
    { name: 'À PROPOS', path: '/a-propos' },
    { name: 'MENTIONS LÉGALES', path: '/mentions-legales' }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
        } else {
          setError('Utilisateur non trouvé');
        }
      } catch (err) {
        setError('Erreur lors du chargement des données: ' + err.message);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      setError('ID utilisateur manquant');
    }
    
    fetchUserData();
    }, [userId]);

  console.log("userId reçu:", userId, "type:", typeof userId);

  if (error) return <div className="error">{error}</div>;
  if (!userData) return <div>Chargement...</div>;

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar-menu" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <div className="sidebar-pseudo">
            <div className="pixel-avatar">
              {userData.profilePicture ? (
                <img src={userData.profilePicture} alt="Photo de profil" />
              ) : (
                <div className="default-profile-picture">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <Link to={`/profile/${userId}`}>{userData.name}</Link>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="sidebar-item">
                <Link to={`${item.path}/${userId}`} onClick={onClose}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarMenu;