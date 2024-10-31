import React from 'react';
import { Helmet } from 'react-helmet';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div>
            <Helmet>
                <title>Balkan Sport Scholars - Contact</title>
            </Helmet>
       <header className="hero-container header-contact" id="intro">
    <div className="container">
      <div className="center header-template">
        <h1 className='margin-bottom'>Contact</h1>
        <p className='margin-bottom hero-p'>Lorem ipsum dolor sit amet consectetur. Sit eget nisi egestas sit integer phasellus nibh commodo. </p>
        <a href="tel:+12523738698" className="btn btn-secondary">Call Us</a>
      </div>
    </div>
    <img
      src={`${process.env.PUBLIC_URL}/assets/Hero Image Contact.png`}
      alt="Hero Image Contact"
      style={{ display: 'none' }}
    />
  </header>
  <div className="contact-overview-title">
                <h1>Contact Details</h1>
            </div>

            <section className="container contact-section">
                <div className="blob location-blob">
                    <h2>Location</h2>
                    <img src="/assets/Europe.png" alt="Phone"/>
                    <a href=""><h4>Balkans</h4></a>
                    <img src="/assets/America.png" alt="Email" />
                    <a href=""><h4>America</h4></a>
                </div>
                <div className="blob phone-mail-blob">
                    <h2>Contact</h2>
                    <img src="/assets/phone-call.png" alt="Phone" />
                    <a href="tel:+12523738698"><h4>+1 (252) 373 8698</h4></a>
                    <img src="/assets/email.png" alt="Email" />
                    <a href="mailto:contact@balkansportsscholars.com"><h4>contact@balkansportsscholars.com</h4></a>
                </div>
                <div className="blob socials-blob">
                    <h2>Socials</h2>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" className="contact-link"><img src="/assets/facebook.png" alt="Facebook" /></a>
                        <a href="https://www.instagram.com" className="contact-link"><img src="/assets/instagram.png" alt="Instagram" /></a>
                        <a href="https://www.linkedin.com" className="contact-link"><img src="/assets/linkedin.png" alt="LinkedIn" /></a>
                        <a href="https://www.youtube.com" className="contact-link"><img src="/assets/youtube.png" alt="YouTube" /></a>
                    </div>
                </div>
            </section>

            <div className="contact-overview-title">
                <h1>Contact Now!</h1>
            </div>

            <ContactForm />
    </div>
  );
};

export default Contact;
