const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all reviews for a vendor
router.get('/vendor/:vendorId', async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { approved } = req.query;

    let query = 'SELECT * FROM reviews WHERE vendor_id = $1';
    const params = [vendorId];

    if (approved !== undefined) {
      query += ' AND approved = $2';
      params.push(approved === 'true');
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get single review
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM reviews WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
});

// Create new review
router.post('/', async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const {
      vendor_id, author_name, author_email, rating, title, comment, event_date, would_recommend
    } = req.body;

    // Insert review
    const reviewResult = await client.query(
      `INSERT INTO reviews (
        vendor_id, author_name, author_email, rating, title, comment, event_date, would_recommend
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [vendor_id, author_name, author_email, rating, title, comment, event_date, would_recommend]
    );

    // Update vendor rating and review count (only approved reviews)
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
      [vendor_id]
    );

    await client.query('COMMIT');

    res.status(201).json(reviewResult.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  } finally {
    client.release();
  }
});

// Update review (mainly for approval)
router.put('/:id', async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { id } = req.params;
    const { approved } = req.body;

    const result = await client.query(
      'UPDATE reviews SET approved = $1 WHERE id = $2 RETURNING *',
      [approved, id]
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
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  } finally {
    client.release();
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
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

module.exports = router;
