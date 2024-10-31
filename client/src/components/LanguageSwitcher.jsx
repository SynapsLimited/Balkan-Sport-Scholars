// LanguageSwitcher.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './../css/languageswitcher.css'; // The CSS you provided
import './../i18n'; // Import the i18n configuration
import { UserContext } from '../context/userContext'; // Import UserContext

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isChecked, setIsChecked] = useState(false); // Default to English (unchecked)
  const { currentUser } = useContext(UserContext); // Access currentUser from context

  useEffect(() => {
    // Set the initial state based on the current language
    setIsChecked(i18n.language === 'al');
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLanguage = isChecked ? 'en' : 'al';
    i18n.changeLanguage(newLanguage);
    setIsChecked(!isChecked);
  };

  return (
    // Conditionally add 'logged-in' class if currentUser exists
    <div className={`language-switcher-container ${currentUser ? 'logged-in' : ''}`}>
      <label className="language-switcher">
        <input type="checkbox" checked={isChecked} onChange={toggleLanguage} />
        <span className="slider round"></span>
        <span className="select-en">EN</span>
        <span className="select-al">AL</span>
      </label>
    </div>
  );
};

export default LanguageSwitcher;
