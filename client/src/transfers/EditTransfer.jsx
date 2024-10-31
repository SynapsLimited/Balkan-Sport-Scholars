import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const EditTransfer = () => {
    const [fullName, setFullName] = useState('');
    const [previousClub, setPreviousClub] = useState('');
    const [currentClub, setCurrentClub] = useState('');
    const [description, setDescription] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        const getTransfer = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/transfers/${id}`);
                setFullName(response.data.fullName);
                setPreviousClub(response.data.previousClub);
                setCurrentClub(response.data.currentClub);
                setDescription(response.data.description);
                setYoutubeLink(response.data.youtubeLink);
            } catch (error) {
                console.log(error);
            }
        };
        getTransfer();
    }, [id]);

    const editTransfer = async (e) => {
        e.preventDefault();

        const transferData = new FormData();
        transferData.set('fullName', fullName);
        transferData.set('previousClub', previousClub);
        transferData.set('currentClub', currentClub);
        transferData.set('description', description);
        transferData.set('youtubeLink', youtubeLink);
        transferData.set('image', image);

        try {
            const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/transfers/${id}`, transferData, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                return navigate('/transfers');
            }
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <section className="create-transfer">
            <div className="container">
                <h2>Edit Transfer</h2>
                {error && <p className="form-error-message">{error}</p>}
                <form className="form create-transfer-form" onSubmit={editTransfer}>
                    <input type="text" placeholder='Full Name' value={fullName} onChange={e => setFullName(e.target.value)} autoFocus />
                    <input type="text" placeholder='Previous Club' value={previousClub} onChange={e => setPreviousClub(e.target.value)} />
                    <input type="text" placeholder='Current Club' value={currentClub} onChange={e => setCurrentClub(e.target.value)} />
                    <textarea placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
                    <input type="text" placeholder='YouTube Link' value={youtubeLink} onChange={e => setYoutubeLink(e.target.value)} />
                    <div className="custom-file-input-container">
                        <input className="custom-file-input" type="file" onChange={e => setImage(e.target.files[0])} accept='png, jpg, jpeg' />
                    </div>
                    <button type="submit" className="btn btn-primary btn-submit">Update</button>
                </form>
            </div>
        </section>
    );
};

export default EditTransfer;
