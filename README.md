# ecommerce-mern

Full-stack MERN e-commerce application with React, Redux Toolkit, Express, MongoDB, and Tailwind CSS.

## Features

- Product catalog with search, filter by category/price, pagination
- User authentication (JWT) — register, login, profile
- Shopping cart (Redux, persisted to localStorage)
- 3-step checkout (shipping → payment → confirm)
- Stripe & PayPal payment method selection
- Wishlist management
- Product reviews & ratings
- Admin dashboard — product CRUD, order management, stats
- Responsive design with Tailwind CSS

## Tech Stack

**Backend:** Node.js, Express, MongoDB/Mongoose, JWT, bcryptjs, Stripe  
**Frontend:** React 18, Vite, Redux Toolkit, React Router v6, Tailwind CSS, Axios

## Getting Started

### Backend

```bash
cd backend
npm install
# Edit .env with your MongoDB URI, JWT secret, Stripe key, etc.
npm run dev
```

### Frontend

```bash
cd frontend
npm install
# Edit .env with your Stripe publishable key
npm run dev
```

## Environment Variables

### backend/.env
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce_mern
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### frontend/.env
```
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/profile | Get profile (auth) |
| GET | /api/products | Get products (search, filter, paginate) |
| GET | /api/products/:id | Get product |
| POST | /api/orders | Create order (auth) |
| GET | /api/orders/myorders | Get my orders (auth) |
| GET | /api/orders | Get all orders (admin) |

## Design System

- Primary: `#0F172A` | Secondary: `#1E293B` | Accent: `#22C55E`
- Font: Inter / Roboto
- Mobile-first responsive layout
