import { useState, useEffect } from 'react';
import { getAdminStats, getPendingReviews, getAllReviews, approveReview, deleteReviewAdmin, getAllVendorsAdmin } from '../services/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'pending-reviews') {
      fetchPendingReviews();
    } else if (activeTab === 'all-reviews') {
      fetchAllReviews();
    } else if (activeTab === 'vendors') {
      fetchVendors();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const response = await getAdminStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingReviews = async () => {
    setLoading(true);
    try {
      const response = await getPendingReviews();
      setPendingReviews(response.data);
    } catch (error) {
      console.error('Error fetching pending reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllReviews = async () => {
    setLoading(true);
    try {
      const response = await getAllReviews();
      setAllReviews(response.data);
    } catch (error) {
      console.error('Error fetching all reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await getAllVendorsAdmin();
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReview = async (id) => {
    try {
      await approveReview(id);
      setMessage('Review approved successfully!');
      fetchPendingReviews();
      fetchStats();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error approving review:', error);
      setMessage('Failed to approve review.');
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await deleteReviewAdmin(id);
      setMessage('Review deleted successfully!');
      if (activeTab === 'pending-reviews') {
        fetchPendingReviews();
      } else {
        fetchAllReviews();
      }
      fetchStats();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting review:', error);
      setMessage('Failed to delete review.');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>

        {message && <div className="message success">{message}</div>}

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            Statistics
          </button>
          <button
            className={`tab ${activeTab === 'pending-reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending-reviews')}
          >
            Pending Reviews {stats && stats.pendingReviews > 0 && `(${stats.pendingReviews})`}
          </button>
          <button
            className={`tab ${activeTab === 'all-reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('all-reviews')}
          >
            All Reviews
          </button>
          <button
            className={`tab ${activeTab === 'vendors' ? 'active' : ''}`}
            onClick={() => setActiveTab('vendors')}
          >
            Vendors
          </button>
        </div>

        <div className="tab-content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              {activeTab === 'stats' && stats && (
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>Total Vendors</h3>
                    <p className="stat-number">{stats.totalVendors}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Reviews</h3>
                    <p className="stat-number">{stats.totalReviews}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Pending Reviews</h3>
                    <p className="stat-number">{stats.pendingReviews}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Categories</h3>
                    <p className="stat-number">{stats.totalCategories}</p>
                  </div>
                </div>
              )}

              {activeTab === 'pending-reviews' && (
                <div className="reviews-table">
                  <h2>Pending Reviews</h2>
                  {pendingReviews.length === 0 ? (
                    <p>No pending reviews.</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Vendor</th>
                          <th>Author</th>
                          <th>Rating</th>
                          <th>Title</th>
                          <th>Comment</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingReviews.map((review) => (
                          <tr key={review.id}>
                            <td>{review.vendor_name}</td>
                            <td>{review.author_name}</td>
                            <td>{'⭐'.repeat(review.rating)}</td>
                            <td>{review.title}</td>
                            <td className="comment-cell">{review.comment}</td>
                            <td>{new Date(review.created_at).toLocaleDateString()}</td>
                            <td className="actions">
                              <button
                                className="btn btn-success"
                                onClick={() => handleApproveReview(review.id)}
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteReview(review.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === 'all-reviews' && (
                <div className="reviews-table">
                  <h2>All Reviews</h2>
                  {allReviews.length === 0 ? (
                    <p>No reviews found.</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Vendor</th>
                          <th>Author</th>
                          <th>Rating</th>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allReviews.map((review) => (
                          <tr key={review.id}>
                            <td>{review.vendor_name}</td>
                            <td>{review.author_name}</td>
                            <td>{'⭐'.repeat(review.rating)}</td>
                            <td>{review.title}</td>
                            <td>
                              <span className={`status ${review.approved ? 'approved' : 'pending'}`}>
                                {review.approved ? 'Approved' : 'Pending'}
                              </span>
                            </td>
                            <td>{new Date(review.created_at).toLocaleDateString()}</td>
                            <td className="actions">
                              {!review.approved && (
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleApproveReview(review.id)}
                                >
                                  Approve
                                </button>
                              )}
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteReview(review.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {activeTab === 'vendors' && (
                <div className="vendors-table">
                  <h2>All Vendors</h2>
                  {vendors.length === 0 ? (
                    <p>No vendors found.</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Location</th>
                          <th>Rating</th>
                          <th>Reviews</th>
                          <th>Price Range</th>
                          <th>Featured</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendors.map((vendor) => (
                          <tr key={vendor.id}>
                            <td>{vendor.name}</td>
                            <td>{vendor.category_name}</td>
                            <td>{vendor.city}, {vendor.state}</td>
                            <td>⭐ {vendor.rating > 0 ? parseFloat(vendor.rating).toFixed(1) : 'N/A'}</td>
                            <td>{vendor.review_count}</td>
                            <td>{vendor.price_range}</td>
                            <td>{vendor.featured ? '✓' : ''}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
