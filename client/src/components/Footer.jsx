import React from 'react';
import './../css/footer.css'

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundImage: `url('/assets/Footer Background.jpg')` }}>
      <div className="container footer-container">
        <div className="footer-top">
          <img src="/assets/BSS Logo transparent 1.png" alt="BSS Logo" className="footer-logo" />
          <h2 className="footer-quote">"Empowering Balkan athletes to reach new heights"</h2>
        </div>

        <div className="footer-bottom">
          <div className="footer-column footer-location">
            <h4>Location</h4>
            <div className="socials-container">
              <div className="social-row">
              <img src={`${process.env.PUBLIC_URL}/assets/America.png`} alt="America" />
              <span>New York, USA</span>
              </div>
              <div className="social-row">
              <img src={`${process.env.PUBLIC_URL}/assets/Europe.png`} alt="Europe" />
              <span>Tirana, Albania</span>
              </div>
            </div>
          </div>
          <div className="footer-column footer-contact">
            <h4>Contact</h4>
            <div className="socials-container">
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/phone-call.png`} alt="Phone Number" />
                <a href="tel:+12523738698" className="footer-link">+1 (252) 373 8698</a>
              </div>
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/email.png`} alt="Email" />
                <a href="mailto:contact@balkansportscholars.com" className="footer-link">contact@balkansportscholars.com</a>
              </div>
            </div>
          </div>
          <div className="footer-column footer-socials">
            <h4>Socials</h4>
            <div className="socials-container">
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/instagram.png`} alt="Instagram" />
                <a href="https://www.instagram.com" className="footer-link">Instagram</a>
              </div>
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/facebook.png`} alt="Facebook" />
                <a href="https://www.facebook.com" className="footer-link">Facebook</a>
              </div>
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/youtube.png`} alt="YouTube" />
                <a href="https://www.youtube.com" className="footer-link">YouTube</a>
              </div>
              <div className="social-row">
                <img src={`${process.env.PUBLIC_URL}/assets/linkedin.png`} alt="LinkedIn" />
                <a href="https://www.linkedin.com" className="footer-link">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copy">
          <p>Copyright &copy; Balkan Sport Scholars. All Rights Reserved</p>
          <p>Designed by <a href="http://www.synapslimited.eu" className="footer-copy-designed-by-synaps">Synaps</a></p>
        </div>
        <a className="blog-log-in-btn" href="/login">Log In</a>
      </div>
    </footer>
  );
};

export default Footer;
