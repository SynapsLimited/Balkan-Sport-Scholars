// src/components/PlayerPosts.jsx
import React, { useState, useEffect } from 'react';
import PlayerItem from './PlayerItem';
import Loader from './../components/Loader';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const PlayerPosts = ({ limit }) => {
  const { t } = useTranslation(); // Destructure t from useTranslation
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/players`);
        setPlayers(response?.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchPlayers();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const displayedPlayers = limit ? players.slice(0, limit) : players;

  return (
    <section className="posts">
      <div className="blog-title-filtered">
        <h1>{t('Players')}</h1>
      </div>
      {displayedPlayers.length > 0 ? (
        <div className="container posts-container">
          {displayedPlayers.map((player) => (
            <PlayerItem
              key={player._id}
              player={player}
            />
          ))}
        </div>
      ) : (
        <h1 className="error-blog-not-found">{t('No Players Found')}</h1>
      )}
    </section>
  );
};

export default PlayerPosts;
