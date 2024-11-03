// src/pages/Blog.jsx

import React from 'react';
import '../css/blog.css';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Posts from '../components/Posts';
import Authors from '../blog/Authors';

const Blog = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t('blog.title')}</title>
      </Helmet>
      <header className="hero-container header-blog" id="intro">
        <div className="">
          <div className="center header-template">
            <h1 className='margin-bottom'>{t('blog.header.h1')}</h1>
            <p className='margin-bottom hero-p'>{t('blog.header.p')}</p>
            <a href="/contact" className="btn btn-secondary">{t('common.contact')}</a>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/Hero Image Contact.png`}
          alt="Hero Image Contact"
          style={{ display: 'none' }}
        />
      </header>
      <div className="blog-title">
        <h1>{t('blog.latest.h1')}</h1>
        <p>{t('blog.latest.p')}</p>
      </div>

      <section className="container blog-categories-section">
        <div className="blog-title">
          <h1>{t('blog.categories.h1')}</h1>
        </div>
        <ul className="blog-categories">
          <li className="btn btn-secondary"><Link to="/posts/categories/Football">{t('blog.categories.Football')}</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Basketball">{t('blog.categories.Basketball')}</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Volleyball">{t('blog.categories.Volleyball')}</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Tennis">{t('blog.categories.Tennis')}</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Rugby">{t('blog.categories.Rugby')}</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/ESports">{t('blog.categories.ESports')}</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Other">{t('blog.categories.Other')}</Link></li>
        </ul>
      </section>

      <Posts limit={6} />

      <section className="blog-authors-section">
        <Authors />
      </section>
    </div>
  );
};

export default Blog;
