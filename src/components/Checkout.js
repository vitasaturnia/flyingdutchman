import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../assets/checkout.sass';

// Replace with your publishable key
const stripePromise = loadStripe('pk_test_51RMGVXQ4SR5JR7BXuFvUrWJIq47i2marB4hY7M34IAoq6VbQDCVZ59nJgucPVvpLepjrPtYZgyaFMK84GFh3QXYz00S3Y83DIu');

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      
      // First, create an order document in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: getCartTotal(),
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      // Create a checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          orderId: orderRef.id,
        }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
        // Update order status to failed
        await updateDoc(orderRef, {
          status: 'failed',
          error: result.error.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Review your order and proceed to payment</p>
        </div>

        <div className="checkout-content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {items.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="payment-section">
            <button 
              className="checkout-button"
              onClick={handleCheckout}
            >
              Proceed to Payment
            </button>
            <p className="secure-payment">
              <i className="fas fa-lock"></i>
              Secure payment powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 