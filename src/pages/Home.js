import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const products = [
    { id: 1, name: "Premium Headphones", price: 299.99 },
    { id: 2, name: "Wireless Earbuds", price: 159.99 },
    { id: 3, name: "Smart Watch", price: 399.99 },
  ];

  return (
    <div className="home-page">
      <div className="content-wrapper">
        <HeroSection />
        
        <h2 className="gradient-text" style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '-4rem' }}>Featured Products</h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Home; 