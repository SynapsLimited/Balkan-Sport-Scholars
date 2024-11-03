// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../css/navbar.css';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const navHeight = document.querySelector('.nav-wrapper').offsetHeight;
    setIsScrolled(scrollTop > navHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`page-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className={`nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="navbar">
          <Link to="/" onClick={handleMenuClose}>
            <img
              src="/assets/BSS Logo transparent 1.png"
              alt={t('altTexts.bssLogo')}
              className={isScrolled ? 'scrolled' : ''}
            />
          </Link>
          <div
            className={`menu-toggle ${isMobileMenuOpen ? 'is-active' : ''} ${
              isScrolled ? 'scrolled' : ''
            }`}
            id="mobile-menu"
            onClick={handleMenuToggle}
          >
            <span className={`bar ${isScrolled ? 'scrolled' : ''}`}></span>
            <span className={`bar ${isScrolled ? 'scrolled' : ''}`}></span>
            <span className={`bar ${isScrolled ? 'scrolled' : ''}`}></span>
          </div>
          <ul
            className={`nav no-search ${isMobileMenuOpen ? 'mobile-nav' : ''} ${
              isScrolled ? 'scrolled' : ''
            }`}
          >
            <li className="nav-item">
              <Link to="/" className={isScrolled ? 'scrolled' : ''} onClick={handleMenuClose}>
                {t('navbar.links.home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={isScrolled ? 'scrolled' : ''} onClick={handleMenuClose}>
                {t('navbar.links.about')}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                className={isScrolled ? 'scrolled' : ''}
                onClick={handleMenuClose}
              >
                {t('navbar.links.services')}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/transfers"
                className={isScrolled ? 'scrolled' : ''}
                onClick={handleMenuClose}
              >
                {t('navbar.links.transfers')}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/players"
                className={isScrolled ? 'scrolled' : ''}
                onClick={handleMenuClose}
              >
                {t('navbar.links.players')}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className={isScrolled ? 'scrolled' : ''} onClick={handleMenuClose}>
                {t('navbar.links.blog')}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className={isScrolled ? 'scrolled' : ''}
                onClick={handleMenuClose}
              >
                {t('navbar.links.contact')}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
