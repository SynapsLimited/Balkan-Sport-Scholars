import React from 'react';
import { Link } from 'react-router-dom';

const PlayerItem = ({ player }) => {
    const { _id, name, clubname, image, position, sport } = player;

    return (
        <article className="player">
            <div className="player-thumbnail">
                <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${image}`} alt={name} />
            </div>
            <div className="player-content">
                <Link to={`/players/${_id}`}>
                    <h3>{name}</h3>
                </Link>
                <p>{clubname} - {position}</p>
                <p>Sport: {sport}</p>

                <Link to={`/players/${_id}`} className='btn btn-secondary' style={{marginTop:"30px"}}>
                    Player Details
                </Link>
                
            </div>
            
        </article>
    );
};

export default PlayerItem;
