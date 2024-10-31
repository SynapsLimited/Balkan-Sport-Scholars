import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './../css/navbar.css';

const Navbar = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const navHeight = document.querySelector('.nav-wrapper').offsetHeight;
    setIsScrolled(scrollTop > navHeight);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);

    // Scroll to the top of the page when a nav link is clicked
    window.scrollTo({
      top: 0,
      behavior: 'auto' // This provides a smooth scrolling effect
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`page-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className={`nav-wrapper ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-active' : ''}`}>
        <nav className="navbar">
          <Link to="/">
            <img src="/assets/BSS Logo transparent 1.png" alt="Company Logo" className={isScrolled ? 'scrolled' : ''} />
          </Link>
          <div
            className={`menu-toggle ${isMobileMenuOpen ? 'is-active' : ''} ${isMobileMenuOpen ? 'menu-active' : ''} ${isScrolled ? 'scrolled' : ''}`}
            id="mobile-menu"
            onClick={handleMenuToggle}
          >
            <span className={`bar ${isMobileMenuOpen ? 'is-active' : ''} ${isMobileMenuOpen ? 'menu-active' : ''} ${isScrolled ? 'scrolled' : ''}`}></span>
            <span className={`bar ${isMobileMenuOpen ? 'is-active' : ''} ${isMobileMenuOpen ? 'menu-active' : ''} ${isScrolled ? 'scrolled' : ''}`}></span>
            <span className={`bar ${isMobileMenuOpen ? 'is-active' : ''} ${isMobileMenuOpen ? 'menu-active' : ''} ${isScrolled ? 'scrolled' : ''}`}></span>
          </div>
          <ul className={`nav no-search ${isMobileMenuOpen ? 'mobile-nav' : ''} ${isScrolled ? 'scrolled' : ''}`}>
            <li className="nav-item">
              <Link to="/" className={isScrolled ? 'scrolled' : ''} onClick={handleNavLinkClick}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={isScrolled ? 'scrolled' : ''} onClick={handleNavLinkClick}>About</Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className={isScrolled ? 'scrolled' : ''} onClick={handleNavLinkClick}>Services</Link>
            </li>
            <li className="nav-item">
              <Link to="/transfers" className={isScrolled ? 'scrolled' : ''} onClick={handleNavLinkClick}>Transfers</Link>
            </li>
            <li className="nav-item">
              <Link to="/players" className={isScrolled ? 'scrolled' : ''} onClick={handleNavLinkClick}>Players</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className={isScrolled ? 'scrolled' : ''} onClick={handleNavLinkClick}>Blog</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className={isScrolled ? 'scrolled' : ''} onClick={handleNavLinkClick}>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
