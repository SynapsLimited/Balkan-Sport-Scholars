import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import './../css/transfers.css';

const Transfers = () => {
  const { t, i18n } = useTranslation();
  const [transfers, setTransfers] = useState([]);
  const [videos, setVideos] = useState([]);
  const currentLanguage = i18n.language;
  const [currentTransferIndex, setCurrentTransferIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

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

  const nextTransfer = () => {
    setCurrentTransferIndex((prevIndex) =>
      prevIndex === transfers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTransfer = () => {
    setCurrentTransferIndex((prevIndex) =>
      prevIndex === 0 ? transfers.length - 1 : prevIndex - 1
    );
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <Helmet>
        <title>{t('transfers.pageTitle')}</title>
      </Helmet>
      <header className="hero-container header-transfers" id="intro">
        <div className="">
          <div className="center header-template">
            <h1 className="margin-bottom">{t('transfers.title')}</h1>
            <p className="margin-bottom hero-p">
              {t('transfers.header')}
            </p>
            <a href="/contact" className="btn btn-secondary">
              {t('common.contact')}
            </a>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/Hero Image Transfers-500w.png`}
          alt={t('transfers.header.h1')}
          style={{ display: 'none' }}
        />
      </header>

      <div className="services-overview-title margin-top">
        <h1>{t('transfers.sectionTitle')}</h1>
      </div>
      <section className="container mx-auto px-4 py-8">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTransferIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white-transparent backdrop-blur-sm rounded-lg shadow-lg p-8"
            >
              {transfers[currentTransferIndex] && (
                <div className="flex flex-col md:flex-row items-center">
                  <img
                    src={transfers[currentTransferIndex].image}
                    alt={transfers[currentTransferIndex].fullName}
                    className="w-64 h-64 object-cover rounded-full mb-4 md:mb-0 md:mr-8"
                  />
                  <div className="flex-1">
                    <h2 className="text-3xl font-[900] tracking-normal mb-9 md:text-left">
                      {transfers[currentTransferIndex].fullName}
                    </h2>
                    <div className="flex items-center mb-4">
                      <span className="text-lg font-semibold text-primary">
                        {transfers[currentTransferIndex].previousClub}
                      </span>
                      <span className="mx-4 text-2xl">→</span>
                      <span className="text-lg font-semibold text-secondary">
                        {transfers[currentTransferIndex].currentClub}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {currentLanguage === 'en'
                        ? transfers[currentTransferIndex].description_en ||
                          transfers[currentTransferIndex].description
                        : transfers[currentTransferIndex].description}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevTransfer}
            className="absolute top-1/4 md:top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTransfer}
            className="absolute top-1/4 md:top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="services-overview-title">
          <h1>{t('transfers.highlights')}</h1>
        </div>
        <div className="relative mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideoIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="aspect-w-16 aspect-h-9"
            >
              {videos[currentVideoIndex] && (
                <iframe
                  src={videos[currentVideoIndex].youtubeLink}
                  title={`${t('transfers.videoTitle', { number: currentVideoIndex + 1 })}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[500px] rounded-lg shadow-lg"
                ></iframe>
              )}
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevVideo}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextVideo}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Transfers;

