import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${authorID}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.log('Error fetching author:');
      }
    };

    if (authorID) {
      getAuthor();
    }
  }, [authorID]);

  return (
    <Link to={`/posts/users/${authorID}`} className="post-author">
      <div className="post-author-avatar">
        <img
          src={author?.avatar ? author.avatar : '/default-avatar.png'}
          alt={author?.name || 'Author Avatar'}
        />
      </div>
      <div className="post-author-details">
        <h5>By: {author?.name || 'BSS'}</h5>
        {createdAt && (
          <small>
            <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
          </small>
        )}
      </div>
    </Link>
  );
};

export default PostAuthor;
