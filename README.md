# Instant Wellness Tax Fix 🚁💊

A full-stack admin dashboard for calculating and managing sales tax for the "Instant Wellness Kits" drone delivery service in New York State.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-19.0-61dafb)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff)
![Express](https://img.shields.io/badge/Express-4.21-000000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38b2ac)

## 📖 Overview

This application solves the critical issue of calculating accurate sales tax for drone deliveries based on precise GPS coordinates (latitude/longitude). It automatically identifies the correct tax jurisdiction within New York State and calculates the breakdown (State, County, City, Special) for each order.

## ✨ Features

- **📍 Geospatial Tax Calculation**: Automatically determines the correct tax rate based on delivery coordinates using a database of NY tax jurisdictions.
- **📂 CSV Import**: Bulk upload orders via CSV file. The system processes them, calculates taxes, and stores them in the database.
- **📝 Manual Entry**: Create individual orders manually with immediate tax calculation.
- **📊 Orders Dashboard**: View all orders with detailed tax breakdowns (State, County, City, Special rates).
- **📄 Pagination**: Efficiently browse through large datasets.

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS v4, Lucide React (Icons), Motion (Animations)
- **Backend**: Node.js, Express, Better-SQLite3 (Database)
- **Build Tool**: Vite
- **Language**: TypeScript (Full-stack)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/instant-wellness-tax-fix.git
   cd instant-wellness-tax-fix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

### Building for Production

To build the application for production:

```bash
npm run build
```

This compiles the frontend to `dist/` and prepares the server.

To start the production server:

```bash
npm start
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/orders` | Fetch paginated list of orders |
| `POST` | `/api/orders` | Create a single order manually |
| `POST` | `/api/orders/import` | Bulk import orders from CSV |

### CSV Format
The import feature expects a CSV file with the following columns:
```csv
id,longitude,latitude,timestamp,subtotal
1,-78.86718,42.01246,2025-11-04 10:17:04,120.0
```

## ☁️ Deployment on Vercel

This application is configured as a monolithic Express app served via Vite.

**Important Note for Vercel:**
Since this application uses **SQLite** (a file-based database), data **will not persist** between deployments or serverless function invocations on Vercel's standard environment, as the filesystem is ephemeral.

For a persistent production deployment on Vercel, you should:
1. Use an external database provider (e.g., Turso, Supabase, or Vercel Postgres).
2. Update `server/db.ts` to connect to the external database.

### Vercel Configuration (`vercel.json`)

If deploying as-is for demonstration purposes:

1. Create a `vercel.json` file in the root:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/api/index.js" }]
   }
   ```
2. You may need to adapt the entry point for Vercel's serverless functions.

**Recommended for Production:** Deploy to a VPS or a platform supporting persistent storage (like Railway, Render, or Fly.io) if sticking with SQLite.

## 📂 Project Structure

```
├── src/
│   ├── components/    # React UI components
│   ├── server/        # Backend logic
│   │   ├── db.ts      # Database connection
│   │   ├── routes.ts  # API Routes
│   │   ├── taxService.ts # Tax calculation logic
│   │   └── tax_rates.ts  # Jurisdiction data
│   ├── App.tsx        # Main React component
│   └── main.tsx       # Entry point
├── dist/              # Production build output
├── database.sqlite    # SQLite database file
├── package.json
└── vite.config.ts
```

## 📄 License

This project is licensed under the MIT License.
