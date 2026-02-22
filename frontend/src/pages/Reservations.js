import React, { useState } from 'react';
import axios from 'axios';
import { FaClock, FaUsers, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import '../styles/Reservations.css';

const Reservations = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    phone_number: '',
    date: '',
    time: '',
    number_of_guests: '2',
    special_requests: '',
    newsletter_signup: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [reservationDetails, setReservationDetails] = useState(null);

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    // Validate form
    if (!formData.customer_name || !formData.customer_email || !formData.date || !formData.time) {
      setMessage({ text: 'Please fill in all required fields', type: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      // Combine date and time into ISO format
      const timeSlot = `${formData.date}T${formData.time}:00`;

      const reservationData = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        phone_number: formData.phone_number || null,
        time_slot: timeSlot,
        number_of_guests: parseInt(formData.number_of_guests),
        special_requests: formData.special_requests || '',
        newsletter_signup: formData.newsletter_signup
      };

      const response = await axios.post(
        'http://localhost:5000/api/reservations',
        reservationData
      );

      if (response.data.success) {
        setMessage({ 
          text: response.data.message, 
          type: 'success' 
        });
        setReservationDetails(response.data.reservation);
        
        // Reset form
        setFormData({
          customer_name: '',
          customer_email: '',
          phone_number: '',
          date: '',
          time: '',
          number_of_guests: '2',
          special_requests: '',
          newsletter_signup: false
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to create reservation. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="reservations-page">
      {/* Header Section */}
      <section className="reservations-header">
        <div className="container">
          <h1 className="page-title">Reserve Your Table</h1>
          <p className="page-subtitle">
            Secure your spot for an unforgettable dining experience
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="reservations-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <FaClock className="info-icon" />
              <h3>Dining Hours</h3>
              <p>Monday - Thursday: 5:00 PM - 10:00 PM</p>
              <p>Friday - Saturday: 5:00 PM - 11:00 PM</p>
              <p>Sunday: 4:00 PM - 9:00 PM</p>
            </div>
            <div className="info-card">
              <FaUsers className="info-icon" />
              <h3>Party Size</h3>
              <p>We accommodate parties of 1-12 guests</p>
              <p>For larger groups, please call us directly</p>
            </div>
            <div className="info-card">
              <FaCalendarAlt className="info-icon" />
              <h3>Cancellation Policy</h3>
              <p>Please provide 24 hours notice for cancellations</p>
              <p>Contact us at (555) 123-4567</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="reservations-form-section">
        <div className="container">
          <div className="form-wrapper">
            {reservationDetails ? (
              <div className="success-message-box">
                <FaCheckCircle className="success-icon" />
                <h2>Reservation Confirmed!</h2>
                <div className="confirmation-details">
                  <p><strong>Name:</strong> {reservationDetails.customer_name}</p>
                  <p><strong>Email:</strong> {reservationDetails.customer_email}</p>
                  <p><strong>Date & Time:</strong> {new Date(reservationDetails.time_slot).toLocaleString()}</p>
                  <p><strong>Table Number:</strong> {reservationDetails.table_number}</p>
                  <p><strong>Number of Guests:</strong> {reservationDetails.number_of_guests}</p>
                  {reservationDetails.special_requests && (
                    <p><strong>Special Requests:</strong> {reservationDetails.special_requests}</p>
                  )}
                </div>
                <p className="confirmation-note">
                  A confirmation email has been sent to {reservationDetails.customer_email}
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setReservationDetails(null);
                    setMessage({ text: '', type: '' });
                  }}
                >
                  Make Another Reservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="reservation-form">
                <h2 className="form-title">Booking Details</h2>

                {message.text && (
                  <div className={`message ${message.type}`}>
                    {message.text}
                  </div>
                )}

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="customer_name">Full Name *</label>
                    <input
                      type="text"
                      id="customer_name"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="customer_email">Email Address *</label>
                    <input
                      type="email"
                      id="customer_email"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleChange}
                      required
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="number_of_guests">Number of Guests *</label>
                    <select
                      id="number_of_guests"
                      name="number_of_guests"
                      value={formData.number_of_guests}
                      onChange={handleChange}
                      required
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="date">Date *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={today}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">Time *</label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="special_requests">Special Requests</label>
                  <textarea
                    id="special_requests"
                    name="special_requests"
                    value={formData.special_requests}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Allergies, dietary restrictions, special occasions, seating preferences..."
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="newsletter_signup"
                      checked={formData.newsletter_signup}
                      onChange={handleChange}
                    />
                    <span>Subscribe to our newsletter for exclusive offers and updates</span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-large"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Confirm Reservation'}
                </button>

                <p className="form-note">
                  * Required fields. By submitting this form, you agree to our reservation policies.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservations;
