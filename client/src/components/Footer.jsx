// src/components/Footer.jsx
import React from 'react';
import './../css/footer.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer" style={{ backgroundImage: `url('/assets/Footer Background.jpg')` }}>
      <div className="container footer-container">
        <div className="footer-top">
          <img src="/assets/BSS Logo transparent 1.png" alt={t('altTexts.bssLogo')} className="footer-logo" />
          <h2 className="footer-quote">"{t('footer.quote') || 'Empowering Balkan athletes to reach new heights'}"</h2>
        </div>

        <div className="footer-bottom">
          <div className="footer-column footer-location">
            <h4>{t('footer.location')}</h4>
            <div className="socials-container">
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/America.png`} alt={t('altTexts.america')} />
                <span>{t('footer.locations.newYork')}</span>
              </div>
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/Europe.png`} alt={t('altTexts.europe')} />
                <span>{t('footer.locations.tirana')}</span>
              </div>
            </div>
          </div>
          <div className="footer-column footer-contact">
            <h4>{t('footer.contact')}</h4>
            <div className="socials-container">
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/phone-call.png`} alt={t('altTexts.phoneNumber')} />
                <a href="tel:+12523738698" className="footer-link">{t('footer.contactInfo.phone')}</a>
              </div>
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/email.png`} alt={t('altTexts.email')} />
                <a href="mailto:balkansportscholars@gmail.com" className="footer-link">{t('footer.contactInfo.email')}</a>
              </div>
            </div>
          </div>
          <div className="footer-column footer-socials">
            <h4>{t('footer.socials')}</h4>
            <div className="socials-container">
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/instagram.png`} alt={t('altTexts.instagram')} />
                <a href="https://www.instagram.com/balkansportscholars/" className="footer-link">{t('footer.socialLinks.instagram')}</a>
              </div>
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/facebook.png`} alt={t('altTexts.facebook')} />
                <a href="https://www.facebook.com/profile.php?id=61551249830619" className="footer-link">{t('footer.socialLinks.facebook')}</a>
              </div>
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/youtube.png`} alt={t('altTexts.youtube')} />
                <a href="https://www.youtube.com/@BalkanSportScholars" className="footer-link">{t('footer.socialLinks.youtube')}</a>
              </div>
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/linkedin.png`} alt={t('altTexts.linkedin')} />
                <a href="https://www.linkedin.com/in/endirahmani/" className="footer-link">{t('footer.socialLinks.linkedin')}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copy">
          <p>{t('footer.copy.rights')}</p>
          <p>{t('footer.copy.designedBy')} <a href="http://www.synapslimited.eu" className="footer-copy-designed-by-synaps">Synaps</a></p>
        </div>
        <a className="blog-log-in-btn" href="/privacy-policy">{t('footer.privacyPolicy')}</a>
      </div>
    </footer>
  );
};

export default Footer;
