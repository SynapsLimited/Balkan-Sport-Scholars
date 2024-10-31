import React, { useEffect, useState } from 'react';
import './../css/loadingscreen.css';
import BarLoader from "react-spinners/BarLoader";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Disable body scrolling when loading
    document.body.classList.add('loading-active');

    // Set a timeout to trigger the fade-out effect one second before loading ends
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2800); // Adjust based on the total loading time minus 1 second

    // Set a timeout to end the loading
    const loadingTimer = setTimeout(() => {
      setLoading(false);
      document.body.classList.remove('loading-active');
    }, 3800); // Total loading time

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(loadingTimer);
      document.body.classList.remove('loading-active');
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <img
          src={`${process.env.PUBLIC_URL}/assets/BSS Logo transparent 1.png`}
          alt="BSS Logo"
          className="loading-logo"
        />
        <BarLoader
          color="#BCA67D"
          height={8}
          loading={loading}
          speedMultiplier={0.5}
          width={windowWidth > 768 ? 500 : 300} // Use 500px for large screens, 300px for mobile
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
