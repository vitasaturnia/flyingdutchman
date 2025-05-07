import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import productsData from '../data/products.json';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const featured = productsData.products.filter(product => 
      productsData.featuredProducts.includes(product.id)
    );
    setFeaturedProducts(featured);
  }, []);

  return (
    <div className="home-page">
      <div className="content-wrapper">
        <HeroSection />
        
        <h2 className="gradient-text" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Featured Products</h2>
        <div className="subtitle-container" style={{ textAlign: 'center', marginBottom: '2rem', display: 'inline-block' }}>
          <span className="subtitle-text">Explore some of our products</span>
          <div className="subtitle-underline"></div>
        </div>
        <ProductGrid products={featuredProducts} />
      </div>
    </div>
  );
};

export default Home; 