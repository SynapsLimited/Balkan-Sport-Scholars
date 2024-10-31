import React, { useContext, useEffect, useState } from 'react';
import PostAuthor from '../components/PostAuthor';
import { Link, useParams } from 'react-router-dom';
import './../css/blog.css';
import Loader from '../components/Loader';
import DeletePost from './DeletePost';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    getPost();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className='error'>{error}</p>;
  }

  return (
    <section className="container post-detail">
      {post && (
        <div className="post-detail-container">
          <div className="post-detail-header">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id === post?.creator && (
              <div className="post-detail-buttons">
                <Link to={`/posts/${post?._id}/edit`} className="btn btn-primary">Edit</Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>

          <h1>{post.title}</h1>
          <div className="post-detail-thumbnail">
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
          </div>
          <p dangerouslySetInnerHTML={{__html: post.description}}></p>
        </div>
      )}
      <div className='multiple-buttons'>
        <a href='/blog' className='btn btn-primary center margin-top'>Back to Blog</a>
        <a href='/' className='btn btn-secondary center'>Back to Home</a>
      </div>
    </section>
  );
};

export default PostDetail;
