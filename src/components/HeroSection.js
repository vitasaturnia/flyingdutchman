import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaTruck, FaHeadset, FaAward, FaTag } from 'react-icons/fa';

const HeroSection = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Quality Guaranteed",
      description: "We only sell great products, and if the product is used, it has been carefully tested and is in perfect condition."
    },
    {
      icon: <FaTag />,
      title: "Best Prices",
      description: "We take pride in our competitive pricing, with regular price checks and adjustments to ensure you always get the best deal possible."
    },
    {
      icon: <FaAward />,
      title: "Expert Service",
      description: "Benefit from The Flying Dutchman's extensive experience in electronics and customer satisfaction."
    }
  ];

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="gradient-text">The flying dutchman has arrived</span>
          <br />
          <span className="hero-subtitle">Overpaying is history now.</span>
        </h1>
        <p className="hero-description">
          Discover the latest electronics for the best prices. 
        </p>
        <div className="hero-cta">
          <Link to="/products" className="cta-button primary">
            Explore Products
          </Link>
          <Link to="/contact" className="cta-button secondary">
            Contact Us
          </Link>
        </div>
      </div>

      <div className="features-section">
        <div className="features-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 