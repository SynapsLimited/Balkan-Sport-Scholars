// src/pages/Dashboard.jsx

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Loader from '../components/Loader';
import DeletePost from './DeletePost';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchPosts();
  }, [id, token]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="dashboard">
      <div className="blog-title-filtered">
        <h1>{t('dashboard')}</h1>
      </div>

      {posts.length ? (
        <div className="container dashboard-container">
          {posts.map((post) => (
            <article key={post._id} className="dashboard-post">
              <div className="dashboard-post-info">
                <div className="dashboard-post-thumbnail">
                  <img src={post.thumbnail} alt="" />
                </div>
                <h4>{post.title}</h4>
              </div>
              <div className="dashboard-post-actions">
                <Link to={`/posts/${post._id}`} className="btn btn-background">
                  {t('viewPost')}
                </Link>
                <Link to={`/posts/${post._id}/edit`} className="btn btn-primary">
                  {t('editPost')}
                </Link>
                <DeletePost postId={post._id} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center">{t('noUserPosts')}</h2>
      )}
    </section>
  );
};

export default Dashboard;