import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import SidebarMenu from './SidebarMenu';

function Header({ userId }) {
    const [showSidebar, setShowSidebar] = useState(false);
  
    const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };
  
    return (
        <div>
            <header className="header">
            <div className="header-content">
                <div className="hamburger-menu" onClick={toggleSidebar}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                </div>
                <div className="logo">INDIE<span className="link-text">LINK</span></div>
                <div className="header-icons">
                <div className="heart-icon">♡</div>
                <div className="profile-icon"></div>
                </div>
            </div>
            <Link to="/add_game" className="add-game-link">Ajouter un jeu</Link>
            </header>
    
            {showSidebar && <SidebarMenu userId={userId} onClose={toggleSidebar} />}
        </div>
    )
}

export default Header;