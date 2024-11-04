// src/pages/Contact.jsx

import React from 'react';
import '../css/contact.css';
import { Helmet } from 'react-helmet-async';
import { useTranslation, Trans } from 'react-i18next';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t('contact.title')}</title>
      </Helmet>
      <header className="hero-container header-contact" id="intro">
        <div className="">
          <div className="center header-template">
            <h1 className='margin-bottom'>{t('contact.header.h1')}</h1>
            <p className='margin-bottom hero-p'>{t('contact.header.p')}</p>
            <a href="tel:+13472781736" className="btn btn-secondary">{t('contact.header.callUs')}</a>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/Hero Image Contact.png`}
          alt={t('contact.header.h1')}
          style={{ display: 'none' }}
        />
      </header>
      <div className="contact-overview-title">
        <h1>{t('contact.overviewTitle')}</h1>
      </div>

      <section className="container contact-section">
        <div className="blob location-blob">
          <h2>{t('contact.sections.location.h2')}</h2>
          <img src="/assets/Europe.png" alt={t('contact.sections.location.altEurope')} />
          <a href="#"><h4>{t('contact.sections.location.balkans')}</h4></a>
          <img src="/assets/America.png" alt={t('contact.sections.location.altAmerica')} />
          <a href="#"><h4>{t('contact.sections.location.america')}</h4></a>
        </div>
        <div className="blob phone-mail-blob">
          <h2>{t('contact.sections.contactInfo.h2')}</h2>
          <img src="/assets/phone-call.png" alt={t('contact.sections.contactInfo.altPhone')} />
          <a href="tel:+13472781736"><h4>{t('contact.sections.contactInfo.phone')}</h4></a>
          <img src="/assets/email.png" alt={t('contact.sections.contactInfo.altEmail')} />
          <a href="mailto:balkansportscholars@gmail.com"><h4>{t('contact.sections.contactInfo.email')}</h4></a>
        </div>
        <div className="blob socials-blob">
          <h2>{t('contact.sections.socials.h2')}</h2>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61551249830619" className="contact-link">
              <img src="/assets/facebook.png" alt={t('contact.sections.socials.facebook')} />
            </a>
            <a href="https://www.instagram.com/balkansportscholars/" className="contact-link">
              <img src="/assets/instagram.png" alt={t('contact.sections.socials.instagram')} />
            </a>
            <a href="https://www.linkedin.com/in/endirahmani/" className="contact-link">
              <img src="/assets/linkedin.png" alt={t('contact.sections.socials.linkedin')} />
            </a>
            <a href="https://www.youtube.com/@BalkanSportScholars" className="contact-link">
              <img src="/assets/youtube.png" alt={t('contact.sections.socials.youtube')} />
            </a>
          </div>
        </div>
      </section>

      <div className="contact-overview-title">
        <h1>{t('contact.contactNow')}</h1>
      </div>

      <ContactForm />
    </div>
  );
};

export default Contact;
