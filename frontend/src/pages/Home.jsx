import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getVendors } from '../services/api';
import './Home.css';

function Home() {
  const [categories, setCategories] = useState([]);
  const [featuredVendors, setFeaturedVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, vendorsRes] = await Promise.all([
          getCategories(),
          getVendors({ sort: 'rating' })
        ]);

        setCategories(categoriesRes.data);
        setFeaturedVendors(vendorsRes.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Find Your Perfect Wedding Vendors</h1>
            <p>Discover top-rated wedding services all in one place</p>
            <Link to="/vendors" className="btn btn-primary">Browse All Vendors</Link>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2>Browse by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/vendors?category=${encodeURIComponent(category.name)}`}
                className="category-card"
              >
                <div className="category-icon">{category.icon || '📋'}</div>
                <h3>{category.name}</h3>
                <p>{category.vendor_count} vendors</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-vendors">
        <div className="container">
          <h2>Top Rated Vendors</h2>
          <div className="vendors-grid">
            {featuredVendors.map((vendor) => (
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
                    <span className="rating">⭐ {parseFloat(vendor.rating).toFixed(1)}</span>
                    <span className="reviews">({vendor.review_count} reviews)</span>
                    <span className="price">{vendor.price_range}</span>
                  </div>
                  <p className="vendor-location">{vendor.city}, {vendor.state}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
