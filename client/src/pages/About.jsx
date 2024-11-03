// src/pages/About.jsx

import React from 'react';
import '../css/about.css';
import { Helmet } from 'react-helmet-async';
import { useTranslation, Trans } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t('about.title')}</title>
      </Helmet>
      <header className="hero-container header-about" id="intro">
        <div className="">
          <div className="center header-template">
            <h1 className='margin-bottom'>{t('about.header.h1')}</h1>
            <p className='hero-p margin-bottom'>{t('about.header.p')}</p>
            <a href="/contact" className="btn btn-secondary">{t('common.contact')}</a>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/Hero Image About-500w.png`}
          alt={t('about.presentationImageAlt')}
          style={{ display: 'none' }}
        />
      </header>
      <section className="container presentation-section">
        <div className="presentation-text">
          <h1 className='margin-bottom'>
            <Trans i18nKey="about.presentationSection.h2">
              What about <strong>Balkan Sports Scholars?</strong>
            </Trans>
          </h1>
          <p>{t('about.presentationSection.p')}</p>
        </div>
        <div className="presentation-image">
          <img src="assets/BSS Logo transparent 1.png" alt={t('common.aboutButton')} />
        </div>
      </section>

      <section className="container card-section">
        <div className="card">
          <h1 className='margin-bottom'>{t('about.cards.mission.h1')}</h1>
          <div className="card-content">
            <p>{t('about.cards.mission.p')}</p>
            <img src="assets/mission.png" alt={t('about.cards.mission.alt')} />
          </div>
        </div>
        <div className="card">
          <h1 className='margin-bottom'>{t('about.cards.vision.h1')}</h1>
          <div className="card-content">
            <p>{t('about.cards.vision.p')}</p>
            <img src="assets/vision.png" alt={t('about.cards.vision.alt')} />
          </div>
        </div>
        <div className="card">
          <h1 className='margin-bottom'>{t('about.cards.values.h1')}</h1>
          <div className="card-content">
            <p>{t('about.cards.values.p')}</p>
            <img src="assets/values.png" alt={t('about.cards.values.alt')} />
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="team-title-container">
          <h1>{t('about.teamSection.title')}</h1>
        </div>
        <div className="team-wrapper">
          <div className="team-container">
            {t('about.teamSection.agents', { returnObjects: true }).map((agent, index) => (
              <React.Fragment key={index}>
                <input type="radio" name="slide" id={`c${index + 1}`} defaultChecked={index === 0} />
                <label htmlFor={`c${index + 1}`} className="team-card">
                  <div className="row">
                    <div className="icon">{index + 1}</div>
                    <div className="description">
                      <h4>{agent.name}</h4>
                      <p>{agent.role}</p>
                    </div>
                  </div>
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
