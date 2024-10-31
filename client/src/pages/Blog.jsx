import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../css/blog.css'; // Assuming you have a corresponding CSS file for styling
import { Helmet } from 'react-helmet-async';
import Posts from '../components/Posts';
import Authors from '../blog/Authors';

const Blog = () => {
  return (
    <div>
      <Helmet>
                <title>Balkan Sport Scholars - Blog</title>
            </Helmet>
            <header className="hero-container header-blog" id="intro">
    <div className="container">
      <div className="center header-template">
        <h1 className='margin-bottom'>Blog</h1>
        <p className='margin-bottom hero-p'>Lorem ipsum dolor sit amet consectetur. Sit eget nisi egestas sit integer phasellus nibh commodo. </p>
        <a href="/contact" className="btn btn-secondary">Contact</a>
      </div>
    </div>
    <img
      src={`${process.env.PUBLIC_URL}/assets/Hero Image Contact.png`}
      alt="Hero Image Contact"
      style={{ display: 'none' }}
    />
  </header>
            <div className="blog-title">
        <h1>Latest from Balkan Sports Scholars</h1>
        <p>News from us and the world in all sport disciplines sharing stories and experiences of players, coaches, and clubs. </p>
      </div>

      <section className="container blog-categories-section">
        <div className="blog-title">
          <h1>Categories</h1>
        </div>
        <ul className="blog-categories">
          <li className="btn btn-secondary"><Link to="/posts/categories/Football">Football</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Basketball">Basketball</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Volleyball">Volleyball</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Tennis">Tennis</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Rugby">Rugby</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/ESports">ESports</Link></li>
          <li className="btn btn-secondary"><Link to="/posts/categories/Other">Other</Link></li>
        </ul>
      </section>

      <Posts limit={6} />

      <section className="container blog-authors-section">
        <Authors />
      </section>
    </div>
  );
};

export default Blog;
