import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const EditPlayer = () => {
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
  const [sportEn, setSportEn] = useState('');
  const [positionEn, setPositionEn] = useState('');
  const [nationalityEn, setNationalityEn] = useState('');
  const [preferredFootHandEn, setPreferredFootHandEn] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [addTranslation, setAddTranslation] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [image, setImage] = useState('');
  const [documents, setDocuments] = useState([]);
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
    const getPlayer = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/players/${id}`);
        const player = response.data;
        setName(player.name);
        setClubname(player.clubname);
        setDob(new Date(player.dob).toISOString().substr(0, 10)); // Format for input type="date"
        setSex(player.sex);
        setSport(player.sport);
        setPosition(player.position);
        setNationality(player.nationality);
        setHeight(player.height);
        setWeight(player.weight);
        setPreferredFootHand(player.preferredFootHand);
        setDescription(player.description);
        setVideoLink(player.videoLink);

        // Set English translations if they exist
        setSportEn(player.sport_en || '');
        setPositionEn(player.position_en || '');
        setNationalityEn(player.nationality_en || '');
        setPreferredFootHandEn(player.preferredFootHand_en || '');
        setDescriptionEn(player.description_en || '');

        // If any English translations exist, check the checkbox
        if (
          player.sport_en ||
          player.position_en ||
          player.nationality_en ||
          player.preferredFootHand_en ||
          player.description_en
        ) {
          setAddTranslation(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPlayer();
  }, [id]);

  const editPlayer = async (e) => {
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

    if (addTranslation) {
      playerData.set('sport_en', sportEn);
      playerData.set('position_en', positionEn);
      playerData.set('nationality_en', nationalityEn);
      playerData.set('preferredFootHand_en', preferredFootHandEn);
      playerData.set('description_en', descriptionEn);
    }

    if (image) playerData.set('image', image);
    for (let doc of documents) {
      playerData.append('documents', doc);
    }

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/players/${id}`, playerData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        navigate('/players');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError('No response received from the server. Please try again.');
      } else {
        setError('An error occurred while updating the player.');
      }
    }
  };

  return (
    <section className="create-player">
      <div className="container">
        <h2>Edit Player</h2>
        {error && <p className="form-error-message">{error}</p>}
        <form className="form create-player-form" onSubmit={editPlayer}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <input
            type="text"
            placeholder="Club Name"
            value={clubname}
            onChange={(e) => setClubname(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <select name="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            placeholder="Sport"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            type="text"
            placeholder="Preferred Foot/Hand"
            value={preferredFootHand}
            onChange={(e) => setPreferredFootHand(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="custom-checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={addTranslation}
                onChange={() => setAddTranslation(!addTranslation)}
              />
              Add translation in English
            </label>
          </div>

          {addTranslation && (
            <>
              <input
                type="text"
                placeholder="Sport in English"
                value={sportEn}
                onChange={(e) => setSportEn(e.target.value)}
              />
              <input
                type="text"
                placeholder="Position in English"
                value={positionEn}
                onChange={(e) => setPositionEn(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nationality in English"
                value={nationalityEn}
                onChange={(e) => setNationalityEn(e.target.value)}
              />
              <input
                type="text"
                placeholder="Preferred Foot/Hand in English"
                value={preferredFootHandEn}
                onChange={(e) => setPreferredFootHandEn(e.target.value)}
              />
              <textarea
                placeholder="Description in English"
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
              ></textarea>
            </>
          )}

          <input
            type="url"
            placeholder="Video Link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <div className="custom-file-input-container">
            <input
              className="custom-file-input"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
          <div className="custom-file-input-container">
            <input
              className="custom-file-input"
              type="file"
              multiple
              onChange={(e) => setDocuments(Array.from(e.target.files))}
              accept="image/png, image/jpeg, image/jpg, application/pdf"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-submit">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPlayer;
