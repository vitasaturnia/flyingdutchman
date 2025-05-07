import React from 'react';
import '../assets/footer.sass';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div className="column">
            <h3 className="footer-title">FD Electronics</h3>
            <p className="footer-description">
              Your one-stop shop for electronics at great prices.
            </p>
            <div className="social-links has-text-centered" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <a href="tel:+15551234567" className="social-link">
                <i className="fas fa-phone"></i>
              </a>
              <a href="https://wa.me/15551234567" className="social-link">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="mailto:info@electronics.com" className="social-link">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          
          <div className="column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/sell">Sell Your Device</a></li>

              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="column">
            <h3 className="footer-title has-text-centered">Contact Us</h3>
            <ul className="footer-contact has-text-centered" style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-map-marker-alt"></i>
                <span>6539 Fox Lane, Palos Heights, IL 60463</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-phone"></i>
                <span>+1 (360) 603-2526</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-envelope"></i>
                <span>support@fdelectronics.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FD Electronics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
