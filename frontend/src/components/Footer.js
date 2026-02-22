import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import '../styles/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSignup = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/newsletter/signup', {
        email: email
      });

      if (response.data.success) {
        setMessage(response.data.message);
        setEmail('');
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to subscribe. Please try again.');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-title">Café Fausse</h3>
            <p className="footer-description">
              An elegant fine-dining experience where culinary artistry meets exceptional service. 
              Join us for an unforgettable gastronomic journey.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>123 Elegant Street, Culinary District<br />New York, NY 10001</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <span>info@cafefausse.com</span>
              </div>
            </div>
          </div>

          {/* Hours Section */}
          <div className="footer-section">
            <h3 className="footer-title">Opening Hours</h3>
            <div className="hours-info">
              <div className="hours-item">
                <span className="day">Monday - Thursday</span>
                <span className="time">5:00 PM - 10:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="day">Friday - Saturday</span>
                <span className="time">5:00 PM - 11:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="day">Sunday</span>
                <span className="time">4:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section">
            <h3 className="footer-title">Newsletter</h3>
            <p className="newsletter-description">
              Subscribe to receive updates on exclusive events and seasonal menus.
            </p>
            <form onSubmit={handleNewsletterSignup} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                disabled={isLoading}
                required
              />
              <button 
                type="submit" 
                className="newsletter-button"
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className={`newsletter-message ${message.includes('success') || message.includes('already') ? 'success' : 'error'}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Café Fausse. All rights reserved.</p>
          <p className="footer-credits">Designed with excellence for an exceptional dining experience</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
