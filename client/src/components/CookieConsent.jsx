// src/components/CookieConsent.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../css/cookieconsent.css';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('bssCookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('bssCookieConsent', 'true');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('bssCookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="cookie-consent">
      <div className="cookie-consent__content">
        <p>
          We use cookies to enhance your experience on our website. By continuing to browse this site, you agree to our use of cookies.
          <Link to="/privacy-policy" className="cookie-consent__link">Learn more</Link>
        </p>
        <div className="cookie-consent__buttons">
          <button className="cookie-consent__button accept" onClick={acceptCookies}>
            Accept
          </button>
          <button className="cookie-consent__button decline" onClick={declineCookies}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
