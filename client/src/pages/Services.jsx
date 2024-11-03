import React from 'react';
import '../css/services.css';
import { Helmet } from 'react-helmet-async';

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
        <p className='margin-bottom hero-p'>Our services at Balkan Sport Scholars are designed to support every step of an athlete’s journey from the Balkans to US college sports. </p>
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
   <p>From personalized recruitment and scholarship assistance to eligibility guidance and mentorship, we provide the resources athletes need to succeed academically and athletically in their new environments.</p>
 </div>

 {/* Service 1 */}
 <div className="service-item item-right">
   <div className="service-text">
     <h1>Athlete Assessment & Profiling</h1>
     <p>We evaluate each athlete's skills, academic standing, and athletic potential to create a personalized profile that highlights their strengths for college recruitment.</p>
   </div>
   <div className="service-img">
     <img src="assets/Football.png" alt="Football" />
   </div>
 </div>

 {/* Service 2 */}
 <div className="service-item reverse">
   <div className="service-text">
     <h1>College Matching & Placement</h1>
     <p>Our team connects athletes with colleges that best align with their academic goals, athletic level, and career aspirations, maximizing their opportunities for scholarships and success..</p>
   </div>
   <div className="service-img">
     <img src="assets/Basketball.png" alt="Basketball" />
   </div>
 </div>

 {/* Service 3 */}
 <div className="service-item item-right">
   <div className="service-text">
     <h1>Scholarship Guidance</h1>
     <p>We guide athletes through the scholarship application process, helping them secure the best possible financial aid packages and athletic scholarships.</p>
   </div>
   <div className="service-img">
     <img src="assets/Volleyball.png" alt="Volleyball" />
   </div>
 </div>

 {/* Service 4 */}
 <div className="service-item reverse">
   <div className="service-text">
     <h1>NCAA/NAIA/NJCAA Eligibility Support</h1>
     <p>We assist athletes in meeting eligibility requirements for NCAA and NAIA programs, ensuring they’re prepared to compete at the collegiate level in compliance with US college sports regulations.</p>
   </div>
   <div className="service-img">
     <img src="assets/Rugby.png" alt="Rugby" />
   </div>
 </div>

 {/* Service 5 */}
 <div className="service-item item-right">
   <div className="service-text">
     <h1>Application & Visa Assistance</h1>
     <p>We provide support with the entire college application process, including essay guidance, document preparation, and F-1 student visa applications.</p>
   </div>
   <div className="service-img">
     <img src="assets/Tennis.png" alt="Tennis" />
   </div>
 </div>

 {/* Service 6 */}
 <div className="service-item reverse">
   <div className="service-text">
     <h1>Networking & Mentorship </h1>
     <p>Through a network of former athletes, college coaches, and sports industry experts, we provide mentorship and career guidance, helping athletes build valuable connections in the US sports ecosystem..</p>
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
