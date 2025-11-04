import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getVendors, getCategories } from '../services/api';
import './Vendors.css';

function Vendors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    min_rating: searchParams.get('min_rating') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'rating'
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const params = {};
        Object.keys(filters).forEach(key => {
          if (filters[key]) {
            params[key] = filters[key];
          }
        });

        const response = await getVendors(params);
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const newParams = {};
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) {
        newParams[k] = newFilters[k];
      }
    });
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      city: '',
      state: '',
      min_rating: '',
      search: '',
      sort: 'rating'
    });
    setSearchParams({});
  };

  return (
    <div className="vendors-page">
      <div className="container">
        <h1>Browse Wedding Vendors</h1>

        <div className="vendors-layout">
          <aside className="filters-sidebar">
            <h2>Filters</h2>

            <div className="filter-group">
              <label>Search</label>
              <input
                type="text"
                placeholder="Search vendors..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>City</label>
              <input
                type="text"
                placeholder="Enter city"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>State</label>
              <input
                type="text"
                placeholder="Enter state"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Minimum Rating</label>
              <select
                value={filters.min_rating}
                onChange={(e) => handleFilterChange('min_rating', e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>

            <button className="btn btn-secondary" onClick={clearFilters}>
              Clear Filters
            </button>
          </aside>

          <div className="vendors-content">
            {loading ? (
              <div className="loading">Loading vendors...</div>
            ) : vendors.length === 0 ? (
              <div className="no-results">
                <p>No vendors found matching your criteria.</p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="results-info">
                  <p>{vendors.length} vendor{vendors.length !== 1 ? 's' : ''} found</p>
                </div>
                <div className="vendors-grid">
                  {vendors.map((vendor) => (
                    <Link
                      key={vendor.id}
                      to={`/vendors/${vendor.id}`}
                      className="vendor-card"
                    >
                      <div className="vendor-image">
                        {vendor.images && vendor.images.length > 0 ? (
                          <img src={vendor.images[0]} alt={vendor.name} />
                        ) : (
                          <div className="image-placeholder">No Image</div>
                        )}
                      </div>
                      <div className="vendor-info">
                        <h3>{vendor.name}</h3>
                        <p className="vendor-category">{vendor.category_name}</p>
                        <div className="vendor-meta">
                          <span className="rating">
                            ⭐ {vendor.rating > 0 ? parseFloat(vendor.rating).toFixed(1) : 'New'}
                          </span>
                          {vendor.review_count > 0 && (
                            <span className="reviews">({vendor.review_count} reviews)</span>
                          )}
                          <span className="price">{vendor.price_range}</span>
                        </div>
                        <p className="vendor-location">{vendor.city}, {vendor.state}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendors;
