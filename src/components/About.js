import React from 'react';
import { motion } from 'framer-motion';
import '../assets/about.sass';
import me from '../assets/me.jpeg';
import rocky from '../assets/rocky.jpg';

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

const cardVariants = {
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

const About = () => {
  return (
    <motion.div 
      className="about-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <section className="hero-section">
        <motion.h1
          className="title gradient-text"
          variants={itemVariants}
        >
          Bringing forth the future of electronics
        </motion.h1>
        <motion.p
          className="subtitle"
          variants={itemVariants}
        >
          FD Electronics is a company dedicated to offering great products at even greater prices.
        </motion.p>
      </section>

      <motion.section 
        className="mission-section"
        variants={containerVariants}
      >
        <motion.div
          className="mission-card"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <h3 className="card-title">Our Mission</h3>
          <p className="card-text">
            To provide quality electronics at unbeatable prices, whether new or pre-owned, backed by honest service and careful selection.
          </p>
        </motion.div>

        <motion.div
          className="mission-card"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <h3 className="card-title">Our Vision</h3>
          <p className="card-text">
            To build a trusted electronics business that can offer the best prices and exceptional service, growing one satisfied customer at a time.
          </p>
        </motion.div>

        <motion.div
          className="mission-card"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <h3 className="card-title">Our Values</h3>
          <p className="card-text">
            Honesty, quality, and customer satisfaction are at the core of everything we do. We carefully select and verify each product, ensuring you get the best value for your money.
          </p>
        </motion.div>
      </motion.section>

      <section className="team-section">
        <motion.h1
          className="title gradient-text"
          variants={itemVariants}
        >
          Meet The Team
        </motion.h1>
        <motion.div 
          className="team-grid"
          variants={containerVariants}
        >
          <motion.div
            className="team-member"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            style={{ backgroundColor: '#2d3436', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <motion.img 
              src={me} 
              alt="Dion Maarse" 
              className="member-image"
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            />
            <h4 className="member-name" style={{ color: 'white' }}>Dion Maarse</h4>
            <p className="member-role" style={{ color: 'white' }}>"The Flying Dutchman"</p>
          </motion.div>
          <motion.div
            className="team-member"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            style={{ backgroundColor: '#2d3436', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <motion.img 
              src={rocky} 
              alt="Rocky" 
              className="member-image"
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            />
            <h4 className="member-name" style={{ color: 'white' }}>Rocky</h4>
            <p className="member-role" style={{ color: 'white' }}>"The Good Boy"</p>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default About;
