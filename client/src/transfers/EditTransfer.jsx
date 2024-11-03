import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const EditTransfer = () => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [previousClub, setPreviousClub] = useState('');
  const [currentClub, setCurrentClub] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [addTranslation, setAddTranslation] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [image, setImage] = useState(null);
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
        const transfer = response.data;
        setFullName(transfer.fullName);
        setPreviousClub(transfer.previousClub);
        setCurrentClub(transfer.currentClub);
        setDescription(transfer.description);
        setDescriptionEn(transfer.description_en || '');
        setYoutubeLink(transfer.youtubeLink);

        // If English translation exists, check the checkbox
        if (transfer.description_en) {
          setAddTranslation(true);
        }
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

    if (addTranslation) {
      transferData.set('description_en', descriptionEn);
    }

    if (image) {
      transferData.set('image', image);
    }

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/transfers/${id}`, transferData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        return navigate('/transfers');
      }
    } catch (err) {
      setError(err.response?.data?.message || t('error.anErrorOccurred'));
    }
  };

  return (
    <section className="create-transfer">
      <div className="container">
        <h2>{t('transfers.editTransfer')}</h2>
        {error && <p className="form-error-message">{error}</p>}
        <form className="form create-transfer-form" onSubmit={editTransfer}>
          <input
            type="text"
            placeholder={t('transfers.fullName')}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoFocus
          />
          <input
            type="text"
            placeholder={t('transfers.previousClub')}
            value={previousClub}
            onChange={(e) => setPreviousClub(e.target.value)}
          />
          <input
            type="text"
            placeholder={t('transfers.currentClub')}
            value={currentClub}
            onChange={(e) => setCurrentClub(e.target.value)}
          />
          <textarea
            placeholder={t('transfers.description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="custom-checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={addTranslation}
                onChange={() => setAddTranslation(!addTranslation)}
              />
              {t('transfers.addTranslation')}
            </label>
          </div>

          {addTranslation && (
            <textarea
              placeholder={t('transfers.descriptionEn')}
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
            />
          )}

          <input
            type="text"
            placeholder={t('transfers.youtubeLink')}
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
          <div className="custom-file-input-container">
            <input
              className="custom-file-input"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-submit">
            {t('transfers.update')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditTransfer;
