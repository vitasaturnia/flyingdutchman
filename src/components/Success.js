import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../assets/success.sass';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    const checkOrderStatus = async () => {
      if (!orderId) {
        navigate('/');
        return;
      }

      try {
        const orderRef = doc(db, 'orders', orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists() && orderSnap.data().status === 'completed') {
          // Clear the cart after successful payment
          clearCart();
        } else {
          navigate('/cart');
        }
      } catch (error) {
        console.error('Error checking order status:', error);
        navigate('/cart');
      }
    };

    checkOrderStatus();
  }, [orderId, navigate, clearCart]);

  return (
    <div className="success-container">
      <div className="success-wrapper">
        <div className="success-content">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          <div className="order-details">
            <p>Order ID: {orderId}</p>
          </div>
          <button 
            className="continue-shopping"
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success; 