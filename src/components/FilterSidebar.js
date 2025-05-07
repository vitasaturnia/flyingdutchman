import React, { useState } from 'react';
import './FilterSidebar.sass';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    condition: 'all',
    brand: 'all'
  });

  const brands = ['Apple', 'Samsung', 'Google'];
  const conditions = ['All', 'New', 'Used'];

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h2 className="filter-title-main">Filter Options</h2>
        <p className="filter-description">Refine your search by selecting filters below</p>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Condition</h3>
        <div className="filter-options">
          {conditions.map((condition) => (
            <label key={condition} className="filter-option">
              <input
                type="radio"
                name="condition"
                value={condition.toLowerCase()}
                checked={filters.condition === condition.toLowerCase()}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
              />
              <span className="option-label">{condition}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Brand</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              name="brand"
              value="all"
              checked={filters.brand === 'all'}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
            />
            <span className="option-label">All Brands</span>
          </label>
          {brands.map((brand) => (
            <label key={brand} className="filter-option">
              <input
                type="radio"
                name="brand"
                value={brand.toLowerCase()}
                checked={filters.brand === brand.toLowerCase()}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              />
              <span className="option-label">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar; 