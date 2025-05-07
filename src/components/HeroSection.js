import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaMoneyBillWave, FaExchangeAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Quality Guaranteed",
      description: "We only sell great products, and if the product is used, it has been carefully tested and is in perfect condition."
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Best Prices",
      description: "We take pride in our competitive pricing, with regular price checks and adjustments to ensure you always get the best deal possible."
    },
    {
      icon: <FaExchangeAlt />,
      title: "Expert Service",
      description: "Benefit from The Flying Dutchman's extensive experience in electronics and customer satisfaction."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="hero-content">
        <motion.h1 className="hero-title" variants={itemVariants}>
          <span className="gradient-text animate-gradient">The flying dutchman has arrived!</span>
          <motion.div 
            className="subtitle-container"
            variants={itemVariants}
          >
            <span className="subtitle-text">Say goodbye to overpriced electronics.</span>
            <div className="subtitle-underline"></div>
          </motion.div>
        </motion.h1>
       
        <motion.div 
          className="hero-cta"
          variants={itemVariants}
        >
          <Link to="/shop" className="cta-button primary">
            Explore Shop
          </Link>
          <Link to="/contact" className="cta-button secondary">
            Contact Us
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="features-section"
        variants={containerVariants}
      >
        <div className="features-container">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              variants={featureVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection; 