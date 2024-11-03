// src/components/EditPlayer.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import axios from 'axios';
import './../css/players.css';

const EditPlayer = () => {
  // Basic player information
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
  const [image, setImage] = useState(null);
  
  // Documents state
  const initialDocuments = Array.from({ length: 10 }, () => ({
    file: null,
    name: '',
    name_en: '',
    existing: false,
    url: '',
    remove: false, // To track removals
  }));
  const [documents, setDocuments] = useState(initialDocuments);

  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const { t } = useTranslation(); // Destructure t from useTranslation
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const getPlayer = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/players/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const player = response.data;
        setName(player.name);
        setClubname(player.clubname);
        setDob(player.dob ? new Date(player.dob).toISOString().substr(0, 10) : '');
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

        // Initialize existing documents
        const updatedDocuments = [...initialDocuments];
        if (player.documentUrls && player.documentUrls.length > 0) {
          player.documentUrls.forEach((url, index) => {
            if (index < 10) { // Ensure we don't exceed the limit
              updatedDocuments[index] = {
                file: null, // Existing file
                name: player.documentNames[index],
                name_en: player.documentNames_en[index],
                existing: true,
                url: url,
                remove: false,
              };
            }
          });
        }
        setDocuments(updatedDocuments);
      } catch (error) {
        console.log(error);
        setError(
          t('Failed to fetch player details.')
        );
      }
    };
    getPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token, t]);

  const handleDocumentChange = (index, field, value) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc, i) =>
        i === index ? { ...doc, [field]: value } : doc
      )
    );
  };

  const handleFileChange = (index, file) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc, i) =>
        i === index ? { ...doc, file } : doc
      )
    );
  };

  const removeExistingDocument = (index) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc, i) =>
        i === index
          ? { ...doc, name: '', name_en: '', existing: false, url: '', remove: true }
          : doc
      )
    );
  };

  const editPlayer = async (e) => {
    e.preventDefault();

    // Validation: Ensure all active document names are filled
    for (let doc of documents) {
      if (doc.file || doc.existing) {
        if (doc.name.trim() === '' || doc.name_en.trim() === '') {
          setError(t('Please provide both names for each document.'));
          return;
        }
      }
    }

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

    if (image) {
      playerData.append('image', image);
    }

    // Append documents as separate arrays
    documents.forEach((doc) => {
      if (doc.file) {
        playerData.append('documents', doc.file); // New Files
        playerData.append('documentNames', doc.name); // New Names
        playerData.append('documentNames_en', doc.name_en); // New English Names
      }
      if (doc.remove) {
        // Append URLs to remove
        playerData.append('removeDocuments', doc.url);
      }
    });

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
        setError(t('No response received from the server. Please try again.'));
      } else {
        setError(t('An error occurred while updating the player.'));
      }
    }
  };

  return (
    <section className="create-player">
      <div className="container">
        <h2 className="margin-top">{t('Edit Player')}</h2>
        {error && <p className="form-error-message">{error}</p>}
        <form className="form create-player-form" onSubmit={editPlayer}>
          {/* Basic Information */}
          <input
            type="text"
            placeholder={t('Name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
          <input
            type="text"
            placeholder={t('Club Name')}
            value={clubname}
            onChange={(e) => setClubname(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder={t('Date of Birth')}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <select name="sex" value={sex} onChange={(e) => setSex(e.target.value)} required>
            <option value="Male">{t('Male')}</option>
            <option value="Female">{t('Female')}</option>
            <option value="Non-binary">{t('Non-binary')}</option>
          </select>
          <input
            type="text"
            placeholder={t('Sport')}
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder={t('Position')}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder={t('Nationality')}
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder={t('Height (cm)')}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            min="0"
          />
          <input
            type="number"
            placeholder={t('Weight (kg)')}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            min="0"
          />
          <input
            type="text"
            placeholder={t('Preferred Foot/Hand')}
            value={preferredFootHand}
            onChange={(e) => setPreferredFootHand(e.target.value)}
            required
          />
          <textarea
            placeholder={t('Description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          {/* Translation Option */}
          <div className="custom-checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={addTranslation}
                onChange={() => setAddTranslation(!addTranslation)}
              />
              {t('Add translation in English')}
            </label>
          </div>

          {addTranslation && (
            <>
              <input
                type="text"
                placeholder={t('Sport in English')}
                value={sportEn}
                onChange={(e) => setSportEn(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder={t('Position in English')}
                value={positionEn}
                onChange={(e) => setPositionEn(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder={t('Nationality in English')}
                value={nationalityEn}
                onChange={(e) => setNationalityEn(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder={t('Preferred Foot/Hand in English')}
                value={preferredFootHandEn}
                onChange={(e) => setPreferredFootHandEn(e.target.value)}
                required
              />
              <textarea
                placeholder={t('Description in English')}
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                required
              ></textarea>
            </>
          )}

          {/* Video Link */}
          <input
            type="url"
            placeholder={t('Video Link')}
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            required
          />

          {/* Image Upload */}
          <h3 className="margin-top">{t('Image')}</h3>
          <div className="custom-file-input-container">
            <input
              className="custom-file-input"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>

          {/* Documents Section */}
          <h3 className="margin-top">{t('Documents')}</h3>
          <div className="documents-section">
            {documents.map((doc, index) => (
              <div key={index} className="document-entry">
                <h4>{t('Document Name')} {index + 1}</h4>
                {doc.existing && doc.url ? (
                  <div className="existing-document">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      {t('View Current Document')}
                    </a>
                    <button
                      type="button"
                      onClick={() => removeExistingDocument(index)}
                      className="btn btn-remove-document"
                    >
                      {t('Remove')}
                    </button>
                  </div>
                ) : null}
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                  accept="image/png, image/jpeg, image/jpg, application/pdf"
                />
                {(doc.file || doc.existing) && (
                  <div className="document-names">
                    <input
                      type="text"
                      placeholder={t('Document Name')}
                      value={doc.name}
                      onChange={(e) =>
                        handleDocumentChange(index, 'name', e.target.value)
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder={t('Document Name (English)')}
                      value={doc.name_en}
                      onChange={(e) =>
                        handleDocumentChange(index, 'name_en', e.target.value)
                      }
                      required
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary btn-submit">
            {t('Update')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPlayer;
