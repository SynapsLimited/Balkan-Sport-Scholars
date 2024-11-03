import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Loader from '../components/Loader';
import DeleteTransfer from './DeleteTransfer';
import { useTranslation } from 'react-i18next';

const DashboardTransfer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [transfers, setTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const currentLanguage = i18n.language;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchTransfers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/transfers`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTransfers(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchTransfers();
  }, [token]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="dashboard">
      <div className="blog-title-filtered">
        <h1>{t('transfers.dashboardTitle')}</h1>
      </div>

      {transfers.length ? (
        <div className="container dashboard-container">
          {transfers.map((transfer) => (
            <article key={transfer._id} className="dashboard-transfer">
              <div className="dashboard-transfer-info">
                <div className="dashboard-transfer-thumbnail">
                  <img src={transfer.image} alt="" />
                </div>
                <h4>
                  {transfer.fullName}
                </h4>
              </div>
              <div className="dashboard-transfer-actions">
                <Link
                  to={`/transfers/${transfer._id}/edit`}
                  className="btn btn-primary"
                >
                  {t('common.edit')}
                </Link>
                <DeleteTransfer transferId={transfer._id} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center">{t('transfers.noTransfers')}</h2>
      )}
    </section>
  );
};

export default DashboardTransfer;
