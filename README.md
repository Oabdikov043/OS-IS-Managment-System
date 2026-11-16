# OS&IS Market — E-Commerce Application

OS&IS Market is a full-stack e-commerce Single Page Application (SPA) built with React and Supabase.

The application allows customers to browse products, manage their shopping carts, place orders, and track their order history. Administrators can manage products and process customer orders.

## Technologies

- React and Vite
- JavaScript (JSX)
- React Router
- Supabase Authentication
- Supabase PostgreSQL Database
- Supabase Row Level Security (RLS)
- Tailwind CSS and CSS Modules
- React Context API

## Functional Guide

### 1. Application Overview

OS&IS Market is an online grocery store designed for customers and administrators.

The application uses a hosted Supabase backend for authentication and persistent data storage.

### 2. Guest Functionality

Visitors can:
- View the home page.
- Browse the product catalog.
- View individual product details.
- Register a new account.
- Log in to an existing account.

### 3. Authenticated User Functionality

Registered users can:
- Log in and log out.
- Access their profile.
- Add products to the shopping cart.
- Change product quantities and remove items.
- Review their cart total.
- Place orders through checkout.
- View their order history.
- Track order statuses.

### 4. Administrator Functionality

Administrators can:
- Access the administrative dashboard.
- View all products.
- Create new products.
- Edit authorized products.
- Delete authorized products.
- View all customer orders.
- Review order details and totals.
- Change order statuses.

Supported order statuses:
- Pending
- Confirmed
- Shipped
- Delivered
- Cancelled

### 5. Application Routes

| Route | Description | Access |
|---|---|---|
| `/` | Home page | Public |
| `/products` | Product catalog | Public |
| `/products/:productId` | Product details | Public |
| `/register` | Registration | Guest |
| `/login` | Login | Guest |
| `/cart` | Shopping cart | Public |
| `/profile` | User profile | Authenticated |
| `/checkout` | Order checkout | Authenticated |
| `/my-orders` | Order history | Authenticated |
| `/admin` | Admin dashboard | Administrator |
| `/admin/products/create` | Create product | Administrator |
| `/admin/products/:productId/edit` | Edit product | Administrator |
| `/admin/orders` | Manage orders | Administrator |

### 6. Database

The application uses Supabase PostgreSQL with the following main tables:

- `profiles` — User profiles and roles.
- `categories` — Product categories.
- `products` — Product information, pricing and stock.
- `orders` — Customer orders and statuses.
- `order_items` — Products and quantities belonging to orders.

### 7. Authentication and Security

Supabase Authentication manages user sessions.

The application uses React route guards:
- `GuestRoute`
- `PrivateRoute`
- `AdminRoute`

Supabase Row Level Security controls access to database records.

Database functions handle order creation and administrative order-status updates.

## Installation and Local Setup

### Prerequisites

- Node.js
- npm
- A configured Supabase project

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure the Supabase environment variables expected by `src/utils/requests.js`.

Use your Supabase project URL and public client key. Never expose the Supabase service-role key in frontend code.

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Project Structure

```text
src/
├── components/
│   ├── admin/
│   ├── cart/
│   ├── Catalog/
│   ├── checkout/
│   ├── footer/
│   ├── header/
│   ├── login/
│   ├── orders/
│   ├── productcard/
│   ├── productdetails/
│   ├── profile/
│   ├── register/
│   └── routeguards/
├── contexts/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── services/
│   ├── authService.js
│   ├── categoriesService.js
│   ├── ordersService.js
│   └── productService.js
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```

## Deployment

Frontend: **TO BE ADDED AFTER DEPLOYMENT**

Backend: Supabase (hosted PostgreSQL database and authentication).

The frontend can be deployed using Vercel.

## Project Status

The application includes product management, authentication, shopping cart functionality, checkout, order history and administrative order processing.

## Live Demo

https://os-is-managment-system.vercel.app

## Author

Osman Abdikov

React Project — SoftUni, 2026
