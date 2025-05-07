import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/cart.sass';

const Cart = () => {
  const navigate = useNavigate();
  const { items: cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="cart-container">
      <motion.div className="cart-wrapper" {...fadeInUp}>
        <div className="cart-header">
          <h1 className="cart-title">Your Cart</h1>
          <p className="cart-subtitle">Review your items and proceed to checkout</p>
        </div>

        <AnimatePresence mode="wait">
          {cartItems.length === 0 ? (
            <motion.div 
              className="empty-cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <i className="fas fa-shopping-basket"></i>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <motion.button 
                className="continue-shopping"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              className="cart-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="cart-items">
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    className="cart-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                  >
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-specs">
                        {item.storage} • {item.color} • {item.condition}
                      </p>
                      <div className="item-price">${item.price.toFixed(2)}</div>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button 
                        className="remove-item"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <motion.button 
                  className="checkout-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Cart; 