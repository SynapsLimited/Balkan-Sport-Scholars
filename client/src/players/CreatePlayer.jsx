import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import './../css/players.css'

const CreatePlayer = () => {
    const [name, setName] = useState('');
    const [clubname, setClubname] = useState('');
    const [dob, setDob] = useState('');
    const [sex, setSex] = useState('Male');
    const [sport, setSport] = useState('');
    const [position, setPosition] = useState('');
    const [nationality, setNationality] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [preferredFootHand, setPreferredFootHand] = useState('');
    const [description, setDescription] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [image, setImage] = useState('');
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

  // Inside CreatePlayer.jsx

const createPlayer = async (e) => {
    e.preventDefault();

    const playerData = new FormData();
    playerData.set('name', name);
    playerData.set('clubname', clubname);
    playerData.set('dob', dob);
    playerData.set('sex', sex);
    playerData.set('sport', sport);
    playerData.set('position', position);
    playerData.set('nationality', nationality);
    playerData.set('height', height);
    playerData.set('weight', weight);
    playerData.set('preferredFootHand', preferredFootHand);
    playerData.set('description', description);
    playerData.set('videoLink', videoLink);
    playerData.set('image', image);
    for (let doc of documents) {
        playerData.append('documents', doc);
    }

    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/players`, playerData, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 201) {
            navigate('/players');
        }
    } catch (err) {
        if (err.response) {
            setError(err.response.data.message);
        } else if (err.request) {
            setError('No response received from the server. Please try again.');
        } else {
            setError('An error occurred while creating the player.');
        }
    }
};


    return (
        <div>
        <section className="create-player">
            <div className="container">
                <h2 className='margin-top'>Create Player</h2>
                {error && <p className='form-error-message'>{error}</p>}
                <form className="form create-player-form" onSubmit={createPlayer}>
                    <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} autoFocus />
                    <input type="text" placeholder='Club Name' value={clubname} onChange={e => setClubname(e.target.value)} />
                    <input type="date" placeholder='Date of Birth' value={dob} onChange={e => setDob(e.target.value)} />
                    <select name="sex" value={sex} onChange={e => setSex(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                    </select>
                    <input type="text" placeholder='Sport' value={sport} onChange={e => setSport(e.target.value)} />
                    <input type="text" placeholder='Position' value={position} onChange={e => setPosition(e.target.value)} />
                    <input type="text" placeholder='Nationality' value={nationality} onChange={e => setNationality(e.target.value)} />
                    <input type="number" placeholder='Height (cm)' value={height} onChange={e => setHeight(e.target.value)} />
                    <input type="number" placeholder='Weight (kg)' value={weight} onChange={e => setWeight(e.target.value)} />
                    <input type="text" placeholder='Preferred Foot/Hand' value={preferredFootHand} onChange={e => setPreferredFootHand(e.target.value)} />
                    <textarea placeholder='Description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <input type="url" placeholder='Video Link' value={videoLink} onChange={e => setVideoLink(e.target.value)} />
                    <h3 className='margin-top'>Image</h3>
                    <div className="custom-file-input-container">
                        <input className="custom-file-input" type="file" onChange={e => setImage(e.target.files[0])} accept='png, jpg, jpeg' />
                    </div>
                    <h3 className='margin-top'>Documents</h3>
                    <div className="custom-file-input-container">
                        <input className="custom-file-input" type="file" multiple onChange={e => setDocuments(Array.from(e.target.files))} accept='png, jpg, jpeg, pdf' />
                    </div>
                    <button type="submit" className="btn btn-primary btn-submit">Create</button>
                </form>
            </div>
        </section>
        </div>
    );
};

export default CreatePlayer;
