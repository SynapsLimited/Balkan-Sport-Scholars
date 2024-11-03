import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Loader from '../components/Loader';
import DeletePlayer from './DeletePlayer';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const PlayerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Destructure t from useTranslation
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/players`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        setPlayers(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchPlayers();
  }, [id, token]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="dashboard">
      <div className="blog-title-filtered">
        <h1>{t('Player Dashboard')}</h1>
      </div>

      {isLoading ? (
        <Loader />
      ) : players.length > 0 ? (
        <div className="container dashboard-container">
          {players.map((player) => (
            <article key={player._id} className="dashboard-post">
              <div className="dashboard-post-info">
                <div className="dashboard-post-thumbnail">
                  <img src={player.image} alt={player.name} />
                </div>
                <h4>{player.name}</h4>
                <p>{player.clubname}</p>
              </div>
              <div className="dashboard-post-actions">
                <Link to={`/players/${player._id}`} className="btn btn-background">
                  {t('View')}
                </Link>
                <Link to={`/players/${player._id}/edit`} className="btn btn-primary">
                  {t('Edit')}
                </Link>
                <DeletePlayer playerId={player._id} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center">{t('You have no players yet!')}</h2>
      )}
    </section>
  );
};

export default PlayerDashboard;
