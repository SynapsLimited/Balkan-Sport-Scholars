// DeletePlayer.jsx

import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const DeletePlayer = ({ playerId: id }) => {
    const { t } = useTranslation();

    const removePlayer = async () => {
        if (!window.confirm("Are you sure you want to delete this player?")) {
            return; // User canceled the deletion
        }

        try {
            console.log("Deleting player with ID:", id); // Debugging line
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/players/${id}`);
            if (response.status === 200) {
                window.location.reload(); // Refresh the page or redirect as needed
            }
        } catch (error) {
        }
    };

    return (
        <button className='btn btn-secondary' onClick={removePlayer}>
            {t('Delete')}
        </button>
    );
};

export default DeletePlayer;
