import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../assets/sell.sass';

const phoneData = {
  Apple: {
    'iPhone 16': { 
      variants: ['iPhone 16', 'iPhone 16 Pro', 'iPhone 16 Pro Max'],
      storage: ['128GB', '256GB', '512GB', '1TB'],
      colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
    },
    'iPhone 15': { 
      variants: ['iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max'],
      storage: ['128GB', '256GB', '512GB'],
      colors: ['Black', 'Blue', 'Green', 'Pink', 'Yellow']
    },
    'iPhone 14': { 
      variants: ['iPhone 14', 'iPhone 14 Pro', 'iPhone 14 Pro Max'],
      storage: ['128GB', '256GB', '512GB'],
      colors: ['Midnight', 'Purple', 'Starlight', 'Blue', 'Red']
    },
    'iPhone 13': { 
      variants: ['iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max'],
      storage: ['128GB', '256GB', '512GB'],
      colors: ['Midnight', 'Blue', 'Pink', 'Starlight', 'Red']
    },
    'iPhone 12': { 
      variants: ['iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max'],
      storage: ['64GB', '128GB', '256GB'],
      colors: ['Black', 'White', 'Blue', 'Green', 'Red']
    },
    'iPhone 11': { 
      variants: ['iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max'],
      storage: ['64GB', '128GB', '256GB'],
      colors: ['Black', 'Green', 'Purple', 'White', 'Yellow', 'Red']
    }
  },
  Samsung: {
    'Galaxy S25': { 
      variants: ['Galaxy S25', 'Galaxy S25+', 'Galaxy S25 Ultra'],
      storage: ['128GB', '256GB', '512GB', '1TB'],
      colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow']
    },
    'Galaxy S24': { 
      variants: ['Galaxy S24', 'Galaxy S24+', 'Galaxy S24 Ultra'],
      storage: ['128GB', '256GB', '512GB'],
      colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow']
    },
    'Galaxy S23': { 
      variants: ['Galaxy S23', 'Galaxy S23+', 'Galaxy S23 Ultra'],
      storage: ['128GB', '256GB', '512GB'],
      colors: ['Phantom Black', 'Cream', 'Green', 'Lavender']
    },
    'Galaxy S22': { 
      variants: ['Galaxy S22', 'Galaxy S22+', 'Galaxy S22 Ultra'],
      storage: ['128GB', '256GB'],
      colors: ['Phantom Black', 'White', 'Pink Gold', 'Green']
    },
    'Galaxy S21': { 
      variants: ['Galaxy S21', 'Galaxy S21+', 'Galaxy S21 Ultra'],
      storage: ['128GB', '256GB'],
      colors: ['Phantom Gray', 'Phantom White', 'Phantom Violet', 'Phantom Pink']
    },
    'Galaxy S20': { 
      variants: ['Galaxy S20', 'Galaxy S20+', 'Galaxy S20 Ultra'],
      storage: ['128GB', '256GB'],
      colors: ['Cosmic Gray', 'Cloud Blue', 'Cloud Pink', 'Aura Red']
    }
  },
  Google: {
    'Pixel 9': { 
      variants: ['Pixel 9', 'Pixel 9 Pro', 'Pixel 9 Pro XL'],
      storage: ['128GB', '256GB', '512GB'],
      colors: ['Obsidian', 'Porcelain', 'Hazel', 'Rose']
    },
    'Pixel 8': { 
      variants: ['Pixel 8', 'Pixel 8 Pro'],
      storage: ['128GB', '256GB'],
      colors: ['Obsidian', 'Hazel', 'Rose', 'Mint']
    },
    'Pixel 7': { 
      variants: ['Pixel 7', 'Pixel 7 Pro'],
      storage: ['128GB', '256GB'],
      colors: ['Obsidian', 'Snow', 'Lemongrass']
    },
    'Pixel 6': { 
      variants: ['Pixel 6', 'Pixel 6 Pro'],
      storage: ['128GB', '256GB'],
      colors: ['Stormy Black', 'Cloudy White', 'Sorta Seafoam']
    },
    'Pixel 5': { 
      variants: ['Pixel 5'],
      storage: ['128GB'],
      colors: ['Just Black', 'Sorta Sage']
    }
  }
};

const conditions = [
  { value: 'new', label: 'New - Sealed', description: 'Brand new, never opened, still sealed' },
  { value: 'mint', label: 'Mint - Like New', description: 'No signs of use, perfect condition' },
  { value: 'excellent', label: 'Excellent', description: 'Minor signs of use, works perfectly' },
  { value: 'good', label: 'Good', description: 'Some wear and tear, fully functional' },
  { value: 'fair', label: 'Fair', description: 'Visible wear, may have minor issues' }
];

const Sell = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    variant: '',
    condition: '',
    storage: '',
    color: '',
    isUnlocked: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  const goToStep = (stepNumber) => {
    // Only allow going to steps that have been completed
    const lastCompletedStep = Object.keys(formData).findIndex(key => !formData[key]) - 1;
    if (stepNumber <= lastCompletedStep + 1) {
      setStep(stepNumber);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div className="form-step" {...fadeInUp}>
            <h3>Select Your Phone Brand</h3>
            <div className="brand-grid">
              {Object.keys(phoneData).map(brand => (
                <motion.button
                  key={brand}
                  className={`brand-card ${formData.brand === brand ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, brand, model: '', variant: '', storage: '', color: '' }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{brand}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div className="form-step" {...fadeInUp}>
            <h3>Select Your Phone Model</h3>
            <div className="model-grid">
              {formData.model ? (
                <div className="selected-model-container">
                  <div className="model-card-container">
                    <div className="model-card selected">
                      {formData.model}
                    </div>
                    <motion.div 
                      className="variant-grid"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {phoneData[formData.brand][formData.model].variants.map(variant => (
                        <motion.button
                          key={variant}
                          className={`variant-card ${formData.variant === variant ? 'selected' : ''}`}
                          onClick={() => setFormData(prev => ({ ...prev, variant }))}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {variant}
                        </motion.button>
                      ))}
                    </motion.div>
                  </div>
                  <motion.button
                    className="sell-another-button"
                    onClick={() => setFormData(prev => ({ ...prev, model: '', variant: '' }))}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className="fas fa-arrow-left"></i>
                    Sell Another Type
                  </motion.button>
                </div>
              ) : (
                Object.keys(phoneData[formData.brand] || {}).map(model => (
                  <motion.div
                    key={model}
                    className="model-card-container"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div 
                      className={`model-card ${formData.model === model ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, model, variant: '', storage: '', color: '' }))}
                    >
                      {model}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div className="form-step" {...fadeInUp}>
            <h3>Storage Capacity</h3>
            <div className="storage-grid">
              {phoneData[formData.brand]?.[formData.model]?.storage.map(storage => (
                <motion.button
                  key={storage}
                  className={`storage-card ${formData.storage === storage ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, storage }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {storage}
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div className="form-step" {...fadeInUp}>
            <h3>Select Condition</h3>
            <div className="condition-grid">
              {conditions.map(condition => (
                <motion.div
                  key={condition.value}
                  className={`condition-card ${formData.condition === condition.value ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, condition: condition.value }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h4>{condition.label}</h4>
                  <p>{condition.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div className="form-step" {...fadeInUp}>
            <h3>Phone Details</h3>
            <div className="details-grid">
              <div className="form-group">
                <label>Color</label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select a color</option>
                  {phoneData[formData.brand]?.[formData.model]?.colors.map(color => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isUnlocked"
                    checked={formData.isUnlocked}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">Device is unlocked</span>
                </label>
                <p className="unlock-note">Note: We only accept unlocked devices for purchase or trade-in.</p>
              </div>
            </div>

            <h3 className="section-title">Your Contact Information</h3>
            <div className="contact-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="input-field"
                  required
                />
                <p className="input-note">We'll use this to send you the quote and arrange purchase.</p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="sell-container">
      <motion.div 
        className="sell-form-wrapper"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="sell-header">
          <h2 className="sell-title">Sell Your Phone</h2>
          <p className="sell-subtitle">Get the best price for your device</p>
        </div>

        <div className="progress-bar">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`progress-step ${stepNumber <= step ? 'active' : ''} ${stepNumber <= Object.keys(formData).findIndex(key => !formData[key]) ? 'clickable' : ''}`}
              onClick={() => goToStep(stepNumber)}
            />
          ))}
        </div>

        {renderStep()}

        <div className="form-navigation">
          {step > 1 && (
            <motion.button
              className="nav-button prev"
              onClick={prevStep}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-arrow-left"></i>
              Previous
            </motion.button>
          )}
          {step < 5 ? (
            <motion.button
              className="nav-button next"
              onClick={nextStep}
              disabled={
                (step === 1 && !formData.brand) ||
                (step === 2 && (!formData.model || !formData.variant)) ||
                (step === 3 && !formData.storage) ||
                (step === 4 && !formData.condition)
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
              <i className="fas fa-arrow-right"></i>
            </motion.button>
          ) : (
            <motion.button
              className="nav-button submit"
              onClick={() => console.log('Form submitted:', formData)}
              disabled={!formData.color}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
              <i className="fas fa-check"></i>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Sell;
