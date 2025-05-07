import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../assets/contactform.sass';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="contact-container">
      <motion.div 
        className="contact-form-wrapper"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">We'd love to hear from you</p>
        </div>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <div className="input-wrapper">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <div className="input-wrapper">
              <i className="fas fa-tag"></i>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject of your message"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <div className="input-wrapper">
              <i className="fas fa-comment-alt"></i>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message"
                rows="5"
              />
            </div>
          </div>

          {submitStatus === 'success' && (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <i className="fas fa-check-circle"></i>
              Message sent successfully!
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <i className="fas fa-exclamation-circle"></i>
              Oops! Something went wrong. Please try again.
            </motion.div>
          )}

          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'is-loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Send Message
              </>
            )}
          </button>
        </form>

        <div className="social-contact">
          <h3 className="social-title">Or contact us directly</h3>
          <div className="social-icons">
            <a href="tel:+13606032526" className="social-item phone">
              <div className="icon-wrapper">
                <i className="fas fa-phone"></i>
              </div>
              <span className="social-label">Call Us</span>
            </a>
            <a href="mailto:support@fdelectronics.com" className="social-item email">
              <div className="icon-wrapper">
                <i className="fas fa-envelope"></i>
              </div>
              <span className="social-label">Email</span>
            </a>
            <a href="https://wa.me/13606032526" className="social-item whatsapp">
              <div className="icon-wrapper">
                <i className="fab fa-whatsapp"></i>
              </div>
              <span className="social-label">WhatsApp</span>
            </a>
            <a href="https://facebook.com/fdelectronics" className="social-item facebook">
              <div className="icon-wrapper">
                <i className="fab fa-facebook-f"></i>
              </div>
              <span className="social-label">Facebook</span>
            </a>
            <a href="https://instagram.com/fdelectronics" className="social-item instagram">
              <div className="icon-wrapper">
                <i className="fab fa-instagram"></i>
              </div>
              <span className="social-label">Instagram</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm; 