# 🌍 GlobeTrotter

A full-stack travel planning and community platform built with **React**, **Node.js**, **Express**, and **PostgreSQL**. Share trips, discover destinations, and inspire fellow travelers.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Features](#features)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Git Workflow](#git-workflow)
- [Performance & Security](#performance--security)

---

## Overview

**GlobeTrotter** is a modern travel companion that enables users to:
- Create and manage personalized trip itineraries
- Share trips publicly with the global community
- Discover and copy curated trips from other travelers
- Track destinations, activities, budgets, and accommodations
- View live community trends and popular destinations
- Manage user profiles with preferences and travel history

The platform emphasizes **scalability**, **clean code**, **robust validation**, and a **delightful UI**—built from the ground up using **PostgreSQL** (not Firebase/Supabase) and minimal third-party dependencies.

---

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** (fast build tool)
- **Lucide React** (icon library)
- **Axios** (HTTP client)
- **React Router** (navigation)
- **Custom CSS** (scalable, consistent theming)

### Backend
- **Node.js + Express** (RESTful API)
- **Prisma ORM** (database abstraction + migrations)
- **PostgreSQL** (relational database)
- **JWT** (secure authentication)
- **bcrypt** (password hashing)

### Tools & Practices
- **Git** (version control with semantic commits)
- **npm** (dependency management)
- **.env** (environment configuration)
- **Prisma Migrations** (schema versioning)

---

## Project Structure

```
Globe-Trotter/
├── globetrotter-api/              # Backend service
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/            # DB version history
│   ├── server.js                  # Express app & routes
│   ├── package.json
│   └── .env                       # API secrets (not in git)
│
├── globetrotter-ui/               # Frontend app (Vite + React)
│   ├── src/
│   │   ├── pages/                 # Screen components (12+ screens)
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── CommunityPage.tsx
│   │   │   ├── CreateTripPage.tsx
│   │   │   ├── AdminPanelPage.tsx
│   │   │   └── ...
│   │   ├── components/            # Reusable UI (Header, etc.)
│   │   ├── contexts/              # Auth context
│   │   ├── lib/                   # Axios API client
│   │   ├── App.tsx & App.css      # Root router & styles
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── schema.sql                     # PostgreSQL schema reference
├── GlobeTrotter.pdf               # Design reference
├── globetrotter_vertical_plan.md  # Development roadmap
├── GIT_COMMIT_GUIDE.md            # Semantic commit conventions
├── DEV_A_TESTING_GUIDE.md         # Manual test flows
└── README.md                      # This file
```

---

## Prerequisites

Ensure you have installed:
- **Node.js** 18+ (`node --version`)
- **npm** 9+ (`npm --version`)
- **PostgreSQL** 14+ (local or cloud, e.g., Neon)
- **Git** 2.30+

---

## Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/Globe-Trotter.git
cd Globe-Trotter
```

### 2. Backend Setup
```bash
cd globetrotter-api

# Install dependencies
npm install

# Create .env file with database URL and secrets
cat > .env << EOF
DATABASE_URL="postgresql://user:password@localhost:5432/globetrotter"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=5000
EOF

# Run Prisma migrations to set up database schema
npx prisma migrate deploy

# (Optional) Seed database with sample data
npx prisma db seed

cd ..
```

### 3. Frontend Setup
```bash
cd globetrotter-ui

# Install dependencies
npm install

# Create .env for API base URL (optional, defaults to http://localhost:5000)
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:5000
EOF

cd ..
```

---

## Running the Application

### Start the Backend API
```bash
cd globetrotter-api
npm run dev
# Runs on http://localhost:5000
# Health check: http://localhost:5000/api/health
```

### Start the Frontend (in a new terminal)
```bash
cd globetrotter-ui
npm run dev
# Runs on http://localhost:5173
# Open http://localhost:5173 in your browser
```

### Verify Setup
1. Open **http://localhost:5173** in your browser.
2. Register a new account or login.
3. Navigate through dashboard, community, and trip creation pages.
4. Open **DevTools** (F12) → **Console** to check for errors.

---

## API Endpoints

### Authentication
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and get JWT token
- `GET /api/auth/me` — Get authenticated user profile (requires token)

### Profile
- `GET /api/users/:id/profile` — Fetch user profile
- `PUT /api/users/:id` — Update user profile (auth required)

### Trips
- `POST /api/trips/community` — Create and share a trip publicly (auth required)
- `GET /api/trips/community` — List all public trips
- `GET /api/trips/public/:shareToken` — View a specific public trip
- `POST /api/trips/:id/copy` — Copy a public trip to user's dashboard (auth required)
- `POST /api/trips/:id/share` — Mark a trip as public (auth required)

### Destinations
- `GET /api/destinations/popular` — List popular cities and activities

### Health Check
- `GET /api/health` — Service status

**Authentication Header:**
All protected endpoints require:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Database Schema

### Core Tables

#### `User`
- `id` (UUID, Primary Key)
- `email` (String, Unique, Indexed)
- `passwordHash` (String)
- `firstName`, `lastName` (String)
- `bio`, `city`, `country` (String, Optional)
- `photoUrl` (String, Optional)
- `preferences` (JSON, Optional)
- `createdAt`, `updatedAt`, `lastLoginAt` (DateTime)

#### `Trip`
- `id` (UUID, Primary Key)
- `userId` (UUID, Foreign Key → User)
- `name`, `description` (String)
- `startDate`, `endDate` (DateTime)
- `coverImageUrl` (String, Optional)
- `totalBudget`, `currencyCode` (Decimal, String)
- `isPublic` (Boolean)
- `shareToken` (String, Unique, Optional)
- `status` (Enum: 'planning', 'ongoing', 'completed')
- `viewCount`, `copyCount` (Int, default 0)
- `createdAt`, `updatedAt` (DateTime)

#### `Stop` (Trip Leg)
- `id` (UUID, Primary Key)
- `tripId` (UUID, Foreign Key → Trip)
- `cityId` (UUID, Foreign Key → City)
- `arrivalDate`, `departureDate` (DateTime)
- `stopOrder` (Int)
- `accommodationName`, `accommodationAddress` (String, Optional)
- `accommodationCost` (Decimal, Optional)
- `transportType`, `transportCost` (String, Decimal)
- `notes` (Text, Optional)

#### `Activity`
- `id` (UUID, Primary Key)
- `name`, `description` (String)
- `category` (Enum: 'adventure', 'culture', 'food', 'relaxation', etc.)
- `estimatedCost` (Decimal)
- `durationHours` (Int)
- `difficulty` (Enum: 'easy', 'moderate', 'challenging')

#### `TripActivity` (Activity in a Stop)
- `id` (UUID, Primary Key)
- `stopId` (UUID, Foreign Key → Stop)
- `activityId` (UUID, Foreign Key → Activity)
- `scheduledDate`, `scheduledTime` (DateTime, Time)
- `activityOrder` (Int)
- `actualCost` (Decimal, Optional)
- `status` (Enum: 'planned', 'completed', 'skipped')

#### `City`
- `id` (UUID, Primary Key)
- `name` (String)
- `countryId` (UUID, Foreign Key → Country)
- `latitude`, `longitude` (Float)
- `imageUrl` (String)
- `costIndex`, `popularityScore` (Float)
- `isActive` (Boolean)

#### `Country`
- `id` (UUID, Primary Key)
- `name` (String, Unique)
- `code` (String, Unique)
- `continent` (String)

---

## Features

### User Management
✅ Secure registration & login with JWT tokens  
✅ Profile management (bio, photo, preferences, travel history)  
✅ Password hashing with bcrypt  

### Trip Planning
✅ Create multi-stop itineraries with dates and budgets  
✅ Add activities, accommodations, and transport costs per stop  
✅ Track actual vs. planned spending  
✅ Calendar view of trips  

### Community & Sharing
✅ Post trips publicly with one-click sharing  
✅ Browse community trips with search, sort (popular/recent/A-Z), and grouping (by destination/creator)  
✅ Copy public trips to customize your own  
✅ View counts and trending trips  

### Admin Dashboard
✅ Monitor user activity, popular cities, and trending activities  
✅ Chart views (pie, bar, line) for analytics  
✅ Group, filter, sort, and search capabilities  

### Input Validation & Error Handling
✅ Required field validation (name, description, dates)  
✅ Date range validation (start ≤ end)  
✅ Graceful error messages in UI  
✅ API returns structured error objects  

### Responsive Design
✅ Mobile-first CSS with consistent breakpoints  
✅ Hamburger menu navigation on mobile  
✅ Touch-friendly buttons and inputs  
✅ Consistent color scheme (teal accent, warm earth tones)  

---

## Development Guidelines

### Code Standards
1. **Modularity**: Split large components into smaller, reusable pieces.
2. **TypeScript**: Use types on all props, API responses, and state.
3. **Constants**: Extract magic strings/numbers into named constants.
4. **Comments**: Clarify complex logic, but keep code self-documenting.
5. **Error Handling**: Always catch and log errors; surface user-friendly messages.

### File Organization
```
src/
├── pages/                 # Full page components (screens)
├── components/            # Reusable UI components
├── contexts/              # React Context (auth, themes)
├── lib/                   # Utilities (API client, helpers)
├── App.tsx & App.css      # Root router + global styles
└── main.tsx               # Entry point
```

### Naming Conventions
- **Components**: PascalCase (`LoginPage.tsx`, `Header.tsx`)
- **Files**: camelCase or kebab-case for utilities (`api.ts`, `helpers.ts`)
- **Variables/Functions**: camelCase (`handleLogin`, `userData`)
- **Enums/Constants**: UPPER_SNAKE_CASE (`JWT_SECRET`, `API_BASE_URL`)

### State Management
- Use React `useState` and `useContext` for app-wide state (auth, user).
- Use `useMemo` for expensive computations (filtered/grouped trips).
- Avoid prop drilling; lift state to nearest common ancestor.

---

## Testing

### Manual Testing Flows
See [DEV_A_TESTING_GUIDE.md](DEV_A_TESTING_GUIDE.md) for detailed test scenarios:
1. Register and login
2. Create a trip with dates and activities
3. Post a trip to the community
4. Search and sort community trips
5. Copy a trip from community
6. Update user profile
7. Admin dashboard navigation

### Automated Testing (Future)
```bash
# Unit tests (Jest)
npm run test

# Integration tests (Playwright)
npm run test:e2e

# Coverage report
npm run coverage
```

---

## Git Workflow

### Semantic Commits
Follow [GIT_COMMIT_GUIDE.md](GIT_COMMIT_GUIDE.md) for consistent commit messages:

```bash
# Feature
git commit -m "feat: add community post validation with date range checks"

# Bug fix
git commit -m "fix: resolve community search filtering by destination"

# Docs
git commit -m "docs: update README with API endpoints"

# Refactor
git commit -m "refactor: extract trip form validation logic"

# Style (non-functional)
git commit -m "style: align community card margins and spacing"
```

### Branch Naming
```
feature/community-posting
bugfix/trip-date-validation
docs/api-endpoints
```

### Typical Workflow
```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and test
npm run dev
# [Test manually or with automated tests]

# Stage and commit
git add .
git commit -m "feat: your clear commit message"

# Push and create a PR
git push origin feature/your-feature-name
# Create PR on GitHub for code review

# After approval, merge to main
git checkout main
git pull origin main
git merge feature/your-feature-name
git push origin main
```

---

## Performance & Security

### Performance
- **Frontend**: Vite tree-shaking, code splitting, and lazy-loaded routes.
- **Backend**: Prisma query optimization, pagination (take/skip), indexed lookups.
- **Database**: Proper indexes on `email`, `userId`, `isPublic`, `shareToken`.
- **Caching**: Community trips cached in component state; invalidate on post.

### Security
- **Authentication**: JWT tokens with 7-day expiry; `requireAuth` middleware.
- **Authorization**: Verify ownership before updating/deleting user data.
- **Input Validation**: All API payloads validated (non-null, type, range).
- **Password**: bcrypt with salt rounds 10; never expose in responses.
- **CORS**: Configured for frontend domain; restrict in production.
- **SQL Injection**: Prisma ORM escapes all queries; no string concatenation.
- **Error Messages**: Generic API errors; log details server-side only.

### Environment Variables
Never commit `.env` files. Use `.env.example` as template:
```bash
# .env.example
DATABASE_URL="postgresql://user:password@host:5432/globetrotter"
JWT_SECRET="change-me-in-production"
PORT=5000
VITE_API_BASE_URL="http://localhost:5000"
```

---

## Deployment

### Backend (Node.js on Vercel, Heroku, or Railway)
1. Ensure `.env` is set in platform secrets.
2. Run `npm run build` (if applicable) and `npm start`.
3. Database migrations: `npx prisma migrate deploy` in build step.

### Frontend (Vercel, Netlify)
1. Set `VITE_API_BASE_URL` to production API URL.
2. Deploy via `npm run build` → output `/dist`.
3. Set up environment variables in platform UI.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`.
3. Commit with semantic messages (see [GIT_COMMIT_GUIDE.md](GIT_COMMIT_GUIDE.md)).
4. Push to your fork.
5. Open a pull request with a clear description.

---

## License

MIT License — see LICENSE file for details.

---

## Support & Contact

For issues, questions, or feedback:
- Open an issue on GitHub.
- Email: support@globetrotter.local
- Discord: [Join our community server](https://discord.gg/globetrotter)

---

**Built with ❤️ for travelers by developers who love clean code.**
