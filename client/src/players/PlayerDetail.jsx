// src/components/PlayerDetail.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import './../css/players.css';

const PlayerDetail = () => {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const { t, i18n } = useTranslation(); // Destructure t from useTranslation
  const token = currentUser?.token;
  const currentLanguage = i18n.language;

  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPlayer = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/players/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlayer(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            t('Player does not exist')
        );
        console.error('Error fetching player:', error);
      }
      setIsLoading(false);
    };

    getPlayer();
  }, [id, token, t]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  // Function to collect all documents
  const getDocuments = () => {
    const docs = [];
    if (player.documentUrls && player.documentUrls.length > 0) {
      for (let i = 0; i < player.documentUrls.length; i++) {
        docs.push({
          name: currentLanguage === 'en' ? player.documentNames_en[i] || player.documentNames[i] : player.documentNames[i],
          url: player.documentUrls[i],
        });
      }
    }
    return docs;
  };

  const documents = player ? getDocuments() : [];

  return (
    <section className="container player-detail">
      {player ? (
        <div className="player-detail-container">
          <div className="player-detail-header">
            <h1>{currentLanguage === 'en' ? player.name_en || player.name : player.name}</h1>
            <p>{currentLanguage === 'en' ? player.clubname_en || player.clubname : player.clubname}</p>
          </div>

          <div className="player-detail-thumbnail">
            {player.image ? (
              <img src={player.image} alt={player.name} />
            ) : (
              <p>{t('No image available.')}</p>
            )}
          </div>

          {/* Player Attributes */}
          <div className="player-attributes">
            <p>
              <strong>{t('Sport')}:</strong>{' '}
              {currentLanguage === 'en' ? player.sport_en || player.sport : player.sport}
            </p>
            <p>
              <strong>{t('Position')}:</strong>{' '}
              {currentLanguage === 'en' ? player.position_en || player.position : player.position}
            </p>
            <p>
              <strong>{t('Nationality')}:</strong>{' '}
              {currentLanguage === 'en' ? player.nationality_en || player.nationality : player.nationality}
            </p>
            <p>
              <strong>{t('Height (cm)')}:</strong> {player.height} cm
            </p>
            <p>
              <strong>{t('Weight (kg)')}:</strong> {player.weight} kg
            </p>
            <p>
              <strong>{t('Preferred Foot/Hand')}:</strong>{' '}
              {currentLanguage === 'en' ? player.preferredFootHand_en || player.preferredFootHand : player.preferredFootHand}
            </p>
          </div>

          {/* About Section */}
          <h3 className="margin-top center margin-bottom">{t('About')}</h3>
          <p
            className="center"
            dangerouslySetInnerHTML={{
              __html: currentLanguage === 'en' ? player.description_en || player.description : player.description,
            }}
          ></p>

          {/* Documents Section */}
          <h3 className="margin-top center margin-bottom">{t('Documents')}</h3>
          <div className="player-documents center margin-top">
            {documents.length > 0 ? (
              <ul className="documents-list">
                {documents.map((doc, index) => (
                  <li key={index} className="document-item">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary document-button"
                    >
                      {doc.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t('No documents available.')}</p>
            )}
          </div>

          {/* Highlights Section */}
          <h3 className="margin-top center margin-bottom">{t('Highlights')}</h3>
          <div className="player-video center margin-top">
            {player.videoLink ? (
              <iframe
                width="560"
                height="315"
                src={player.videoLink}
                title={t('Player Highlights')}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>{t('No video available')}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="multiple-buttons center margin-top">
            <Link to="/players" className="btn btn-primary">
              {t('Back to Players')}
            </Link>
            <a href="tel:+12523738698" className="btn btn-background">
              {t('Contact Agent')}
            </a>
            {player.videoLink && (
              <a href={player.videoLink} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                {t('Watch Highlights')}
              </a>
            )}
            {currentUser && currentUser.role === 'admin' && (
              <Link to={`/edit-player/${player._id}`} className="btn btn-edit">
                {t('Edit Player')}
              </Link>
            )}
          </div>
        </div>
      ) : (
        <p>{t('Player details not found.')}</p>
      )}
    </section>
  );
};

export default PlayerDetail;
