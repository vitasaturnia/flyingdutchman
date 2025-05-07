import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/header.sass';
import logo from '../assets/logofd.png';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo} alt="Electronics Logo" style={{ maxHeight: '3.5rem', marginRight: '0.5rem' }} />
        </Link>

        <button
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          {isActive ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div 
            className="navbar-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="navbar-start">
              <Link className="navbar-item" to="/shop">
                Shop
              </Link>
              <Link className="navbar-item" to="/sell">
                Sell your device
              </Link>
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons" style={{ gap: '0.5rem' }}>
                  <Link className="navbar-item" to="/cart">
                    <i className="fas fa-shopping-basket"></i>
                    {isMobile && <span className="cart-text"></span>}
                  </Link>
                  <Link className="button is-light is-outlined" to="/login">
                    Log in
                  </Link>
                  <Link className="button is-light" to="/signup">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
