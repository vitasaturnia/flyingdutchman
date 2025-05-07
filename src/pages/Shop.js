import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import productsData from '../data/products.json';

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setAllProducts(productsData.products);
    setFilteredProducts(productsData.products);
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...allProducts];
    
    if (filters.condition !== 'all') {
      filtered = filtered.filter(product => 
        product.condition.toLowerCase() === filters.condition
      );
    }
    
    if (filters.brand !== 'all') {
      filtered = filtered.filter(product => 
        product.brand.toLowerCase() === filters.brand
      );
    }
    
    setFilteredProducts(filtered);
  };

  return (
    <div className="products-page">
      <div className="product-container">
        <FilterSidebar onFilterChange={handleFilterChange} />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default Shop; 