import React, { useState, useEffect } from 'react';
import './FilterSidebar.sass';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    condition: 'all',
    brand: 'all'
  });
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const brands = ['Apple', 'Samsung', 'Google'];
  const conditions = ['All', 'New', 'Used'];

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const handleOverlayClick = () => {
    setIsActive(false);
  };

  return (
    <>
      <div className={`filter-sidebar ${isActive ? 'is-active' : ''}`}>
        <div className="filter-content">
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
      </div>

      {isMobile && (
        <>
          <button className={`filter-toggle ${isActive ? 'close' : ''}`} onClick={toggleSidebar}>
            {isActive ? (
              <i className="fas fa-times"></i>
            ) : (
              <>
                <i className="fas fa-filter"></i>
                Filters
              </>
            )}
          </button>
          <div 
            className={`filter-overlay ${isActive ? 'is-active' : ''}`}
            onClick={handleOverlayClick}
          />
        </>
      )}
    </>
  );
};

export default FilterSidebar; 