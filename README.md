# SJ Sri Jananin Saree - Full Stack E-Commerce Platform

A production-ready full-stack replica of **[SJ Sri Jananin Saree](https://jewellery1.premiumweb.in/)**, built with modern web technologies:

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Swiper
- **Backend**: Node.js, Express.js, CORS, Helmet
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security, Auth)

---

## 📁 Project Architecture

```
jewellery-replica/
├── backend/                     # Node.js + Express API
│   ├── src/
│   │   ├── config/              # Supabase Client & Fallback Mock Data
│   │   ├── controllers/         # Products, Categories, Orders, Auth, Reviews, etc.
│   │   ├── middleware/          # Auth JWT & Error Handler
│   │   └── routes/              # Express API Routes (/api/products, /api/orders, etc.)
│   ├── .env.example             # Backend environment template
│   ├── package.json
│   └── server.js
│
├── frontend/                    # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Header, Footer, Mobile Drawer, Bottom Nav, WhatsApp
│   │   │   ├── home/            # HeroSlider, CategoryBanners, FeatureBar, MarqueeTicker, etc.
│   │   │   ├── products/        # ProductCard, ProductGrid, ProductFilter, Gallery, etc.
│   │   │   ├── cart/            # CartDrawer
│   │   │   ├── auth/            # AuthModal (Sign In / Register)
│   │   │   └── ui/              # Badges, Loaders, StarRating, Modal
│   │   ├── pages/               # Home, Shop, ProductDetail, About, Contact, Cart, Wishlist, Checkout, Account, TrackOrder, PolicyPage, NotFound
│   │   ├── context/             # CartContext, WishlistContext, AuthContext
│   │   ├── services/            # Axios API Client & Supabase Client
│   │   ├── utils/               # Formatters & Helpers
│   │   ├── App.jsx              # Complete Client-Side Routing
│   │   ├── main.jsx
│   │   └── index.css            # Tailwind + Brand Design Tokens
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js       # Rani Pink (#c4005b) & Gold (#d4af37)
│   └── vite.config.js
│
└── supabase/
    ├── schema.sql               # Complete PostgreSQL schema (tables, RLS, triggers, indexes)
    └── seed.sql                 # Sample products, categories, variations & reviews
```

---

## 🎨 Design Tokens & Branding
- **Primary Magenta**: `#c4005b` (Rani Pink)
- **Festive Gold**: `#d4af37`
- **Backgrounds**: Pure White (`#ffffff`) & Soft Pink (`#fff5f8`)
- **Typography**:
  - Headings: `'Cormorant Garamond', Georgia, serif`
  - Body & UI: `'Jost', sans-serif`
- **Contact Info**:
  - Address: *Thirunjanam nagar 5rd, Cross Dadagapatti, Salem - 636006*
  - Support: *+91 90255 74074* / *+91 6381100461*
  - Email: *info@premiumweb.in*

---

## 🚀 Getting Started

### 1. Database Setup (Supabase)
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard.
3. Paste and run `supabase/schema.sql` to generate all tables, triggers, and Row Level Security policies.
4. Run `supabase/seed.sql` to populate sample products and categories.
5. In your Supabase Project Settings > API, copy:
   - `Project URL`
   - `anon public key`
   - `service_role secret key`

---

### 2. Backend Setup
```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```env
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
# Server runs on http://localhost:5000
```
*(Note: Even without Supabase configured yet, the backend automatically provides fallback catalog data so the website functions immediately!)*

---

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start Vite development server
npm run dev
# Accessible at http://localhost:5173
```

---

## 📤 Push to GitHub

To push this entire project to your GitHub repository:

```bash
# 1. In the root directory (jewellery-replica):
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: SJ Sri Jananin Saree full-stack replica"

# 4. Set main branch
git branch -M main

# 5. Link your GitHub remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# 6. Push to GitHub
git push -u origin main
```
"# Siva-home-trends" 
