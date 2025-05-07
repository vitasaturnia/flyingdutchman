import React from 'react';
import { motion } from 'framer-motion';
import '../assets/about.sass';
import me from '../assets/me.jpeg';
import rocky from '../assets/rocky.jpg';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const About = () => {
  return (
    <div className="about-container">
      <section className="hero-section">
        <motion.h1
          className="title gradient-text"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          Bringing forth the future of electronics
        </motion.h1>
        <motion.p
          className="subtitle"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          FD Electronics is a company dedicated to offering great products at even greater prices.
        </motion.p>
      </section>

      <section className="mission-section">
        <motion.div
          className="mission-card"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <h3 className="card-title">Our Mission</h3>
          <p className="card-text">
            To provide quality electronics at unbeatable prices, whether new or pre-owned, backed by honest service and careful selection.
          </p>
        </motion.div>

        <motion.div
          className="mission-card"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <h3 className="card-title">Our Vision</h3>
          <p className="card-text">
            To build a trusted electronics business that can offer the best prices and exceptional service, growing one satisfied customer at a time.
          </p>
        </motion.div>

        <motion.div
          className="mission-card"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.8 }}
        >
          <h3 className="card-title">Our Values</h3>
          <p className="card-text">
            Honesty, quality, and customer satisfaction are at the core of everything we do. We carefully select and verify each product, ensuring you get the best value for your money.
          </p>
        </motion.div>
      </section>

      <section className="team-section">
        <motion.h1
          className="title gradient-text"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          Meet The Team
        </motion.h1>
        <div className="team-grid">
          <motion.div
            className="team-member"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 1 }}
            style={{ backgroundColor: '#2d3436', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <img src={me} alt="Dion Maarse" className="member-image" />
            <h4 className="member-name" style={{ color: 'white' }}>Dion Maarse</h4>
            <p className="member-role" style={{ color: 'white' }}>"The Flying Dutchman"</p>
          </motion.div>
          <motion.div
            className="team-member"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 1.2 }}
            style={{ backgroundColor: '#2d3436', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <img 
              src={rocky} 
              alt="Rocky" 
              className="member-image"
            />
            <h4 className="member-name" style={{ color: 'white' }}>Rocky</h4>
            <p className="member-role" style={{ color: 'white' }}>"The Good Boy"</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
