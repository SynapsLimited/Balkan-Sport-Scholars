import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPlayer = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/players/${id}`);
        setPlayer(response.data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    getPlayer();
  }, [id]);

  const downloadDocuments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/players/${id}/documents/download`, {
        responseType: 'blob', // Important to handle binary data
      });

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${player.name}_documents.zip`); // Use player's name for the ZIP file
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading documents:', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section className="container player-detail">
      {player ? (
        <div className="player-detail-container">
          <div className="player-detail-header">
            <h1>{player.name}</h1>
            <p>{player.clubname}</p>
          </div>

          <div className="player-detail-thumbnail">
            <img src={player.image} alt={player.name} />
          </div>
          <p className="center">
            <strong>Sport:</strong> {player.sport}
          </p>
          <p className="center">
            <strong>Position:</strong> {player.position}
          </p>
          <p className="center">
            <strong>Nationality:</strong> {player.nationality}
          </p>
          <p className="center">
            <strong>Height:</strong> {player.height} cm
          </p>
          <p className="center">
            <strong>Weight:</strong> {player.weight} kg
          </p>
          <p className="center">
            <strong>Preferred Foot/Hand:</strong> {player.preferredFootHand}
          </p>
          <h3 className="margin-top center margin-bottom">About</h3>
          <p className="center" dangerouslySetInnerHTML={{ __html: player.description }}></p>

          <h3 className="margin-top center margin-bottom">Documents</h3>
          <div className="player-documents center margin-top">
            <button onClick={downloadDocuments} className="btn btn-primary">
              Download All Documents
            </button>
          </div>

          <h3 className="margin-top center margin-bottom">Highlights</h3>
          <div className="player-video">
            {player.videoLink ? (
              <iframe
                width="560"
                height="315"
                src={player.videoLink}
                title="Player Highlights"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>No video available</p>
            )}
          </div>
        </div>
      ) : (
        <p>Player details not found.</p>
      )}
      {player && (
        <div className="multiple-buttons">
          <a href="/players" className="btn btn-primary center margin-top">
            Back to Players
          </a>
          <a href="tel:+12523738698" className="btn btn-background center">
            Contact Agent
          </a>
          {player.videoLink && (
            <a href={player.videoLink} className="btn btn-secondary center">
              Watch Highlights
            </a>
          )}
        </div>
      )}
    </section>
  );
};

export default PlayerDetail;
