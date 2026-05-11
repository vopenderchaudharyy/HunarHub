# 🏺 HunarHub — Local Skills, Global Impact

A full-stack MERN marketplace connecting skilled local micro-entrepreneurs with customers across India.

---

## 📁 Project Structure

```
hunarhub/
├── client/          ← React Frontend
│   └── src/
│       ├── pages/         (HomePage, ExplorePage, CategoriesPage, HowItWorksPage, BecomeSellerPage, AboutUsPage, LoginPage, SignupPage, SellerDetailPage)
│       ├── components/    (Navbar, Footer)
│       ├── context/       (AuthContext, CartContext)
│       └── index.css      (Global styles)
│
└── server/          ← Express Backend
    ├── models/      (User, Seller, Order, Review, Product)
    ├── controllers/ (auth, seller, order, review, product)
    ├── routes/      (all API routes)
    ├── middleware/  (JWT auth)
    ├── seed.js      (Sample data)
    └── server.js    (Entry point)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

---

### 1. Backend Setup

```bash
cd hunarhub/server
npm install
```

**Configure `.env`:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hunarhub
JWT_SECRET=hunarhub_super_secret_key_2024
JWT_EXPIRE=7d
```

**Seed sample data:**
```bash
node seed.js
```

**Start server:**
```bash
npm run dev      # development (nodemon)
npm start        # production
```

Server runs at: `http://localhost:5000`

---

### 2. Frontend Setup

```bash
cd hunarhub/client
npm install
npm start
```

App runs at: `http://localhost:3000`

---

## 🔑 Test Credentials (after seeding)

| Role     | Email                      | Password     |
|----------|----------------------------|--------------|
| Customer | customer@hunarhub.com      | password123  |
| Seller   | rajesh@hunarhub.com        | password123  |

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint                   | Access  | Description            |
|--------|----------------------------|---------|------------------------|
| POST   | /api/auth/register         | Public  | Register new user      |
| POST   | /api/auth/login            | Public  | Login user             |
| GET    | /api/auth/me               | Private | Get current user       |
| PUT    | /api/auth/update           | Private | Update profile         |
| PUT    | /api/auth/change-password  | Private | Change password        |

### Sellers
| Method | Endpoint                   | Access  | Description            |
|--------|----------------------------|---------|------------------------|
| GET    | /api/sellers               | Public  | Get all sellers        |
| GET    | /api/sellers/featured      | Public  | Get featured sellers   |
| GET    | /api/sellers/:id           | Public  | Get single seller      |
| POST   | /api/sellers               | Private | Create seller profile  |
| PUT    | /api/sellers/:id           | Private | Update seller profile  |
| GET    | /api/sellers/my-profile    | Private | Get my seller profile  |

### Orders
| Method | Endpoint                   | Access  | Description            |
|--------|----------------------------|---------|------------------------|
| POST   | /api/orders                | Private | Create order/request   |
| GET    | /api/orders/my-orders      | Private | Get customer orders    |
| GET    | /api/orders/seller-orders  | Private | Get seller orders      |
| GET    | /api/orders/:id            | Private | Get single order       |
| PUT    | /api/orders/:id/status     | Private | Update order status    |

### Reviews
| Method | Endpoint                        | Access  | Description         |
|--------|---------------------------------|---------|---------------------|
| POST   | /api/reviews                    | Private | Add review          |
| GET    | /api/reviews/seller/:sellerId   | Public  | Get seller reviews  |

### Products
| Method | Endpoint                   | Access  | Description         |
|--------|----------------------------|---------|---------------------|
| GET    | /api/products              | Public  | Get all products    |
| POST   | /api/products              | Private | Create product      |
| GET    | /api/products/my-products  | Private | Get my products     |
| PUT    | /api/products/:id          | Private | Update product      |
| DELETE | /api/products/:id          | Private | Delete product      |

### Categories
| Method | Endpoint        | Access | Description                        |
|--------|-----------------|--------|------------------------------------|
| GET    | /api/categories | Public | Get categories with seller counts  |

---

## 🎨 Pages

| Page            | Route            | Description                              |
|-----------------|------------------|------------------------------------------|
| Home            | /                | Landing page with search & featured      |
| Explore         | /explore         | Browse all sellers with filters          |
| Categories      | /categories      | All skill categories                     |
| How It Works    | /how-it-works    | Step-by-step guide                       |
| Become a Seller | /become-seller   | Seller onboarding page                   |
| About Us        | /about           | Company info, impact, testimonials       |
| Login           | /login           | User login                               |
| Sign Up         | /signup          | User registration (customer or seller)   |
| Seller Profile  | /seller/:id      | Individual seller page with booking      |

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + React Router v6
- Context API (Auth + Cart)
- CSS Variables for theming
- Google Fonts (Poppins + Playfair Display)

**Backend:**
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

---

## 📌 Key Features

- 🔐 JWT Authentication (Customer & Seller roles)
- 🔍 Advanced search & filter (category, location, price, rating)
- 📋 Service booking / order request system
- ⭐ Review & rating system
- 📦 Product listing
- 💼 Seller profile & dashboard
- 🛒 Cart context
- 📱 Fully responsive design
- 🎨 HunarHub brand theme (warm orange + earthy tones)
