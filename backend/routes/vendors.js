const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all vendors with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, city, state, min_price, max_price, min_rating, search, sort } = req.query;

    let query = `
      SELECT v.*, c.name as category_name, c.icon as category_icon
      FROM vendors v
      LEFT JOIN categories c ON v.category_id = c.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (category) {
      query += ` AND c.name = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (city) {
      query += ` AND LOWER(v.city) = LOWER($${paramCount})`;
      params.push(city);
      paramCount++;
    }

    if (state) {
      query += ` AND LOWER(v.state) = LOWER($${paramCount})`;
      params.push(state);
      paramCount++;
    }

    if (min_price) {
      query += ` AND v.min_price >= $${paramCount}`;
      params.push(parseFloat(min_price));
      paramCount++;
    }

    if (max_price) {
      query += ` AND v.max_price <= $${paramCount}`;
      params.push(parseFloat(max_price));
      paramCount++;
    }

    if (min_rating) {
      query += ` AND v.rating >= $${paramCount}`;
      params.push(parseFloat(min_rating));
      paramCount++;
    }

    if (search) {
      query += ` AND (LOWER(v.name) LIKE LOWER($${paramCount}) OR LOWER(v.description) LIKE LOWER($${paramCount}))`;
      params.push(`%${search}%`);
      paramCount++;
    }

    // Sorting
    if (sort === 'rating') {
      query += ' ORDER BY v.rating DESC, v.review_count DESC';
    } else if (sort === 'price_low') {
      query += ' ORDER BY v.min_price ASC';
    } else if (sort === 'price_high') {
      query += ' ORDER BY v.min_price DESC';
    } else if (sort === 'reviews') {
      query += ' ORDER BY v.review_count DESC';
    } else {
      query += ' ORDER BY v.featured DESC, v.rating DESC';
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

// Get single vendor by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT v.*, c.name as category_name, c.icon as category_icon
       FROM vendors v
       LEFT JOIN categories c ON v.category_id = c.id
       WHERE v.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching vendor:', error);
    res.status(500).json({ error: 'Failed to fetch vendor' });
  }
});

// Create new vendor
router.post('/', async (req, res) => {
  try {
    const {
      name, category_id, description, contact_email, contact_phone,
      website, address, city, state, price_range, min_price, max_price, images
    } = req.body;

    const result = await pool.query(
      `INSERT INTO vendors (
        name, category_id, description, contact_email, contact_phone,
        website, address, city, state, price_range, min_price, max_price, images
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [name, category_id, description, contact_email, contact_phone,
       website, address, city, state, price_range, min_price, max_price, images]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating vendor:', error);
    res.status(500).json({ error: 'Failed to create vendor' });
  }
});

// Update vendor
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, category_id, description, contact_email, contact_phone,
      website, address, city, state, price_range, min_price, max_price, images, featured
    } = req.body;

    const result = await pool.query(
      `UPDATE vendors
       SET name = $1, category_id = $2, description = $3, contact_email = $4,
           contact_phone = $5, website = $6, address = $7, city = $8, state = $9,
           price_range = $10, min_price = $11, max_price = $12, images = $13,
           featured = $14, updated_at = CURRENT_TIMESTAMP
       WHERE id = $15
       RETURNING *`,
      [name, category_id, description, contact_email, contact_phone,
       website, address, city, state, price_range, min_price, max_price, images, featured, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating vendor:', error);
    res.status(500).json({ error: 'Failed to update vendor' });
  }
});

// Delete vendor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM vendors WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    res.status(500).json({ error: 'Failed to delete vendor' });
  }
});

module.exports = router;
