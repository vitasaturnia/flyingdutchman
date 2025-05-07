import React from 'react';
import ProductGrid from '../components/ProductGrid';

const Products = () => {
  const products = [
    { id: 1, name: "Premium Headphones", price: 299.99 },
    { id: 2, name: "Wireless Earbuds", price: 159.99 },
    { id: 3, name: "Smart Watch", price: 399.99 },
    { id: 4, name: "Bluetooth Speaker", price: 129.99 },
    { id: 5, name: "Gaming Mouse", price: 79.99 },
    { id: 6, name: "Mechanical Keyboard", price: 149.99 },
    { id: 7, name: "Webcam HD", price: 89.99 },
    { id: 8, name: "USB-C Hub", price: 49.99 },
  ];

  return (
    <div className="products-page">
      <ProductGrid products={products} />
    </div>
  );
};

export default Products; 