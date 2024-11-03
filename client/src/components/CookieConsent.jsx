// src/components/CookieConsent.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../css/cookieconsent.css';
import { useTranslation } from 'react-i18next';

const CookieConsent = () => {
  const { t } = useTranslation();
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
          {t('cookieConsent.message')}
          <Link to="/privacy-policy" className="cookie-consent__link">
            {t('cookieConsent.learnMore')}
          </Link>
        </p>
        <div className="cookie-consent__buttons">
          <button className="cookie-consent__button accept" onClick={acceptCookies}>
            {t('cookieConsent.buttons.accept')}
          </button>
          <button className="cookie-consent__button decline" onClick={declineCookies}>
            {t('cookieConsent.buttons.decline')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
