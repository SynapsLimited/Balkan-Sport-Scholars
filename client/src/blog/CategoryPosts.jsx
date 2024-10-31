import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../components/PostItem';
import './../css/blog.css'; // Assuming you have a corresponding CSS file for styling
import Authors from '../blog/Authors';
import Loader from './../components/Loader';
import axios from 'axios';

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [authorName, setAuthorName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const fetchAuthorAndPosts = async () => {
      setIsLoading(true);
      try {
        // Fetch the author's details
        const authorResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`);
        setAuthorName(authorResponse.data.name);

        // Fetch the author's posts
        const postsResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`);
        setPosts(postsResponse?.data);
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    fetchAuthorAndPosts();
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      <div className="blog-title-filtered">
        <h1>{category}</h1>
      </div>

      {posts.length > 0 ? (
        <div className="container posts-container">
          {posts.map(({ _id: postId, thumbnail, category, title, description, creator, createdAt }) => (
            <PostItem
              key={postId}
              postID={postId}
              thumbnail={thumbnail}
              category={category}
              title={title}
              description={description}
              authorID={creator}
              createdAt={createdAt}
            />
          ))}
        </div>
      ) : (
        <h1 className="error-blog-not-found">No Posts Found</h1>
      )}

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

    </section>
  );
};

export default CategoryPosts;
