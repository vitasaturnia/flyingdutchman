import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../assets/sell.sass';
import appleData from '../data/phones/apple.json';
import samsungData from '../data/phones/samsung.json';
import googleData from '../data/phones/google.json';

// Transform the JSON data to match the required structure
const phoneData = {
  Apple: Object.entries(appleData.phones).reduce((acc, [key, phone]) => {
    // Extract base model name (e.g., "iPhone 14" from "iPhone 14 Pro")
    const baseModel = phone.name.split(' ').slice(0, 2).join(' ');
    
    if (!acc[baseModel]) {
      acc[baseModel] = {
        variants: [],
        storage: phone.storage.map(s => s.size),
        colors: phone.colors
      };
    }
    
    // Add this variant to the base model's variants
    acc[baseModel].variants.push(phone.name);
    return acc;
  }, {}),
  
  Samsung: Object.entries(samsungData.phones).reduce((acc, [key, phone]) => {
    // Extract base model name (e.g., "Galaxy S24" from "Galaxy S24 Ultra")
    const baseModel = phone.name.split(' ').slice(0, 3).join(' ');
    
    if (!acc[baseModel]) {
      acc[baseModel] = {
        variants: [],
        storage: phone.storage.map(s => s.size),
        colors: phone.colors
      };
    }
    
    // Add this variant to the base model's variants
    acc[baseModel].variants.push(phone.name);
    return acc;
  }, {}),
  
  Google: Object.entries(googleData.phones).reduce((acc, [key, phone]) => {
    // Extract base model name (e.g., "Google Pixel 7" from "Google Pixel 7 Pro")
    const baseModel = phone.name.split(' ').slice(0, 3).join(' ');
    
    if (!acc[baseModel]) {
      acc[baseModel] = {
        variants: [],
        storage: phone.storage.map(s => s.size),
        colors: phone.colors
      };
    }
    
    // Add this variant to the base model's variants
    acc[baseModel].variants.push(phone.name);
    return acc;
  }, {})
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
    isUnlocked: false,
    email: ''
  });
  const [showPrice, setShowPrice] = useState(false);
  const [showUnlockWarning, setShowUnlockWarning] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto advance for checkbox
    if (type === 'checkbox' && checked) {
      setShowUnlockWarning(false);
    }
  };

  const handleSelection = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Only auto advance for specific selections
    if (step < 5 && (
      field === 'brand' || 
      field === 'variant' || 
      field === 'storage' || 
      field === 'condition'
    )) {
      nextStep();
    }
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

  const getPhonePrice = () => {
    const brandData = {
      'Apple': appleData,
      'Samsung': samsungData,
      'Google': googleData
    }[formData.brand];

    if (!brandData) return null;

    const phoneKey = Object.keys(brandData.phones).find(key => 
      brandData.phones[key].name === formData.variant
    );

    if (!phoneKey) return null;

    const phone = brandData.phones[phoneKey];
    const storageOption = phone.storage.find(s => s.size === formData.storage);
    
    if (!storageOption) return null;

    const conditionLabel = conditions.find(c => c.value === formData.condition)?.label;
    return storageOption.condition_prices[conditionLabel];
  };

  const handleProceed = () => {
    if (formData.isUnlocked) {
      setShowPrice(true);
      setShowUnlockWarning(false);
    } else {
      setShowUnlockWarning(true);
    }
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
                  onClick={() => handleSelection('brand', brand)}
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
                          onClick={() => handleSelection('variant', variant)}
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
                Object.keys(phoneData[formData.brand] || {})
                  .map(model => {
                    const baseModel = phoneData[formData.brand][model].variants[0];
                    return (
                      <motion.div
                        key={model}
                        className="model-card-container"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div 
                          className={`model-card ${formData.model === model ? 'selected' : ''}`}
                          onClick={() => setFormData(prev => ({ ...prev, model }))}
                        >
                          {baseModel}
                        </div>
                      </motion.div>
                    );
                  })
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
                  onClick={() => handleSelection('storage', storage)}
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
                  onClick={() => handleSelection('condition', condition.value)}
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
            <motion.div 
              className="price-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3>Estimated Value</h3>
              <div className="price-value">${getPhonePrice()}</div>
              <p className="price-note">This is an estimated value based on your device's condition and specifications.</p>
            </motion.div>

            <div className="form-actions">
              <div className="checkbox-group">
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
              </div>
              <motion.button
                className={`proceed-button ${!formData.isUnlocked ? 'locked' : ''}`}
                onClick={handleProceed}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {!formData.isUnlocked ? (
                  <>
                    <i className="fas fa-lock"></i>
                    Proceed to Sell
                  </>
                ) : (
                  'Proceed to Sell'
                )}
              </motion.button>
            </div>

            {showUnlockWarning && (
              <motion.div 
                className="unlock-warning"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className="fas fa-lock"></i>
                <span>We only accept unlocked devices</span>
              </motion.div>
            )}

            {formData.isUnlocked && (
              <motion.div 
                className="unlock-success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className="fas fa-check-circle"></i>
                <span>Great! Your device is eligible for trade-in</span>
              </motion.div>
            )}

            {showPrice && (
              <motion.div 
                className="contact-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="section-title">Your Contact Information</h3>
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
              </motion.div>
            )}
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
          {[
            { number: 1, label: 'Select Brand' },
            { number: 2, label: 'Choose Model' },
            { number: 3, label: 'Storage Size' },
            { number: 4, label: 'Condition' },
            { number: 5, label: 'Quote' }
          ].map(({ number, label }) => (
            <div
              key={number}
              className={`progress-step ${number <= step ? 'active' : ''} ${number <= Object.keys(formData).findIndex(key => !formData[key]) ? 'clickable' : ''}`}
              onClick={() => goToStep(number)}
              data-tooltip={label}
            >
              {number}
            </div>
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
