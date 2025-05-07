import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../assets/checkout.sass';

// Replace with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

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
      console.log('Starting checkout process...');
      const stripe = await stripePromise;
      console.log('Stripe loaded:', !!stripe);
      
      // First, create an order document in Firestore
      console.log('Creating order in Firestore...');
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
      console.log('Order created with ID:', orderRef.id);

      // Create a checkout session
      console.log('Creating checkout session...');
      const response = await fetch('https://us-central1-fdelectronics-4cbf3.cloudfunctions.net/createCheckoutSession', {
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

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to create checkout session: ${errorData}`);
      }

      const session = await response.json();
      console.log('Checkout session created:', session);

      // Clear the cart before redirecting to Stripe
      clearCart();

      // Redirect to Stripe Checkout
      console.log('Redirecting to Stripe Checkout...');
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error('Stripe redirect error:', result.error);
        // Update order status to failed
        await updateDoc(orderRef, {
          status: 'failed',
          error: result.error.message,
        });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // You might want to show an error message to the user here
      alert('There was an error processing your payment. Please try again.');
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