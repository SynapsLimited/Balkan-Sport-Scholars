// src/components/CategoryPosts.jsx

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../components/PostItem';
import './../css/blog.css';
import Authors from '../blog/Authors';
import Loader from './../components/Loader';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const CategoryPosts = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  // Mapping from English category names to Albanian translations
  const categoryTranslationMap = {
    "Football": "Futboll",
    "Basketball": "Basketboll",
    "Volleyball": "Vollejboll",
    "Rugby": "Futboll Amerikan",
    "Tennis": "Tenis",
    "ESports": "Sporte Elektronike",
    "Other": "Të Tjera"
  };

  // Get the display name based on the current language
  const categoryDisplayName = t(`categories.${category}`, categoryTranslationMap[category] || category);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // Fetch posts for the current category
        const postsResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`);
        setPosts(postsResponse.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section data-aos="fade-up" className="posts">
      <div className="blog-title-filtered">
        <h1>{categoryDisplayName}</h1>
      </div>

      {posts.length > 0 ? (
        <div className="container posts-container">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <h1 className="error-blog-not-found">{t('categories.noPosts')}</h1>
      )}

      {/* Blog Categories Section */}
      <section data-aos="fade-up" className="container blog-categories-section">
        <div className="blog-title">
          <h1>{t('categories.title')}</h1>
        </div>
        <ul className="blog-categories">
          <li className="btn btn-secondary"><Link to="/posts/categories/Football">{t('categories.Football')}</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Basketball">{t('categories.Basketball')}</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Volleyball">{t('categories.Volleyball')}</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Tennis">{t('categories.Tennis')}</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Rugby">{t('categories.Rugby')}</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/ESports">{t('categories.ESports')}</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Other">{t('categories.Other')}</Link></li>
        </ul>
      </section>
    </section>
  );
};

export default CategoryPosts;
