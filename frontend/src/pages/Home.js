import React from 'react';
import { Link } from 'react-router-dom';
import { FaAward, FaStar, FaUtensils, FaCalendarAlt } from 'react-icons/fa';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
    <section className="hero" style={{
      backgroundImage: 'url(/images/home-cafe-fausse.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Café Fausse</h1>
        <p className="hero-subtitle">Where Culinary Art Meets Elegance</p>
        <p className="hero-description">
          Experience the finest in contemporary French cuisine with a modern twist
        </p>
        <div className="hero-buttons">
          <Link to="/reservations" className="btn btn-primary">
            Reserve a Table
          </Link>
          <Link to="/menu" className="btn btn-secondary">
            View Menu
          </Link>
        </div>
      </div>
    </section>
      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaUtensils />
              </div>
              <h3>Exquisite Cuisine</h3>
              <p>Expertly crafted dishes using the finest seasonal ingredients</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaAward />
              </div>
              <h3>Award-Winning</h3>
              <p>Recognized by Michelin and top culinary critics worldwide</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaStar />
              </div>
              <h3>5-Star Service</h3>
              <p>Impeccable attention to detail and personalized dining experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaCalendarAlt />
              </div>
              <h3>Easy Reservations</h3>
              <p>Book your table online with our convenient reservation system</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview">
        <div className="container">
          <div className="about-preview-content">
            <div className="about-preview-text">
              <h2 className="section-title">Our Story</h2>
              <p>
                Founded in 2010 by renowned chef Jean-Pierre Dubois, Café Fausse has become 
                a beacon of culinary excellence in the heart of the city. Our philosophy combines 
                traditional French techniques with innovative modern approaches to create 
                unforgettable dining experiences.
              </p>
              <p>
                Every dish tells a story, every ingredient is carefully selected, and every 
                guest is treated to an evening of pure gastronomic delight.
              </p>
              <Link to="/about" className="btn btn-outline">
                Learn More About Us
              </Link>
            </div>
            <div className="about-preview-image">
              <div className="image-placeholder">
                <FaUtensils className="placeholder-icon" />
                <p>Chef at Work</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <div className="container">
          <h2 className="section-title">What Our Guests Say</h2>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="review-text">
                "An absolutely extraordinary dining experience! The attention to detail and 
                the flavors were simply divine. Café Fausse has set a new standard for 
                fine dining in our city."
              </p>
              <p className="review-author">— Sarah Mitchell, Food Critic</p>
            </div>
            <div className="review-card">
              <div className="review-stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="review-text">
                "The perfect venue for special occasions. The ambiance is elegant yet 
                welcoming, and the service is impeccable. Every course was a masterpiece."
              </p>
              <p className="review-author">— Michael Chen, Michelin Guide</p>
            </div>
            <div className="review-card">
              <div className="review-stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="review-text">
                "Café Fausse consistently delivers excellence. The wine pairings are superb, 
                and Chef Dubois's creativity knows no bounds. A must-visit destination."
              </p>
              <p className="review-author">— Emma Rodriguez, Wine Spectator</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="awards">
        <div className="container">
          <h2 className="section-title">Awards & Recognition</h2>
          <div className="awards-grid">
            <div className="award-item">
              <FaAward className="award-icon" />
              <h4>Michelin Star</h4>
              <p>2021, 2022, 2023</p>
            </div>
            <div className="award-item">
              <FaAward className="award-icon" />
              <h4>Best New Restaurant</h4>
              <p>James Beard Foundation</p>
            </div>
            <div className="award-item">
              <FaAward className="award-icon" />
              <h4>Wine Spectator Award</h4>
              <p>Award of Excellence</p>
            </div>
            <div className="award-item">
              <FaAward className="award-icon" />
              <h4>Top 50 Restaurants</h4>
              <p>World's 50 Best</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready for an Unforgettable Experience?</h2>
            <p>Reserve your table today and discover why Café Fausse is the talk of the town</p>
            <Link to="/reservations" className="btn btn-primary btn-large">
              Make a Reservation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
