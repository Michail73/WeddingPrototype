import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVendorById, getReviewsByVendor, createReview } from '../services/api';
import './VendorDetail.css';

function VendorDetail() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    author_name: '',
    author_email: '',
    rating: 5,
    title: '',
    comment: '',
    event_date: '',
    would_recommend: true
  });
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vendorRes, reviewsRes] = await Promise.all([
          getVendorById(id),
          getReviewsByVendor(id, true)
        ]);

        setVendor(vendorRes.data);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error('Error fetching vendor details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');

    try {
      await createReview({
        ...reviewForm,
        vendor_id: parseInt(id)
      });

      setSubmitMessage('Thank you for your review! It will be visible after approval.');
      setShowReviewForm(false);
      setReviewForm({
        author_name: '',
        author_email: '',
        rating: 5,
        title: '',
        comment: '',
        event_date: '',
        would_recommend: true
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitMessage('Failed to submit review. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!vendor) {
    return <div className="error">Vendor not found</div>;
  }

  return (
    <div className="vendor-detail">
      <div className="container">
        <Link to="/vendors" className="back-link">← Back to Vendors</Link>

        <div className="vendor-header">
          <div className="vendor-images">
            {vendor.images && vendor.images.length > 0 ? (
              <div className="image-gallery">
                {vendor.images.map((img, index) => (
                  <div key={index} className="gallery-image">
                    <img src={img} alt={`${vendor.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="image-placeholder large">No Images Available</div>
            )}
          </div>

          <div className="vendor-main-info">
            <h1>{vendor.name}</h1>
            <p className="category">{vendor.category_name}</p>

            <div className="rating-section">
              <span className="rating-large">⭐ {vendor.rating > 0 ? parseFloat(vendor.rating).toFixed(1) : 'New'}</span>
              {vendor.review_count > 0 && (
                <span className="review-count">({vendor.review_count} reviews)</span>
              )}
            </div>

            <div className="price-info">
              <span className="price-range">{vendor.price_range}</span>
              {vendor.min_price && vendor.max_price && (
                <span className="price-detail">
                  ${vendor.min_price.toLocaleString()} - ${vendor.max_price.toLocaleString()}
                </span>
              )}
            </div>

            <div className="location">
              <strong>Location:</strong> {vendor.address}, {vendor.city}, {vendor.state}
            </div>

            <div className="contact-info">
              <h3>Contact Information</h3>
              <p><strong>Email:</strong> {vendor.contact_email}</p>
              <p><strong>Phone:</strong> {vendor.contact_phone}</p>
              {vendor.website && (
                <p><strong>Website:</strong> <a href={`https://${vendor.website}`} target="_blank" rel="noopener noreferrer">{vendor.website}</a></p>
              )}
            </div>
          </div>
        </div>

        <div className="vendor-description">
          <h2>About</h2>
          <p>{vendor.description}</p>
        </div>

        <div className="reviews-section">
          <div className="reviews-header">
            <h2>Reviews ({reviews.length})</h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>

          {submitMessage && (
            <div className={`message ${submitMessage.includes('Thank you') ? 'success' : 'error'}`}>
              {submitMessage}
            </div>
          )}

          {showReviewForm && (
            <form className="review-form" onSubmit={handleReviewSubmit}>
              <h3>Write Your Review</h3>

              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  value={reviewForm.author_name}
                  onChange={(e) => setReviewForm({ ...reviewForm, author_name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Your Email *</label>
                <input
                  type="email"
                  required
                  value={reviewForm.author_email}
                  onChange={(e) => setReviewForm({ ...reviewForm, author_email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Rating *</label>
                <select
                  required
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>

              <div className="form-group">
                <label>Review Title *</label>
                <input
                  type="text"
                  required
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Your Review *</label>
                <textarea
                  required
                  rows="5"
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Event Date</label>
                <input
                  type="date"
                  value={reviewForm.event_date}
                  onChange={(e) => setReviewForm({ ...reviewForm, event_date: e.target.value })}
                />
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={reviewForm.would_recommend}
                    onChange={(e) => setReviewForm({ ...reviewForm, would_recommend: e.target.checked })}
                  />
                  I would recommend this vendor
                </label>
              </div>

              <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
          )}

          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div>
                      <h4>{review.author_name}</h4>
                      <div className="review-rating">
                        {'⭐'.repeat(review.rating)}
                      </div>
                    </div>
                    <div className="review-date">
                      {new Date(review.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="review-title">{review.title}</h3>
                  <p className="review-comment">{review.comment}</p>
                  {review.would_recommend && (
                    <p className="recommendation">✓ Would recommend</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDetail;
