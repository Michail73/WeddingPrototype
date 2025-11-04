const pool = require('../config/database');

const initDatabase = async () => {
  const client = await pool.connect();

  try {
    console.log('Starting database initialization...');

    // Create categories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        icon VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Categories table created');

    // Create vendors table
    await client.query(`
      CREATE TABLE IF NOT EXISTS vendors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
        description TEXT,
        contact_email VARCHAR(255),
        contact_phone VARCHAR(50),
        website VARCHAR(255),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        price_range VARCHAR(20),
        min_price DECIMAL(10, 2),
        max_price DECIMAL(10, 2),
        rating DECIMAL(3, 2) DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        featured BOOLEAN DEFAULT FALSE,
        images TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Vendors table created');

    // Create reviews table
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
        author_name VARCHAR(255) NOT NULL,
        author_email VARCHAR(255),
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        title VARCHAR(255),
        comment TEXT,
        event_date DATE,
        would_recommend BOOLEAN DEFAULT TRUE,
        approved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Reviews table created');

    // Create admin_users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Admin users table created');

    // Create indexes for better query performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_vendors_category ON vendors(category_id);
      CREATE INDEX IF NOT EXISTS idx_vendors_rating ON vendors(rating DESC);
      CREATE INDEX IF NOT EXISTS idx_reviews_vendor ON reviews(vendor_id);
      CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(approved);
    `);
    console.log('Indexes created');

    // Insert default categories
    const categories = [
      { name: 'Spaces for Rent', description: 'Event venues and rental spaces', icon: 'building' },
      { name: 'Restaurants', description: 'Restaurants for wedding receptions', icon: 'utensils' },
      { name: 'Catering', description: 'Catering services for events', icon: 'concierge-bell' },
      { name: 'Host Services', description: 'Professional event hosts and MCs', icon: 'microphone' },
      { name: 'Venue Decorators', description: 'Decoration and styling services', icon: 'paint-brush' },
      { name: 'Photographers', description: 'Wedding photography services', icon: 'camera' },
      { name: 'Transportation', description: 'Wedding transportation services', icon: 'car' },
      { name: 'Pastry Chefs', description: 'Wedding cakes and desserts', icon: 'birthday-cake' }
    ];

    for (const category of categories) {
      await client.query(
        `INSERT INTO categories (name, description, icon)
         VALUES ($1, $2, $3)
         ON CONFLICT (name) DO NOTHING`,
        [category.name, category.description, category.icon]
      );
    }
    console.log('Default categories inserted');

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

initDatabase();
