import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const DeleteTransfer = ({ transferId: id }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const removeTransfer = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/transfers/${id}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.log("Couldn't delete transfer.", error);
        }
    };

    return (
        <button 
            className='btn btn-secondary' 
            style={{ fontFamily: 'Inter-Bold, sans-serif' }} 
            onClick={removeTransfer}
        >
            {t('common.delete')}
        </button>
    );
};

export default DeleteTransfer;
