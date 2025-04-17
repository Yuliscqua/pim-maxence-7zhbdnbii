import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

import { useLocation } from 'react-router-dom';

function GameShop () {
    const location = useLocation();
    const {id,name} = location.state;

    return (
        <div>
            New Shop Open ! {name} {id}
        </div>
    )
}

export default GameShop;