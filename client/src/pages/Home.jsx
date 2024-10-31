import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import axios from 'axios';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './../css/home.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PostItem from './../components/PostItem';
const Home = () => {
  const [transfers, setTransfers] = useState([]);
  const [players, setPlayers] = useState([]);  
  const [posts, setPosts] = useState([]);  // State to store all posts
  const [domLoaded, setDomLoaded] = useState(false);

  // Fetch Transfers Data
  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/transfers`);
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
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/players`);
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
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Get the latest post
  const latestPost = posts.length > 0 ? posts[0] : null; // Assuming posts are returned sorted by date in descending order



  // Animate the counters
  useEffect(() => {
    let valueDisplays = document.querySelectorAll(".num");
    let interval = 2500; // Adjusted duration for a quicker count
    valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val"));
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
        <title>Balkan Sport Scholars</title>
      </Helmet>
      
      {/* Header Section */}
      <header className="hero-container header-home" id="intro">
        <div className="container">
          <div className="center header-template">
            <h1 style={{marginBottom:"19px", fontSize:"3rem"}}>Balkan Sport Scholars</h1>
            <p className='hero-p margin-bottom'>“Empowering Balkan Athletes to reach new heights by connecting them with educational opportunities in the US.”</p>
            <a href="tel:+12523738698" className="btn btn-secondary">Call Us</a>
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
          <h2>What is Balkan Sport Scholars?</h2>
          <p>Balkan Sport Scholars is a recruitment agency dedicated to bridging the gap for talented athletes from the Balkans, a region with limited sports resources, by connecting them with academic and athletic opportunities at top-tier colleges in the United States. We aim to empower athletes to achieve their dreams, unlocking pathways to both educational excellence and athletic advancement in competitive college programs across the US.</p>
          <a href='/about' className="btn btn-primary">About</a>
        </div>
        <div className="info-right">
          <img
            src={`${process.env.PUBLIC_URL}/assets/Balkan Sport Scholars Jersey 1.png`} // Update this path as needed
            alt="Balkan Sport Scholars Jersey"
          />
        </div>
      </section>

      {/* Facts Section */}
      <h1 className='center facts-title'>Facts about Balkan Sport Scholars</h1>
      <section className="wrapper-counter">
        <div className="container-counter">
          <span className="text">Sports</span>
          <span className="num" data-val="24">0</span>
        </div>
        <div className="container-counter">
          <span className="text">Agents</span>
          <span className="num" data-val="3">0</span>
        </div>
        <div className="container-counter">
          <span className="text">Transfers</span>
          <span className="num" data-val="10">0</span>
        </div>
        <div className="container-counter">
          <span className="text">Locations</span>
          <span className="num" data-val="2">0</span>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="container services-overview-section">
        <div className="services-overview-title">
          <h1>Services</h1>
          <p>
            Our comprehensive services at Balkan Sport Scholars are designed to guide athletes from the Balkans through every step of their journey to US college sports. From personalized placement and scholarship support to eligibility preparation and mentorship, we ensure each athlete has the tools and resources to succeed academically and athletically.
          </p>
        </div>
        <div className="services-overview-blobs">
          <a href="services" className="service-overview-blob-art">
            <span>Manager Contacts</span>
            <img src="/assets/Football.png" alt="Manager Contacts" />
          </a>
          <a href="services" className="service-overview-blob-art">
            <span>Manager Negotiations</span>
            <img src="/assets/Basketball.png" alt="Manager Negotiations" />
          </a>
          <a href="services" className="service-overview-blob-art">
            <span>English Consulting</span>
            <img src="/assets/Rugby.png" alt="English Consulting" />
          </a>
          <a href="services" className="service-overview-blob-art">
            <span>Transcription Evaluation</span>
            <img src="/assets/Volleyball.png" alt="Transcription Evaluation" />
          </a>
          <a href="services" className="service-overview-blob-art">
            <span>Student Visa Assistance</span>
            <img src="/assets/Tennis.png" alt="Student Visa Assistance" />
          </a>
          <a href="services" className="service-overview-blob-art">
            <span>General Consulting & Support</span>
            <img src="/assets/ESports.png" alt="General Consulting & Support" />
          </a>
        </div>
        <div className="services-button">
          <a href="/services" className="btn btn-background">Services</a>
        </div>
      </section>

      {/* Image Slider Section for Transfers */}
      <section className="container image-slider-section-home">
        <div className=" services-overview-title">
          <h1>Transfers</h1>
          <p style={{padding:"20px"}}>
          At Balkan Sport Scholars, we're proud to share the journeys of our athletes who've made the leap from the Balkans to top US colleges. Each success story reflects hard work, resilience, and a dream realized, with our athletes now competing at high levels, earning scholarships, and making the most of their college experience both on and off the field.          </p>
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
                delay: 3000, // Slide every 3 seconds
                disableOnInteraction: false, // Disable autoplay when user interacts
                pauseOnMouseEnter: true, // Pause autoplay on hover
              }}
              loop={true}
              className="swiper-container"
            >
              {transfers.map((transfer, index) => (
                <SwiperSlide key={index}>
                  <div className="image-slide-wrapper">
                    <img
                      src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${transfer.image}`}
                      alt={`Slide ${index + 1}`}
                      className="slide-image"
                      loading="lazy" // Optional: Enables lazy loading
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="services-button center margin-top">
          <a href="/transfers" className="btn btn-primary">Transfers</a>
        </div>
      </section>

      {/* Players Slider Section */}
      <section className="container players-slider-section">
        <div className="services-overview-title">
          <h1>Players</h1>
          <p style={{padding:"20px"}}>
            Lorem ipsum dolor sit amet consectetur. Rhoncus in vel faucibus augue. Tempus nec egestas sapien turpis pharetra eleifend pharetra aliquam amet. Tempor mauris massa diam mi quis ac fusce. Urna ipsum volutpat pretium elit.
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
                delay: 3000, // Slide every 3 seconds
                disableOnInteraction: false, // Disable autoplay when user interacts
                pauseOnMouseEnter: true, // Pause autoplay on hover
              }}
              loop={true}
              
            >
              {players.map((player, index) => (
                <SwiperSlide key={index}>
                  <div className="player-slide-wrapper">
                    <img
                      src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${player.image}`}
                      alt={player.name}
                      className="player-img"
                      loading="lazy" // Optional: Enables lazy loading
                    />
                    <div className="player-info">
                      <h1>{player.name}</h1>
                      <h2>{player.clubname}</h2>
                      <ul>
                        <li><strong>Date of Birth:</strong> {new Date(player.dob).toLocaleDateString()}</li>
                        <li><strong>Sport:</strong> {player.sport}</li>
                        <li><strong>Position:</strong> {player.position}</li>
                        <li><strong>Nationality:</strong> {player.nationality}</li>
                      </ul>
                      <Link to={`/players/${player._id}`} className="btn btn-secondary">Read more</Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="services-button center">
          <a href="/players" style={{marginTop:"50px"}} className="btn btn-primary">Players</a>
        </div>
      </section>

      {/* Blog Section */}
      <section className="home-blog-section container">
        <div className="blog-text-section">
          <h2>Blog</h2>
          <p>Lorem ipsum dolor sit amet consectetur. Rhoncus in vel faucibus augue. Tempus nec egestas sapien turpis pharetra eleifend pharetra aliquam amet. Tempor mauris massa diam mi quis ac fusce. Urna ipsum volutpat pretium elit.</p>
          <a href='/blog' className="btn btn-primary">View All Blogs</a>
        </div>
        <div className="blog-slider-section">
          {latestPost && (
            <PostItem 
              postID={latestPost._id}
              category={latestPost.category}
              title={latestPost.title}
              description={latestPost.description}
              authorID={latestPost.creator}
              thumbnail={latestPost.thumbnail}
              createdAt={latestPost.createdAt}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
