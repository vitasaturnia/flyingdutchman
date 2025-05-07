import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../assets/newsletter.sass';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Add subscriber to Firestore
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email,
        subscribedAt: serverTimestamp(),
        status: 'active'
      });

      setStatus({
        type: 'success',
        message: 'Thank you for subscribing! 🎉',
      });
      setEmail('');
    } catch (error) {
      console.error('Error adding subscriber:', error);
      setStatus({
        type: 'error',
        message: 'Failed to subscribe. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <h2 className="newsletter-title">Stay Updated</h2>
        <p className="newsletter-description">
          Subscribe to our newsletter for the latest updates, exclusive offers, and tech insights.
        </p>
        
        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="newsletter-input"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`newsletter-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          
          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Newsletter; 