// src/components/Home.jsx

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Pagination,
  Navigation,
  EffectCoverflow,
  Autoplay,
} from 'swiper/modules';
import axios from 'axios';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './../css/home.css';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PostItem from './../components/PostItem';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
  const [domLoaded, setDomLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [latestPost, setLatestPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Ensure Swiper initializes only on the client-side
  useEffect(() => {
    setDomLoaded(true);
  }, []);

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
              key={index}
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
          <a href="/services" className="service-overview-blob-art">
            <span>{t('home.servicesOverview.serviceBlobs.athleteAssessment')}</span>
            <img src="/assets/Football.png" alt={t('services.serviceItems[0].imgAlt')} />
          </a>
          <a href="/services" className="service-overview-blob-art">
            <span>{t('home.servicesOverview.serviceBlobs.collegeMatching')}</span>
            <img src="/assets/Basketball.png" alt={t('services.serviceItems[1].imgAlt')} />
          </a>
          <a href="/services" className="service-overview-blob-art">
            <span>{t('home.servicesOverview.serviceBlobs.scholarshipGuidance')}</span>
            <img src="/assets/Rugby.png" alt={t('services.serviceItems[2].imgAlt')} />
          </a>
          <a href="/services" className="service-overview-blob-art">
            <span>{t('home.servicesOverview.serviceBlobs.eligibilitySupport')}</span>
            <img src="/assets/Volleyball.png" alt={t('services.serviceItems[3].imgAlt')} />
          </a>
          <a href="/services" className="service-overview-blob-art">
            <span>{t('home.servicesOverview.serviceBlobs.applicationVisa')}</span>
            <img src="/assets/Tennis.png" alt={t('services.serviceItems[4].imgAlt')} />
          </a>
          <a href="/services" className="service-overview-blob-art">
            <span>{t('home.servicesOverview.serviceBlobs.networkingMentorship')}</span>
            <img src="/assets/ESports.png" alt={t('services.serviceItems[5].imgAlt')} />
          </a>
        </div>
        <div className="services-button">
          <a href="/services" className="btn btn-background">
            {t('home.servicesOverview.servicesButton')}
          </a>
        </div>
      </section>

      {/* Image Slider Section for Transfers */}
      <section className="container image-slider-section-home">
        <div className="services-overview-title">
          <h1>{t('home.transfersSection.title')}</h1>
          <p style={{ padding: '20px' }}>
            {t('home.transfersSection.p')}
          </p>
        </div>
        <div className="image-slider-container">
          {domLoaded && (
            <Swiper
              modules={[Pagination, Navigation, EffectCoverflow, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              loop={true}
              className="swiper-container"
            >
              {transfers.map((transfer, index) => (
                <SwiperSlide key={index}>
                  <div className="image-slide-wrapper">
                    <img
                      src={transfer.image}
                      alt={`Slide ${index + 1}`}
                      className="slide-image"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="services-button center margin-top">
          <a href="/transfers" className="btn btn-primary">
            {t('common.transfersButton')}
          </a>
        </div>
      </section>

      {/* Players Slider Section */}
      <section className="container players-slider-section">
        <div className="services-overview-title">
          <h1>{t('home.playersSection.title')}</h1>
          <p style={{ padding: '20px' }}>
            {t('home.playersSection.p')}
          </p>
        </div>
        <div className="players-slider-container">
          {domLoaded && (
            <Swiper
              modules={[Pagination, Navigation, EffectCoverflow, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              loop={true}
            >
              {players.map((player, index) => (
                <SwiperSlide key={index}>
                  <div className="player-slide-wrapper">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="player-img"
                      loading="lazy"
                    />
                    <div className="player-info">
                      <h1>{currentLanguage === 'en' ? player.name_en || player.name : player.name}</h1>
                      <h2>{currentLanguage === 'en' ? player.clubname_en || player.clubname : player.clubname}</h2>
                      <ul>
                        <li>
                          <strong>{t('players.playerDetails.dob')}:</strong> {new Date(player.dob).toLocaleDateString()}
                        </li>
                        <li>
                          <strong>{t('players.playerDetails.sport')}:</strong> {currentLanguage === 'en' ? player.sport_en || player.sport : player.sport}
                        </li>
                        <li>
                          <strong>{t('players.playerDetails.position')}:</strong> {currentLanguage === 'en' ? player.position_en || player.position : player.position}
                        </li>
                        <li>
                          <strong>{t('players.playerDetails.nationality')}:</strong> {currentLanguage === 'en' ? player.nationality_en || player.nationality : player.nationality}
                        </li>
                      </ul>
                      <Link
                        to={`/players/${player._id}`}
                        className="btn btn-secondary"
                      >
                        {t('common.readMore')}
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="services-button center">
          <a href="/players" style={{ marginTop: '50px' }} className="btn btn-primary">
            {t('common.playersButton')}
          </a>
        </div>
      </section>

      {/* Blog Section */}
      <section className="home-blog-section container">
        <div className="blog-text-section">
          <h1 className='margin-bottom'>{t('home.blogSection.h1')}</h1>
          <p>{t('home.blogSection.p')}</p>
          <a href="/blog" className="btn btn-primary">
            {t('home.blogSection.viewAllBlogs')}
          </a>
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
