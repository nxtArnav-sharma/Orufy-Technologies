# Productr — Full Stack Product Management Application

> Built for the **Orufy Technologies Full Stack Developer Assignment**
> Figma Design Reference: [Assignment_Dev](https://www.figma.com/design/jz1CdCk9aaW5itU99sC6uB/Assignment-_Dev?node-id=1-770&t=gAEZfGOdDHL1lavW-4)

---

## 📌 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
5. [Environment Variables](#environment-variables)
6. [Application Pages & Features](#application-pages--features)
   - [Login Page](#1-login-page)
   - [OTP Verification Page](#2-otp-verification-page)
   - [Sign Up Page](#3-sign-up-page)
   - [Dashboard (Home) Page](#4-dashboard-home-page)
   - [Add / Edit Product Drawer](#5-add--edit-product-drawer)
7. [REST API Reference](#rest-api-reference)
8. [Database Schema](#database-schema)
9. [Component Architecture](#component-architecture)
10. [Design System](#design-system)
11. [Responsiveness](#responsiveness)
12. [Error Handling & Validation](#error-handling--validation)
13. [In-Memory Fallback (No MongoDB Required)](#in-memory-fallback)
14. [Evaluation Criteria Coverage](#evaluation-criteria-coverage)

---

## Project Overview

**Productr** is a full-stack product management web application that allows businesses to manage their product catalog. Users can log in, add products, edit or delete them, and toggle their visibility between "Published" and "Unpublished" states.

The application was built pixel-perfect to match a provided Figma design, with a fully functional backend API connected to MongoDB and a clean, modular React frontend.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend Framework | React.js (via Vite) | 18+ |
| Backend Framework | Node.js + Express.js | Express 5 |
| Database | MongoDB (Mongoose ODM) | Mongoose 9 |
| HTTP Client | Axios | Latest |
| Routing | React Router DOM | v6 |
| Styling | Vanilla CSS (custom design system) | — |
| Dev Tools | Nodemon, Vite HMR | — |

---

## Project Structure

```
Internshala project/
│
├── README.md                        ← This file
│
├── client/                          ← React frontend (Vite)
│   ├── public/
│   │   └── abstract_bg.png          ← Background texture asset
│   ├── src/
│   │   ├── assets/
│   │   │   ├── logo.png             ← Productr logo (circles)
│   │   │   └── runner.png           ← Hero image (runner)
│   │   ├── components/
│   │   │   ├── Sidebar.jsx          ← Left navigation sidebar
│   │   │   ├── Sidebar.css
│   │   │   ├── ProductTable.jsx     ← Product list table
│   │   │   ├── ProductTable.css
│   │   │   ├── AddProductDrawer.jsx ← Add/Edit product slide-in form
│   │   │   └── AddProductDrawer.css
│   │   ├── pages/
│   │   │   ├── Login.jsx            ← Login page
│   │   │   ├── Login.css
│   │   │   ├── Otp.jsx              ← OTP verification page
│   │   │   ├── Otp.css
│   │   │   ├── Signup.jsx           ← Sign up page
│   │   │   ├── Dashboard.jsx        ← Main dashboard / home
│   │   │   └── Dashboard.css
│   │   ├── App.jsx                  ← Root component + routing
│   │   ├── App.css
│   │   ├── index.css                ← Global CSS variables
│   │   └── main.jsx                 ← Vite entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/                          ← Express backend
    ├── models/
    │   └── Product.js               ← Mongoose product schema
    ├── routes/
    │   └── productRoutes.js         ← CRUD API routes + validation
    ├── index.js                     ← Server entry point
    ├── .env                         ← Environment variables (not committed)
    └── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher → [Download](https://nodejs.org)
- **npm** v9 or higher (comes with Node)
- **MongoDB** (optional — app works without it using in-memory fallback)
  - Local: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://cloud.mongodb.com) (free tier available)

---

### Backend Setup

```bash
# Step 1: Navigate to the server directory
cd server

# Step 2: Install dependencies
npm install

# Step 3: Create the .env file (see Environment Variables section)
# Create a file named .env inside the server/ folder

# Step 4: Start the development server
npm run dev
```

> ✅ Server starts on: **http://localhost:5000**
> 
> If you don't set up MongoDB, the app uses an **in-memory store** automatically (no crash).

---

### Frontend Setup

```bash
# Step 1: Navigate to the client directory
cd client

# Step 2: Install dependencies
npm install

# Step 3: Start the development server
npm run dev
```

> ✅ Frontend starts on: **http://localhost:5173**

---

## Environment Variables

Create a file named `.env` inside the `server/` directory:

```env
# Port for the Express server
PORT=5000

# MongoDB connection string
# Option 1 — Local MongoDB instance:
MONGODB_URI=mongodb://localhost:27017/orufy_assignment

# Option 2 — MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/orufy_assignment
```

| Variable | Required | Description | Default |
|---|---|---|---|
| `PORT` | No | The port Express listens on | `5000` |
| `MONGODB_URI` | No | Full MongoDB connection string | In-memory fallback |

> **Note:** If `MONGODB_URI` is missing or the connection fails, the app seamlessly falls back to an in-memory data store with 2 sample products pre-loaded. All CRUD operations work normally in fallback mode.

---

## Application Pages & Features

### 1. Login Page

**Route:** `/login`  
**File:** `client/src/pages/Login.jsx`

#### What it does:
- Displays the Productr brand header (logo + wordmark)
- Left panel: hero runner image inside a rounded card with a gradient background and abstract texture
- Right panel: email/phone number input form
- On submit → navigates to the OTP verification page (`/otp`)
- "SignUp Here" link → navigates to `/signup`

#### Design details:
- Multi-stop linear gradient background (dark blue → purple → pink → orange/red)
- Abstract texture overlay with `soft-light` blend mode
- Floating card with layered shadows, perspective transform, and top highlight gloss
- Ambient warm glow behind the hero card
- Bottom fog fade overlay for a premium SaaS look

---

### 2. OTP Verification Page

**Route:** `/otp`  
**File:** `client/src/pages/Otp.jsx`

#### What it does:
- Reuses the same left-panel hero layout as the Login page
- 4-digit OTP input with auto-focus progression (typing one digit auto-advances to next field)
- "Verify" button → navigates to `/home` (dashboard)
- "Resend Code" link available
- "← Back to Login" navigation button

#### Design details:
- Each OTP digit is a separate styled input box
- Same premium hero panel as Login for visual consistency

---

### 3. Sign Up Page

**Route:** `/signup`  
**File:** `client/src/pages/Signup.jsx`

#### What it does:
- New account creation form with the following fields:
  - Full Name
  - Email Address
  - Phone Number
  - Password
  - Confirm Password
- **Client-side validation:**
  - Password and Confirm Password must match
  - Password must be at least 6 characters
  - Error message displayed inline on validation failure
- On successful validation → navigates to `/otp`
- "Login Here" link → navigates back to `/login`

#### Design details:
- Shares the same split-panel layout as Login/OTP (hero panel + form panel)

---

### 4. Dashboard (Home) Page

**Route:** `/home`  
**File:** `client/src/pages/Dashboard.jsx`

#### What it does:
- Main product management hub after successful login
- **Left Sidebar**: Navigation + search bar
- **Header**: Published / Unpublished tab switcher + Add Product button + User profile icon
- **Content area**: Product table or empty state message

#### Features:

| Feature | Description |
|---|---|
| **Published Tab** | Fetches and displays all `isPublished: true` products from the API |
| **Unpublished Tab** | Fetches and displays all `isPublished: false` products from the API |
| **Search** | Real-time client-side filtering of product names |
| **Loading State** | Spinner/text shown while API fetch is in progress |
| **Empty State** | Friendly icon + message when no products exist for the active tab |
| **Edit Product** | Clicking Edit opens the drawer pre-filled with the product's data |
| **Delete Product** | Clicking Delete triggers a confirmation dialog, then calls DELETE API |
| **Add Product** | "Add Product" button opens the slide-in drawer form |

#### Data flow:
1. On tab switch → `useEffect` calls `fetchProducts()`
2. `fetchProducts()` → `GET /api/products?isPublished=<true|false>`
3. Products stored in React state → rendered in `<ProductTable />`
4. After any add/edit/delete → `fetchProducts()` re-called to refresh UI

---

### 5. Add / Edit Product Drawer

**Component:** `client/src/components/AddProductDrawer.jsx`

#### What it does:
- Slides in from the right side of the screen as an overlay
- **Add mode**: empty form, submits `POST /api/products`
- **Edit mode**: form pre-filled with existing product data, submits `PUT /api/products/:id`
- Clicking outside the drawer or the `×` button closes it

#### Form fields:

| Field | Type | Required | Validation |
|---|---|---|---|
| Product Name | Text | ✅ | Non-empty |
| Product Type | Text | ✅ | Non-empty |
| Quantity Stock | Number | ✅ | Must be ≥ 0 |
| MRP | Number | ✅ | Must be ≥ 0 |
| Selling Price | Number | ✅ | Must be ≤ MRP |
| Brand Name | Text | ✅ | Non-empty |
| Description | Textarea | No | Optional |

---

## REST API Reference

**Base URL:** `http://localhost:5000/api`

All endpoints accept and return `application/json`.

---

### `GET /api/products`

Fetch all products filtered by publish status.

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `isPublished` | boolean | Yes | `true` for published, `false` for unpublished |

**Example Request:**
```
GET /api/products?isPublished=true
```

**Example Response (200 OK):**
```json
[
  {
    "_id": "664a1bc2f1234567890abcde",
    "name": "Premium Brownie",
    "type": "Bakery",
    "stock": 50,
    "mrp": 200,
    "sellingPrice": 150,
    "brand": "CakeZone",
    "description": "Rich chocolate brownie",
    "isPublished": true,
    "createdAt": "2024-05-20T10:30:00.000Z"
  }
]
```

---

### `POST /api/products`

Create a new product.

**Request Body:**
```json
{
  "name": "Walnut Cake",
  "type": "Bakery",
  "stock": 30,
  "mrp": 500,
  "sellingPrice": 420,
  "brand": "CakeZone",
  "description": "Rich walnut cake",
  "isPublished": true
}
```

**Response (201 Created):**
```json
{
  "_id": "664a1bc2f1234567890abcdf",
  "name": "Walnut Cake",
  ...
}
```

**Response (400 Bad Request — Validation Failed):**
```json
{
  "message": "Validation failed",
  "errors": [
    "Product name is required",
    "Selling price cannot be greater than MRP"
  ]
}
```

---

### `PUT /api/products/:id`

Update an existing product by ID.

**URL Parameter:** `:id` — MongoDB ObjectId or in-memory string ID

**Request Body:** Same fields as POST (all required)

**Response (200 OK):** Updated product object

**Response (404 Not Found):**
```json
{ "message": "Product not found" }
```

---

### `DELETE /api/products/:id`

Delete a product by ID.

**URL Parameter:** `:id` — MongoDB ObjectId or in-memory string ID

**Response (200 OK):**
```json
{ "message": "Product deleted" }
```

**Response (404 Not Found):**
```json
{ "message": "Product not found" }
```

---

## Database Schema

**Model:** `Product`  
**File:** `server/models/Product.js`

```javascript
const productSchema = new mongoose.Schema({
  name:         { type: String,  required: true },   // Product display name
  type:         { type: String,  required: true },   // Category/type e.g. "Bakery"
  description:  { type: String  },                  // Optional description
  mrp:          { type: Number,  required: true },   // Maximum Retail Price
  sellingPrice: { type: Number,  required: true },   // Actual selling price (≤ MRP)
  stock:        { type: Number,  required: true },   // Available quantity
  brand:        { type: String  },                  // Brand name
  images:       [{ type: String }],                 // Array of image URLs
  isPublished:  { type: Boolean, default: false },  // Publish status
  createdAt:    { type: Date,    default: Date.now } // Auto timestamp
});
```

**Sample Data (pre-loaded in in-memory fallback):**

| Name | Type | Stock | MRP | Selling Price | Brand | Published |
|---|---|---|---|---|---|---|
| Premium Brownie | Bakery | 50 | ₹200 | ₹150 | CakeZone | ✅ Yes |
| Walnut Cake | Bakery | 20 | ₹500 | ₹450 | CakeZone | ❌ No |

---

## Component Architecture

```
App.jsx
├── /login       → Login.jsx
├── /otp         → Otp.jsx
├── /signup      → Signup.jsx
└── /home        → Dashboard.jsx
                    ├── Sidebar.jsx           (fixed left nav + search)
                    ├── ProductTable.jsx       (data table with Edit/Delete)
                    └── AddProductDrawer.jsx   (slide-in form for add/edit)
```

All components follow a **single-responsibility principle** — each handles one focused concern. Shared CSS is reused across Login, OTP, and Signup via `Login.css`.

---

## Design System

Global CSS variables defined in `client/src/index.css`:

| Variable | Value | Usage |
|---|---|---|
| `--primary-color` | `#071074` | Buttons, active states, links |
| `--text-color` | `#1a1c1e` | Body text |
| `--light-text` | `#6b7280` | Labels, secondary text |
| `--border-color` | `#e5e7eb` | Dividers, input borders |
| `--white` | `#ffffff` | Backgrounds |

**Typography:** System sans-serif stack with carefully chosen weights (600 for labels, 700–800 for headings).

**Left Panel Gradient (Login/OTP/Signup):**
```css
linear-gradient(
  180deg,
  rgba(10, 15, 107, 0.75) 0%,
  rgba(27, 44, 143, 0.60) 20%,
  rgba(111, 74, 168, 0.45) 45%,
  rgba(229, 148, 156, 0.35) 70%,
  rgba(230, 161, 129, 0.30) 85%,
  rgba(192, 58, 20, 0.25) 100%
)
```

---

## Responsiveness

The application is fully responsive across all device sizes:

| Breakpoint | Behavior |
|---|---|
| **Desktop** (`>1024px`) | Full layout: sidebar + hero panel + form/table |
| **Tablet** (`≤1024px`) | Narrower sidebar (220px), smaller hero card, tighter padding |
| **Mobile** (`≤768px`) | Sidebar hidden, hero panel hidden, form takes full screen |
| **Small Mobile** (`≤480px`) | Further reduced font sizes and padding |

---

## Error Handling & Validation

### Backend (Server-side)

Every `POST` and `PUT` request passes through the `validateProduct` middleware before reaching the database:

- ✅ Checks all required fields are present and non-empty
- ✅ Validates `mrp`, `sellingPrice`, `stock` are valid non-negative numbers
- ✅ Ensures `sellingPrice ≤ mrp` (business rule)
- ✅ Returns structured `{ message, errors[] }` with HTTP `400` on failure
- ✅ All DB operations wrapped in `try/catch` with appropriate HTTP error codes

### Frontend (Client-side)

- Login: `required` field enforced by HTML form validation
- OTP: each digit is `required`
- Signup: JavaScript validation for password match and minimum length, inline error message
- Add/Edit Product: All required fields enforced by HTML `required` attribute
- Dashboard: `try/catch` on all API calls; `console.error` logging; user-facing `alert` on form submission failure

---

## In-Memory Fallback

If MongoDB is not running or not configured, the server **automatically falls back** to an in-memory array instead of crashing. This allows the full application to be demonstrated and tested without any database setup.

**How it works:**
```javascript
const isDBConnected = () => mongoose.connection.readyState === 1;

// In every route handler:
if (isDBConnected()) {
  // Use MongoDB
} else {
  // Use memoryProducts array
}
```

**Pre-loaded sample data:**
- `Premium Brownie` (Published)
- `Walnut Cake` (Unpublished)

> ⚠️ Data added in in-memory mode is **not persisted** across server restarts.

---

## Evaluation Criteria Coverage

| Criterion | Implementation |
|---|---|
| **Pixel-perfect UI** | All screens built to match Figma exactly — gradients, typography, spacing, card effects |
| **Functionality** | All APIs working (GET, POST, PUT, DELETE) + full navigation flow (Login → OTP → Dashboard) |
| **Code Quality** | Modular components, reusable CSS, clear separation of concerns (routes, models, components, pages) |
| **Responsiveness** | 3-tier responsive design (desktop/tablet/mobile) across all pages |
| **Data Handling** | Full CRUD for products; changes immediately reflected in UI; MongoDB + in-memory fallback |
| **Git Usage** | Clean folder structure with `client/` and `server/` separation |

---

## Author

Built by: **Arnav Sharma**  
Assignment for: **Orufy Technologies Pvt. Ltd.**  
Stack: React + Node.js + Express + MongoDB
