# Wedding Vendors Platform

A full-stack web application for aggregating wedding vendors including venues, photographers, caterers, decorators, and more. Users can browse vendors, read reviews, and submit their own reviews. Includes an admin dashboard for managing vendors and moderating reviews.

## Features

- **Browse Vendors**: Search and filter wedding vendors by category, location, price, and rating
- **Vendor Profiles**: Detailed vendor pages with contact information, pricing, and image galleries
- **Review System**: Users can submit reviews with ratings and comments (requires admin approval)
- **Admin Dashboard**: Manage vendors, approve/reject reviews, and view platform statistics
- **Responsive Design**: Mobile-friendly interface that works on all devices

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- RESTful API

### Frontend
- React 18
- React Router
- Vite
- CSS3

## Project Structure

```
your-project/
├── backend/
│   ├── config/
│   │   └── database.js         # PostgreSQL connection configuration
│   ├── routes/
│   │   ├── vendors.js          # Vendor endpoints
│   │   ├── reviews.js          # Review endpoints
│   │   ├── categories.js       # Category endpoints
│   │   └── admin.js            # Admin endpoints
│   ├── scripts/
│   │   ├── initDatabase.js     # Database initialization script
│   │   └── seedData.js         # Sample data seeding script
│   ├── server.js               # Express server setup
│   ├── package.json
│   └── .env.example            # Environment variables template
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── Header.css
    │   │   ├── Footer.jsx
    │   │   └── Footer.css
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Home.css
    │   │   ├── Vendors.jsx
    │   │   ├── Vendors.css
    │   │   ├── VendorDetail.jsx
    │   │   ├── VendorDetail.css
    │   │   ├── AdminDashboard.jsx
    │   │   └── AdminDashboard.css
    │   ├── services/
    │   │   └── api.js            # API service layer
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)

## Installation

### 1. Clone or navigate to the project directory

```bash
cd your-project
```

### 2. Set up the Backend

```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file by copying `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` file with your PostgreSQL credentials:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wedding_vendors
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

### 3. Set up PostgreSQL Database

Create a new PostgreSQL database:
```bash
createdb wedding_vendors
```

Or using psql:
```sql
CREATE DATABASE wedding_vendors;
```

Initialize the database schema:
```bash
npm run init-db
```

Seed the database with sample data:
```bash
npm run seed-db
```

### 4. Set up the Frontend

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend Server

In the `backend` directory:
```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal, in the `frontend` directory:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## Usage

### Browse Vendors
1. Navigate to `http://localhost:3000`
2. Browse featured vendors on the home page
3. Click "Browse All Vendors" or any category to see filtered results
4. Use the filters sidebar to search by category, location, price, and rating

### View Vendor Details
1. Click on any vendor card to view detailed information
2. See vendor contact information, pricing, description, and reviews
3. Submit a review using the "Write a Review" button
4. Reviews require admin approval before appearing publicly

### Admin Dashboard
1. Navigate to `http://localhost:3000/admin`
2. View platform statistics
3. Review pending reviews and approve/reject them
4. Manage all vendors and reviews

## API Endpoints

### Vendors
- `GET /api/vendors` - Get all vendors (with optional filters)
- `GET /api/vendors/:id` - Get single vendor
- `POST /api/vendors` - Create new vendor
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category

### Reviews
- `GET /api/reviews/vendor/:vendorId` - Get reviews for a vendor
- `POST /api/reviews` - Create new review
- `PUT /api/reviews/:id` - Update review (approval status)
- `DELETE /api/reviews/:id` - Delete review

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/reviews/pending` - Get pending reviews
- `GET /api/admin/reviews` - Get all reviews
- `PUT /api/admin/reviews/:id/approve` - Approve review
- `DELETE /api/admin/reviews/:id` - Delete review
- `GET /api/admin/vendors` - Get all vendors

## Vendor Categories

The platform includes the following vendor categories:

1. **Spaces for Rent** - Event venues and rental spaces
2. **Restaurants** - Restaurants for wedding receptions
3. **Catering** - Catering services for events
4. **Host Services** - Professional event hosts and MCs
5. **Venue Decorators** - Decoration and styling services
6. **Photographers** - Wedding photography services
7. **Transportation** - Wedding transportation services
8. **Pastry Chefs** - Wedding cakes and desserts

## Sample Data

The database seeding script includes 16 sample vendors (2 per category) with:
- Realistic vendor information
- Contact details
- Pricing information
- Location data
- 10 approved sample reviews

## Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

The build files will be in the `frontend/dist` directory.

## Future Enhancements

Potential features to add:
- User authentication and authorization
- Favorite vendors functionality
- Vendor registration and profile management
- Image upload functionality
- Advanced search with location-based filtering
- Email notifications for review approvals
- Vendor availability calendar
- Booking system integration
- Payment processing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
