import React, { useState, useEffect } from 'react';
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
import './../css/transfers.css';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Transfers = () => {
  const { t, i18n } = useTranslation();
  const [transfers, setTransfers] = useState([]);
  const [videos, setVideos] = useState([]);
  const currentLanguage = i18n.language;

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

    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/transfers`
        );
        const videoData = response.data.filter(
          (transfer) => transfer.youtubeLink
        );
        setVideos(videoData);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchTransfers();
    fetchVideos();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Balkan Sport Scholars - {t('transfers.pageTitle')}</title>
      </Helmet>
      <header className="hero-container hero-container header-transfers" id="intro">
        <div className="">
          <div className="center header-template">
            <h1 className="margin-bottom">{t('transfers.headerTitle')}</h1>
            <p className="margin-bottom hero-p">
              {t('transfers.headerDescription')}
            </p>
            <a href="/contact" className="btn btn-secondary">
              {t('common.contact')}
            </a>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/Hero Image Transfers-500w.png`}
          alt="Hero Image Transfers"
          style={{ display: 'none' }}
        />
      </header>

      <div className="services-overview-title margin-top">
        <h1>{t('transfers.sectionTitle')}</h1>
      </div>
      <section className="container image-slider-section center">
        <Swiper
          spaceBetween={100}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Pagination, Navigation, EffectCoverflow, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 100,
            },
          }}
        >
          {transfers.map((transfer, index) => (
            <SwiperSlide key={index}>
              <div className="image-slide">
                <h2 className="player-name">
                  {transfer.fullName}
                </h2>
                <img src={transfer.image} alt={`Slide ${index + 1}`} />
                <div className="slide-content">
                  <div className="clubs">
                    <h2 className="previous-club">
                      {transfer.previousClub}
                    </h2>
                    <span className="arrow">→</span>
                    <h2 className="current-club">
                      {transfer.currentClub}
                    </h2>
                  </div>
                  <p>
                    {currentLanguage === 'en'
                      ? transfer.description_en || transfer.description
                      : transfer.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="container video-slider-section">
        <div className="services-overview-title">
          <h1>{t('transfers.highlights')}</h1>
        </div>
        <Swiper
          spaceBetween={100}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation
          modules={[Pagination, Navigation, EffectCoverflow, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 100,
            },
          }}
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <div className="video-slide">
                <iframe
                  src={video.youtubeLink}
                  title={`Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Transfers;
