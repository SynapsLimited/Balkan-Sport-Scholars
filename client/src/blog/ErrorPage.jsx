import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <section className="container error-page">
      <div className="error-center">
        <Link to="/" className="btn btn-primary">
          {t('errorPage.goBack')}
        </Link>
        <h2>{t('errorPage.pageNotFound')}</h2>
      </div>
    </section>
  );
};

export default ErrorPage;
