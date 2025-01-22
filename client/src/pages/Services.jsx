// src/pages/Services.jsx

import React from 'react';
import '../css/services.css';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  const serviceItems = t('services.servicesContainer.serviceItems', { returnObjects: true });

  return (
    <div>
      <Helmet>
        <title>{t('services.title')}</title>
      </Helmet>
      <header className="hero-container header-services" id="intro">
        <div className="container">
          <div className="center header-template">
            <h1 className='margin-bottom'>{t('services.header.h1')}</h1>
            <p className='margin-bottom hero-p'>{t('services.header.p')}</p>
            <a href="/contact" className="btn btn-secondary">{t('common.contact')}</a>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/Hero Image Services-500w.png`}
          alt="Hero Image Services"
          style={{ display: 'none' }}
        />
      </header>
      <div className="container">
        {/* Services Introduction */}
        <div className="services-intro">
          <h1>{t('services.servicesContainer.intro.h1')}</h1>
          <p>{t('services.servicesContainer.intro.p')}</p>
        </div>

        {/* Service Items */}
        {serviceItems.map((service, index) => (
          <div key={index} className={`service-item ${index % 2 === 1 ? 'reverse' : 'item-right'}`}>
            <div className="service-text">
              <h1>{service.h1}</h1>
              <p>{service.p}</p>
            </div>
            <div className="service-img">
              <img src={`assets/${service.imgAlt}.png`} alt={service.imgAlt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
