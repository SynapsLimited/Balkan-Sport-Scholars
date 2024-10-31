import React from 'react';
import '../css/services.css';
import { Helmet } from 'react-helmet';

const Services = () => {
  return (
    <div>
      <Helmet>
                <title>Balkan Sport Scholars - Services</title>
            </Helmet>
    <header className="hero-container header-services" id="intro">
    <div className="container">
      <div className="center header-template">
        <h1 className='margin-bottom'>Services</h1>
        <p className='margin-bottom hero-p'>Lorem ipsum dolor sit amet consectetur. Sit eget nisi egestas sit integer phasellus nibh commodo. </p>
        <a href="/contact" className="btn btn-secondary">Contact</a>
      </div>
    </div>
    <img
      src={`${process.env.PUBLIC_URL}/assets/Hero Image Services-500w.png`}
      alt="Hero Image Services"
      style={{ display: 'none' }}
    />
  </header>
  <div className="services-container container">
   {/* Services Introduction */}
   <div className="services-intro">
   <h1>Services</h1>
   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius, eligendi. Magnam voluptate ducimus doloremque.</p>
 </div>

 {/* Service 1 */}
 <div className="service-item item-right">
   <div className="service-text">
     <h1>Manager Contacts</h1>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio accusamus laborum repudiandae asperiores.</p>
   </div>
   <div className="service-img">
     <img src="assets/football.png" alt="Football" />
   </div>
 </div>

 {/* Service 2 */}
 <div className="service-item reverse">
   <div className="service-text">
     <h1>Manager Negotiations</h1>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio accusamus laborum repudiandae asperiores.</p>
   </div>
   <div className="service-img">
     <img src="assets/basketball.png" alt="Basketball" />
   </div>
 </div>

 {/* Service 3 */}
 <div className="service-item item-right">
   <div className="service-text">
     <h1>English Consulting</h1>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio accusamus laborum repudiandae asperiores.</p>
   </div>
   <div className="service-img">
     <img src="assets/Volleyball.png" alt="Volleyball" />
   </div>
 </div>

 {/* Service 4 */}
 <div className="service-item reverse">
   <div className="service-text">
     <h1>Transcription Evaluation</h1>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio accusamus laborum repudiandae asperiores.</p>
   </div>
   <div className="service-img">
     <img src="assets/Rugby.png" alt="Rugby" />
   </div>
 </div>

 {/* Service 5 */}
 <div className="service-item item-right">
   <div className="service-text">
     <h1>Student Visa Assistance</h1>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio accusamus laborum repudiandae asperiores.</p>
   </div>
   <div className="service-img">
     <img src="assets/Tennis.png" alt="Tennis" />
   </div>
 </div>

 {/* Service 6 */}
 <div className="service-item reverse">
   <div className="service-text">
     <h1>General Consulting & Support</h1>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, optio accusamus laborum repudiandae asperiores.</p>
   </div>
   <div className="service-img">
     <img src="assets/ESports.png" alt="ESports" />
   </div>
 </div>
 </div>
 </div>
  );
};

export default Services;
