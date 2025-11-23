import React, { useState } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Contact = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('Please fill in all fields.');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    // EmailJS configuration
    const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS Service ID
    const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID
    const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS Public Key

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      reply_to: formData.email
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      setSubmitStatus('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitStatus(''), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('Sorry, something went wrong. Please try again.');
      
      setTimeout(() => setSubmitStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={isOpen ? 'contact-modal-overlay' : ''}>
      {isOpen && (
        <div className="contact-modal-overlay" onClick={onClose}></div>
      )}

      <div className="contact-modal-container">
        <button className="contact-close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="contact-title">Get in Touch !</h2>

        <div className="contact-content">
          <div className="contact-info">
            <p className="contact-description">
              If you want to see more of my work, collaborate, or even just chat,
              leave me a note!
            </p>
          </div>

          <div className="contact-form-wrapper">
            <div className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Enter Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Enter Your Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Enter Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  className="form-textarea"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>

              {submitStatus && <p className="submit-status">{submitStatus}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Contact;