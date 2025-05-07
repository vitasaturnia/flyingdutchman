import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/footer.sass';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-12-mobile is-4-desktop">
            <h3 className="footer-title has-text-centered-mobile">FD Electronics</h3>
            <p className="footer-description has-text-centered-mobile">
              Your one-stop shop for electronics at great prices.
            </p>
            <div className="social-links has-text-centered" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
              <a href="tel:+15551234567" className="social-link">
                <i className="fas fa-phone"></i>
              </a>
              <a href="https://wa.me/15551234567" className="social-link">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="mailto:info@electronics.com" className="social-link">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://facebook.com/fdelectronics" className="social-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com/fdelectronics" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div className="column is-12-mobile is-4-desktop">
            <h3 className="footer-title has-text-centered-mobile">Quick Links</h3>
            <ul className="footer-links has-text-centered-mobile" style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/">Home</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/shop">Shop</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/sell">Sell Your Device</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/about">About Us</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="column is-12-mobile is-4-desktop">
            <h3 className="footer-title has-text-centered-mobile">Contact Us</h3>
            <ul className="footer-contact has-text-centered-mobile" style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <i className="fas fa-map-marker-alt"></i>
                <a href="https://www.google.com/maps/search/?api=1&query=6539+Fox+Lane+Palos+Heights+IL+60463" target="_blank" rel="noopener noreferrer">
                  <span>6539 Fox Lane, Palos Heights, IL 60463</span>
                </a>
              </li>
              <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <i className="fas fa-phone"></i>
                <a href="tel:+13606032526">
                  <span>+1 (360) 603-2526</span>
                </a>
              </li>
              <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <i className="fas fa-envelope"></i>
                <a href="mailto:support@fdelectronics.com">
                  <span>support@fdelectronics.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom has-text-centered" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #dbdbdb' }}>
          <p>&copy; {new Date().getFullYear()} FD Electronics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
