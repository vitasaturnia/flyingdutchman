import React from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useCart } from '../context/CartContext';
import '../assets/productgrid.sass';

const ProductGrid = ({ products }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { addToCart, removeFromCart, items } = useCart();

  const handleCartAction = (product) => {
    const isInCart = items.some(item => item.id === product.id);
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="product-grid" ref={ref}>
      <AnimatePresence>
        {products.map((product, index) => {
          const isInCart = items.some(item => item.id === product.id);
          return (
            <motion.div 
              key={product.id} 
              className="product-square"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.15 }
              }}
            >
              <div className="placeholder-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <motion.button 
                className={`add-to-cart ${isInCart ? 'in-cart' : ''}`}
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.15 }
                }}
                whileTap={{ y: 0 }}
                onClick={() => handleCartAction(product)}
              >
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </motion.button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid; 