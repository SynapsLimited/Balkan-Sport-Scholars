import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/home.css';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PostItem from './../components/PostItem';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const stats = [
  { title: "Sports", value: 24 },
  { title: "Agents", value: 3 },
  { title: "Transfers", value: 10 },
  { title: "Locations", value: 2 }
];

const Home = () => {
  const { t } = useTranslation();
  const [transfers, setTransfers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [latestPost, setLatestPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTransferIndex, setCurrentTransferIndex] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Observe when stats section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const target = document.getElementById("stats-section");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  // Fetch Transfers Data
  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/transfers`
        );
        setTransfers(response.data);
      } catch (error) {
        console.error('Error fetching transfers:', error);
      }
    };

    fetchTransfers();
  }, []);

  // Fetch Players Data
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/players`
        );
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  // Fetch Posts Data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts`
        );
        setPosts(response.data);
        if (response.data.length > 0) {
          setLatestPost(response.data[0]);
        } else {
          setError(t('blog.posts.noPosts'));
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(t('blog.posts.error'));
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [t]);

  // Animate the counters
  useEffect(() => {
    let valueDisplays = document.querySelectorAll('.num');
    let interval = 2500; // Adjusted duration for a quicker count
    valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute('data-val'));
      let duration = Math.floor(interval / endValue);
      let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue;
        if (startValue === endValue) {
          clearInterval(counter);
        }
      }, duration);
    });
  }, []);

  // Auto-play sliders
  useEffect(() => {
    const transferInterval = setInterval(() => {
      setCurrentTransferIndex((prevIndex) =>
        prevIndex === transfers.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    const playerInterval = setInterval(() => {
      setCurrentPlayerIndex((prevIndex) =>
        prevIndex === players.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => {
      clearInterval(transferInterval);
      clearInterval(playerInterval);
    };
  }, [transfers.length, players.length]);

  return (
    <div>
      <Helmet>
        <title>{t('home.title')}</title>
      </Helmet>

      {/* Header Section */}
      <header className="hero-container header-home" id="intro">
        <div className="">
          <div className="center header-template">
            <h1 style={{ marginBottom: '19px', fontSize: '3rem' }}>
              {t('home.header.h1')}
            </h1>
            <p className="hero-p margin-bottom">
              {t('home.header.p')}
            </p>
            <a href="tel:+13472781736" className="btn btn-secondary">
              {t('common.callUs')}
            </a>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/Hero Image Homepage.png`}
          alt="Hero Image Homepage"
          style={{ display: 'none' }}
        />
      </header>

      {/* Information Section */}
      <section className="info-section container">
        <div className="info-left">
          <h1 className='margin-bottom'>{t('home.infoSection.h2')}</h1>
          <p>{t('home.infoSection.p')}</p>
          <a href="/about" className="btn btn-primary">{t('home.infoSection.about')}</a>
        </div>
        <div className="info-right">
          <img
            src={`${process.env.PUBLIC_URL}/assets/Balkan Sport Scholars Jersey 1.png`}
            alt="Balkan Sport Scholars Jersey"
          />
        </div>
      </section>

      {/* Stats Section */}
      <div id="stats-section" className="stats-section-container">
        <h1 className="stats-title">{t('home.statsSection.title')}</h1>
        <div className="stats-blobs">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title} // Use stat.title as key if unique
              className="stat-box"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="stat-title-container">
                <h3 className="stat-title">{t(`home.statsSection.stats.${stat.title}`)}</h3>
                <div className="stat-underline"></div>
              </div>
              <motion.span
                className="stat-value"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              >
                {isVisible ? <Counter from={0} to={stat.value} /> : "0"}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services Overview Section */}
      <section className="container services-overview-section">
        <div className="services-overview-title">
          <h1>{t('home.servicesOverview.title')}</h1>
          <p>{t('home.servicesOverview.p')}</p>
        </div>
        <div className="services-overview-blobs">
          <Link to="/services" className="service-overview-blob-art">
            <span>{t('home.servicesOverview.serviceBlobs.athleteAssessment')}</span>
            <img src="/assets/Football.png" alt={t('services.serviceItems[0].imgAlt')} />
          </Link>
          <Link to="/services" className="service-overview-blob-art">
            <span>{t('home.servicesOverview.serviceBlobs.collegeMatching')}</span>
            <img src="/assets/Basketball.png" alt={t('services.serviceItems[1].imgAlt')} />
          </Link>
          <Link to="/services" className="service-overview-blob-art">
            <span>{t('home.servicesOverview.serviceBlobs.scholarshipGuidance')}</span>
            <img src="/assets/Rugby.png" alt={t('services.serviceItems[2].imgAlt')} />
          </Link>
          <Link to="/services" className="service-overview-blob-art">
            <span>{t('home.servicesOverview.serviceBlobs.eligibilitySupport')}</span>
            <img src="/assets/Volleyball.png" alt={t('services.serviceItems[3].imgAlt')} />
          </Link>
          <Link to="/services" className="service-overview-blob-art">
            <span>{t('home.servicesOverview.serviceBlobs.applicationVisa')}</span>
            <img src="/assets/Tennis.png" alt={t('services.serviceItems[4].imgAlt')} />
          </Link>
          <Link to="/services" className="service-overview-blob-art">
            <span>{t('home.servicesOverview.serviceBlobs.networkingMentorship')}</span>
            <img src="/assets/ESports.png" alt={t('services.serviceItems[5].imgAlt')} />
          </Link>
        </div>
        <div className="services-button">
          <Link to="/services" className="btn btn-background">
            {t('home.servicesOverview.servicesButton')}
          </Link>
        </div>
      </section>

      {/* Image Slider Section for Transfers */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('home.transfersSection.title')}</h1>
          <p className="text-md">{t('home.transfersSection.p')}</p>
        </div>
        <div className="relative w-full md:w-[70%] h-[500px] mx-auto justify-center">
          <AnimatePresence initial={false} mode='wait'>
            {transfers.map((transfer, index) => (
              <motion.div
                key={transfer._id} // Use transfer._id if unique
                className="absolute w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentTransferIndex ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={transfer.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
            onClick={() => setCurrentTransferIndex((prevIndex) => (prevIndex === 0 ? transfers.length - 1 : prevIndex - 1))}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
            onClick={() => setCurrentTransferIndex((prevIndex) => (prevIndex === transfers.length - 1 ? 0 : prevIndex + 1))}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {transfers.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentTransferIndex ? 'bg-white' : 'bg-gray-400'
                }`}
                onClick={() => setCurrentTransferIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="text-center mt-8 mb-12">
          <Link to="/transfers" className="btn btn-primary">
            {t('common.transfersButton')}
          </Link>
        </div>
      </section>

      {/* Players Slider Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center">{t('home.playersSection.title')}</h1>
          <p className="text-md text-center mb-4">{t('home.playersSection.p')}</p>
        </div>
        <div className="relative w-full h-[44rem] md:h-[24rem]">
          <AnimatePresence initial={false} mode='wait'>
            {players.length > 0 && (
              <motion.div
                key={players[currentPlayerIndex]._id} // Use unique key for AnimatePresence
                className="absolute w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row h-full center bg-white-transparent backdrop-blur-md rounded-xl overflow-hidden">
                  <img
                    src={players[currentPlayerIndex].image}
                    alt={players[currentPlayerIndex].name}
                    className="w-full h-[300px] md:w-1/3 h-48 md:h-full object-cover"
                  />
                  <div className="w-full md:w-2/3 p-6 pl-4">
                    <h1 className="text-2xl font-bold mb-2">
                      {currentLanguage === 'en'
                        ? players[currentPlayerIndex].name_en || players[currentPlayerIndex].name
                        : players[currentPlayerIndex].name}
                    </h1>
                    <h2 className="text-xl mb-4">
                      {currentLanguage === 'en'
                        ? players[currentPlayerIndex].clubname_en || players[currentPlayerIndex].clubname
                        : players[currentPlayerIndex].clubname}
                    </h2>
                    <ul className="space-y-2 mb-6">
                      <li>
                        <strong>{t('players.playerDetails.dob')}:</strong> {new Date(players[currentPlayerIndex].dob).toLocaleDateString()}
                      </li>
                      <li>
                        <strong>{t('players.playerDetails.sport')}:</strong> {currentLanguage === 'en' ? players[currentPlayerIndex].sport_en || players[currentPlayerIndex].sport : players[currentPlayerIndex].sport}
                      </li>
                      <li>
                        <strong>{t('players.playerDetails.position')}:</strong> {currentLanguage === 'en' ? players[currentPlayerIndex].position_en || players[currentPlayerIndex].position : players[currentPlayerIndex].position}
                      </li>
                      <li>
                        <strong>{t('players.playerDetails.nationality')}:</strong> {currentLanguage === 'en' ? players[currentPlayerIndex].nationality_en || players[currentPlayerIndex].nationality : players[currentPlayerIndex].nationality}
                      </li>
                    </ul>
                    <Link
                      to={`/players/${players[currentPlayerIndex]._id}`}
                      className="btn btn-secondary"
                    >
                      {t('common.readMore')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
            onClick={() => setCurrentPlayerIndex((prevIndex) => (prevIndex === 0 ? players.length - 1 : prevIndex - 1))}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
            onClick={() => setCurrentPlayerIndex((prevIndex) => (prevIndex === players.length - 1 ? 0 : prevIndex + 1))}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {players.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentPlayerIndex ? 'bg-primary' : 'bg-primary-transparent'
              }`}
              onClick={() => setCurrentPlayerIndex(index)}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/players" className="btn btn-primary">
            {t('common.playersButton')}
          </Link>
        </div>
      </section>

      {/* Blog Section */}
      <section className="home-blog-section container">
        <div className="blog-text-section">
          <h1 className='margin-bottom'>{t('home.blogSection.h1')}</h1>
          <p>{t('home.blogSection.p')}</p>
          <Link to="/blog" className="btn btn-primary">
            {t('home.blogSection.viewAllBlogs')}
          </Link>
        </div>
        <div className="blog-slider-section">
          {isLoading ? (
            <p>{t('blog.posts.loading')}</p>
          ) : error ? (
            <p>{error}</p>
          ) : latestPost ? (
            <PostItem post={latestPost} />
          ) : (
            <p>{t('blog.posts.noPosts')}</p>
          )}
        </div>
      </section>
    </div>
  );
};

function Counter({ from, to }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (count < to) {
      // Adjusting the speed based on the target value
      const duration = to <= 99 ? 100 : 20; // If the value is small (like 30), slow it down
      const timer = setTimeout(() => setCount(count + 1), duration);
      return () => clearTimeout(timer);
    }
  }, [count, to]);

  return <>{count}</>;
}

export default Home;
