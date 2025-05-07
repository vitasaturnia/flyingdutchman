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
        
        <h2 className="gradient-text" style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '-4rem' }}>Featured Products</h2>
        <ProductGrid products={featuredProducts} />
      </div>
    </div>
  );
};

export default Home; 