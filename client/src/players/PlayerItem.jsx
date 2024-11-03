// src/components/PlayerItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PlayerItem = ({ player }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const { _id, name, name_en, clubname, clubname_en, image, position, position_en, sport, sport_en } = player;

  return (
    <article className="player">
      <div className="player-thumbnail">
        <img src={image} alt={name} />
      </div>
      <div className="player-content">
        <Link to={`/players/${_id}`}>
          <h3>{currentLanguage === 'en' ? name_en || name : name}</h3>
        </Link>
        <p>
          {currentLanguage === 'en' ? clubname_en || clubname : clubname} - {currentLanguage === 'en' ? position_en || position : position}
        </p>
        <p>{t('Sport')}: {currentLanguage === 'en' ? sport_en || sport : sport}</p>

        <Link to={`/players/${_id}`} className="btn btn-secondary" style={{ marginTop: '30px' }}>
          {t('Player Details')}
        </Link>
      </div>
    </article>
  );
};

export default PlayerItem;
