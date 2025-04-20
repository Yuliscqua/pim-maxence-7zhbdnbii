import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarMenu.css';

const SidebarMenu = ({ onClose }) => {
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

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar-menu" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <div className="sidebar-pseudo">
            <div className="pixel-avatar"></div>
            <span>Pseudo</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="sidebar-item">
                <Link to={item.path} onClick={onClose}>
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