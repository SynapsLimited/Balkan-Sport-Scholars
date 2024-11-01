import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const DeletePlayer = ({ playerId: id }) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const removePlayer = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/players/${id}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                window.location.href = '/players'; // Redirect to players list after deletion
            }
        } catch (error) {
            console.log("Couldn't delete player.", error);
        }
    };

    return (
        <button className='btn btn-secondary' onClick={removePlayer}>Delete</button>
    );
};

export default DeletePlayer;
