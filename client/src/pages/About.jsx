import React from 'react';
import '../css/about.css';
import { Helmet } from 'react-helmet-async';



const About = () => {
  return (
    <div>
      <Helmet>
                <title>Balkan Sport Scholars - About Us</title>
            </Helmet>
      <header className="hero-container header-about" id="intro">
        <div className="">
          <div className="center header-template">
            <h1 className='margin-bottom'>About</h1>
            <p className='hero-p margin-bottom'>Balkan Sport Scholars is dedicated to helping talented athletes from the Balkans unlock life-changing opportunities at top US colleges. With personalized guidance, we connect athletes to academic and athletic pathways that align with their goals, supporting them at every step as they transition to life as student-athletes in the US. </p>
            <a href="/contact" className="btn btn-secondary">Contact</a>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/Hero Image About-500w.png`}
          alt="Hero Image About"
          style={{ display: 'none' }}
        />
      </header>
      <section className="container presentation-section">
        <div className="presentation-text">
          <h2 className='margin-bottom'>What about <br /> <strong>Balkan Sports Scholars?</strong></h2>
          <p>
          Balkan Sport Scholars is a recruitment agency focused on transforming the futures of athletes from the Balkans by connecting them with academic and athletic opportunities at top US colleges. Founded on the belief that talent should never be limited by resources, we provide athletes with the tools, guidance, and support needed to compete at the collegiate level while securing a world-class education.          </p>
        </div>
        <div className="presentation-image">
          <img src="assets/BSS Logo transparent 1.png" alt="Visual representation" />
        </div>
      </section>

      <section className="container card-section">
        <div className="card">
          <h1 className='margin-bottom'>Mission</h1>
          <div className="card-content">
            <p>To pave the path for talented athletes to secure scholarships that enable them to pursue their sports and education simultaneously at prestigious universities and colleges in the United States.</p>
            <img src="assets/mission.png" alt="Mission Icon" />

          </div>
        </div>
        <div className="card">
          <h1 className='margin-bottom'>Vision</h1>
          <div className="card-content">
            <p>We envision a Balkan region where young athletes have the support and resources they need to excel in both their chosen sports and in academia. We believe that sports and education should go hand in hand, not be mutually exclusive.</p>
            <img src="assets/vision.png" alt="Vision Icon" />
          </div>
        </div>
        <div className="card">
          <h1 className='margin-bottom'>Values</h1>
          <div className="card-content">
            <p>Balkan Sport Scholars is built on values of opportunity, dedication, and integrity. We believe in empowering athletes through equal access to education and sports, guiding them with genuine support and a commitment to excellence as they pursue their dreams in the US.</p>
            <img src="assets/values.png" alt="Values Icon" />
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="team-title-container">
          <h2>Our Agents</h2>
        </div>
        <div className="team-wrapper">
          <div className="team-container">
            <input type="radio" name="slide" id="c1" defaultChecked />
            <label htmlFor="c1" className="team-card">
              <div className="row">
                <div className="icon">1</div>
                <div className="description">
                  <h4>Endi Rahmani</h4>
                  <p>Agent</p>
                </div>
              </div>
            </label>
            <input type="radio" name="slide" id="c2" />
            <label htmlFor="c2" className="team-card">
              <div className="row">
                <div className="icon">2</div>
                <div className="description">
                  <h4>Sokol Ymeraj</h4>
                  <p>Agent</p>
                </div>
              </div>
            </label>
            <input type="radio" name="slide" id="c3" />
            <label htmlFor="c3" className="team-card">
              <div className="row">
                <div className="icon">3</div>
                <div className="description">
                  <h4>Roland Peqini</h4>
                  <p>Agent</p>
                </div>
              </div>
            </label>

            <input type="radio" name="slide" id="c4" />
            <label htmlFor="c4" className="team-card">
              <div className="row">
                <div className="icon">4</div>
                <div className="description">
                  <h4>Synaps</h4>
                  <p>Marketing</p>
                </div>
              </div>
            </label>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
