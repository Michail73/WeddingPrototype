const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const vendorCount = await pool.query('SELECT COUNT(*) FROM vendors');
    const reviewCount = await pool.query('SELECT COUNT(*) FROM reviews');
    const pendingReviews = await pool.query('SELECT COUNT(*) FROM reviews WHERE approved = false');
    const categoryCount = await pool.query('SELECT COUNT(*) FROM categories');

    res.json({
      totalVendors: parseInt(vendorCount.rows[0].count),
      totalReviews: parseInt(reviewCount.rows[0].count),
      pendingReviews: parseInt(pendingReviews.rows[0].count),
      totalCategories: parseInt(categoryCount.rows[0].count)
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get all pending reviews
router.get('/reviews/pending', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, v.name as vendor_name, v.id as vendor_id
      FROM reviews r
      JOIN vendors v ON r.vendor_id = v.id
      WHERE r.approved = false
      ORDER BY r.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching pending reviews:', error);
    res.status(500).json({ error: 'Failed to fetch pending reviews' });
  }
});

// Get all reviews (for admin management)
router.get('/reviews', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, v.name as vendor_name, v.id as vendor_id
      FROM reviews r
      JOIN vendors v ON r.vendor_id = v.id
      ORDER BY r.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Approve review
router.put('/reviews/:id/approve', async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { id } = req.params;

    const result = await client.query(
      'UPDATE reviews SET approved = true WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Review not found' });
    }

    const review = result.rows[0];

    // Update vendor rating and review count
    await client.query(
      `UPDATE vendors
       SET rating = (
         SELECT COALESCE(AVG(rating), 0)
         FROM reviews
         WHERE vendor_id = $1 AND approved = true
       ),
       review_count = (
         SELECT COUNT(*)
         FROM reviews
         WHERE vendor_id = $1 AND approved = true
       )
       WHERE id = $1`,
      [review.vendor_id]
    );

    await client.query('COMMIT');

    res.json(review);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error approving review:', error);
    res.status(500).json({ error: 'Failed to approve review' });
  } finally {
    client.release();
  }
});

// Reject/delete review
router.delete('/reviews/:id', async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { id } = req.params;

    const result = await client.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Review not found' });
    }

    const review = result.rows[0];

    // Update vendor rating and review count
    await client.query(
      `UPDATE vendors
       SET rating = (
         SELECT COALESCE(AVG(rating), 0)
         FROM reviews
         WHERE vendor_id = $1 AND approved = true
       ),
       review_count = (
         SELECT COUNT(*)
         FROM reviews
         WHERE vendor_id = $1 AND approved = true
       )
       WHERE id = $1`,
      [review.vendor_id]
    );

    await client.query('COMMIT');

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  } finally {
    client.release();
  }
});

// Get all vendors (for admin management)
router.get('/vendors', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.*, c.name as category_name
      FROM vendors v
      LEFT JOIN categories c ON v.category_id = c.id
      ORDER BY v.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

module.exports = router;
