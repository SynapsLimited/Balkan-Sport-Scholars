// src/components/LanguageSwitcher.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './../css/languageswitcher.css'; // Ensure this CSS file styles the switcher appropriately
import './../i18n'; // Import the i18n configuration
import { UserContext } from '../context/userContext'; // Import UserContext

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isChecked, setIsChecked] = useState(false); // Default to Albanian (checked)
  const { currentUser } = useContext(UserContext); // Access currentUser from context

  // List of languages
  const languages = [
    { label: 'EN', languageCode: 'en' },
    { label: 'AL', languageCode: 'sq' },
  ];

  useEffect(() => {
    // Get the saved language from localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      try {
        const lang = JSON.parse(savedLanguage);
        i18n.changeLanguage(lang.languageCode);
        setIsChecked(lang.languageCode === 'sq');
      } catch (error) {
        console.error('Failed to parse saved language:', error);
        // If parsing fails, default to English
        i18n.changeLanguage('en');
        setIsChecked(false);
        // Save default language to localStorage
        localStorage.setItem(
          'preferredLanguage',
          JSON.stringify({ label: 'EN', languageCode: 'en' })
        );
      }
    } else {
      // If no saved language, default to Albanian
      i18n.changeLanguage('sq');
      setIsChecked(true);
      // Save default language to localStorage
      localStorage.setItem(
        'preferredLanguage',
        JSON.stringify({ label: 'AL', languageCode: 'sq' })
      );
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLanguage = isChecked ? languages[0] : languages[1];
    i18n.changeLanguage(newLanguage.languageCode);
    setIsChecked(!isChecked);
    // Save the selected language to localStorage
    localStorage.setItem('preferredLanguage', JSON.stringify(newLanguage));
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
