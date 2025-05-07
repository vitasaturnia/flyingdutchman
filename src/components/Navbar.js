import React, { useState } from 'react';
import '../assets/header.sass';
import logo from '../assets/logofd.png';

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} alt="Electronics Logo" style={{ maxHeight: '3.5rem', marginRight: '0.5rem' }} />
        </a>

        <a
          role="button"
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={toggleMenu}
          href="#"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
    
          <a className="navbar-item" href="/products">
            Shop
          </a>
          <a className="navbar-item" href="/sell">
            Sell your device
          </a>
          <a className="navbar-item" href="/about">
            About
          </a>
         
          <a className="navbar-item" href="/contact">
            Contact
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons" style={{ gap: '0.5rem' }}>
              <a 
                className="navbar-item" 
                href="/cart" 
                style={{ 
                  fontSize: '1.25rem',
                  color: '#2c3e50',
                  transition: 'all 0.3s ease',
                  padding: '0.5em 0.75em',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                onMouseOut={(e) => e.currentTarget.style.color = '#2c3e50'}
              >
                <i className="fas fa-shopping-basket"></i>
              </a>
              <a className="button is-light is-outlined" href="/login">
                Log in
              </a>
              <a className="button is-light" href="/signup">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
