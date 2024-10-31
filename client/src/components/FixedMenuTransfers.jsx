import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './../css/fixedmenu.css';
import { UserContext } from '../context/userContext';

const FixedMenuTransfers = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser } = useContext(UserContext);
    const menuRef = useRef(null);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!currentUser) {
        return null; // If there is no logged-in user, do not render the menu
    }

    return (
        <div className="fixed-menu fixed-menu-transfers" ref={menuRef} style={{ right: '70px' }}>
            <div
                className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`}
                onClick={handleMenuToggle}
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className={`menu-content ${isMenuOpen ? 'show' : ''}`}>
                <li className="welcome-user"><b>Transfers</b></li>
                <li><Link to="/transfers/dashboard">Dashboard</Link></li>
                <li><Link to="/transfers/create">Create Transfer</Link></li>
            </ul>
        </div>
    );
};

export default FixedMenuTransfers;
