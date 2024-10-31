import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const removePost = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Delete response:', response); // Debugging log
      if (response.status === 200) {
        console.log('Post deleted successfully. Reloading page...'); // Debugging log
        window.location.reload(); // Refresh the page after deletion
      }
    } catch (error) {
      console.log("Couldn't delete post.", error); // Debugging log
    }
  };

  return (
    <button className='btn btn-secondary' style={{fontFamily: 'Inter-Bold, sans-serif'}} onClick={removePost}>Delete</button>
  );
};

export default DeletePost;
