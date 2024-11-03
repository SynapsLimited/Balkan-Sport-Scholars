import React, { useState, useEffect } from 'react';
import PlayerItem from './../players/PlayerItem';
import Loader from './../components/Loader';
import axios from 'axios';
import {Helmet} from 'react-helmet';

const Players = () => {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPlayers = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/players`);
                setPlayers(response.data);
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

    return (
        <section className="players">
            <Helmet>
<title>Balkan Sport Scholars - Players</title>
</Helmet>
<header className="hero-container header-players" id="intro">
        <div className="">
          <div className="center header-template">
            <h1 className='margin-bottom'>Players</h1>
            <p className='margin-bottom hero-p'>Our Current Players page features the talented athletes we're proudly supporting on their journey to US college sports. These individuals are dedicated, driven, and ready to make their mark, and we're honored to help them reach their goals through tailored guidance and support.</p>
            <a href="/contact" className="btn btn-secondary">Contact</a>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/Hero Image Players-500w.png`}
          alt="Hero Image Players"
          style={{ display: 'none' }}
        />
      </header>
            <div className="blog-title-filtered">
                <h1>Current Players</h1>
            </div>
            {players.length > 0 ? (
                <div className="container players-container">
                    {players.map(player => (
                        <PlayerItem
                            key={player._id}
                            player={player}
                        />
                    ))}
                </div>
            ) : (
                <h1 className="error-blog-not-found">No Players Found</h1>
            )}
        </section>
    );
};

export default Players;

