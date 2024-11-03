// src/components/PrivacyPolicy.jsx

import React from 'react';
import '../css/privacypolicy.css';
import { useTranslation, Trans } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="privacy-policy-container container">
      <Helmet>
        <title>{t('privacyPolicy.title')}</title>
      </Helmet>
      <h1>{t('privacyPolicy.title')}</h1>

      <section>
        <h2>{t('privacyPolicy.sections.introduction.h2')}</h2>
        <p>{t('privacyPolicy.sections.introduction.p')}</p>
      </section>

      <section>
        <h2>{t('privacyPolicy.sections.informationWeCollect.h2')}</h2>
        <p>{t('privacyPolicy.sections.informationWeCollect.p')}</p>
        <ul>
          {t('privacyPolicy.sections.informationWeCollect.ul', { returnObjects: true }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t('privacyPolicy.sections.useOfInformation.h2')}</h2>
        <p>{t('privacyPolicy.sections.useOfInformation.p')}</p>
        <ul>
          {t('privacyPolicy.sections.useOfInformation.ul', { returnObjects: true }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t('privacyPolicy.sections.sharingOfInformation.h2')}</h2>
        <p>{t('privacyPolicy.sections.sharingOfInformation.p')}</p>
        <ul>
          {t('privacyPolicy.sections.sharingOfInformation.ul', { returnObjects: true }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t('privacyPolicy.sections.cookiesAndSimilarTechnologies.h2')}</h2>
        <p>{t('privacyPolicy.sections.cookiesAndSimilarTechnologies.p1')}</p>
        <p>{t('privacyPolicy.sections.cookiesAndSimilarTechnologies.p2')}</p>
      </section>

      <section>
        <h2>{t('privacyPolicy.sections.dataSecurity.h2')}</h2>
        <p>{t('privacyPolicy.sections.dataSecurity.p')}</p>
      </section>

      <section>
        <h2>{t('privacyPolicy.sections.userRights.h2')}</h2>
        <p>{t('privacyPolicy.sections.userRights.p')}</p>
      </section>

      <section>
        <h2>{t('privacyPolicy.sections.changesToPrivacyPolicy.h2')}</h2>
        <p>{t('privacyPolicy.sections.changesToPrivacyPolicy.p')}</p>
      </section>

      <section>
        <h2>{t('privacyPolicy.sections.contactUs.h2')}</h2>
        <p>{t('privacyPolicy.sections.contactUs.p')}</p>
        <ul>
          {t('privacyPolicy.sections.contactUs.ul', { returnObjects: true }).map((item, index) => (
            <li key={index}>
              <Trans i18nKey={`privacyPolicy.sections.contactUs.ul[${index}]`}>
                {item}
              </Trans>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
