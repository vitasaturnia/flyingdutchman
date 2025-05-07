import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/header.sass';
import '../assets/cart-dropdown.sass';
import logo from '../assets/logo.png';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items: cartItems, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleCartHover = (isHovering) => {
    if (!isMobile) {
      setIsCartOpen(isHovering);
    }
  };

  const handleCartClick = (e) => {
    if (isMobile) {
      e.preventDefault();
      navigate('/cart');
    } else {
      setIsCartOpen(!isCartOpen);
    }
  };

  return (
    <nav className="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo} alt="Electronics Logo" style={{ maxHeight: '3.5rem', marginRight: '0.5rem' }} />
        </Link>

        <button
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          {isActive ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </button>
      </div>

      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <Link className="navbar-item" to="/shop">
            Shop
          </Link>
          <Link className="navbar-item" to="/sell">
            Sell your device
          </Link>
          <Link className="navbar-item" to="/about">
            About
          </Link>
          <Link className="navbar-item" to="/contact">
            Contact
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons" style={{ gap: '0.5rem' }}>
              <div 
                style={{ position: 'relative' }}
                onMouseEnter={() => handleCartHover(true)}
                onMouseLeave={() => handleCartHover(false)}
                onClick={handleCartClick}
              >
                <Link className="navbar-item" to="/cart">
                  <i className="fas fa-shopping-basket"></i>
                  {isMobile && <span className="cart-text">Cart</span>}
                </Link>

                {!isMobile && (
                  <div className={`cart-dropdown ${isCartOpen ? 'active' : ''}`}>
                    <div className="cart-dropdown-header">
                      <div className="cart-title">
                        <i className="fas fa-shopping-cart"></i>
                        Your Cart
                      </div>
                      <button className="close-cart" onClick={() => setIsCartOpen(false)}>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>

                    {cartItems.length === 0 ? (
                      <div className="empty-cart-dropdown">
                        <i className="fas fa-shopping-basket"></i>
                        <h3>Your cart is empty</h3>
                        <p>Looks like you haven't added any items to your cart yet.</p>
                        <button className="continue-shopping" onClick={() => navigate('/shop')}>
                          <i className="fas fa-arrow-left"></i>
                          <span>Continue Shopping</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="cart-dropdown-items">
                          {cartItems.map((item) => (
                            <div key={item.id} className="cart-dropdown-item">
                              <div className="item-image">
                                <img src={item.image} alt={item.name} />
                              </div>
                              <div className="item-details">
                                <h4>{item.name}</h4>
                                <div className="item-price">${item.price}</div>
                                <div className="item-quantity">Qty: {item.quantity}</div>
                              </div>
                              <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="cart-dropdown-footer">
                          <div className="cart-total">
                            <span className="total-label">Total:</span>
                            <span className="total-amount">
                              ${getCartTotal().toFixed(2)}
                            </span>
                          </div>
                          <Link to="/checkout" className="checkout-button">
                            <i className="fas fa-lock"></i>
                            Checkout
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
