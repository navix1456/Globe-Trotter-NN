# GlobeTrotter - Vertical Slice Development Plan (2 Developers, 8 Hours)

## 🎯 Core Philosophy: Feature-Complete Vertical Slices

Instead of splitting backend/frontend, each developer owns **complete features** from database to UI. This ensures:
- Each feature is fully functional when complete
- No integration hell at the end
- Early testing of end-to-end flows
- Better code ownership and accountability

---

## 🎨 PREMIUM COLOR THEME & DESIGN SYSTEM

### Design Direction: "Sophisticated Explorer"
A refined, luxury travel aesthetic with earthy warmth and modern elegance - think high-end travel magazines meets boutique travel agencies.

### Color Palette

#### Primary Colors (Earthy Sophistication)
```css
:root {
  /* Primary - Deep Teal (Trust, Adventure, Depth) */
  --primary-50: #f0f9f9;
  --primary-100: #d9f0ee;
  --primary-200: #b3e1de;
  --primary-300: #80cdc7;
  --primary-400: #4db0a8;
  --primary-500: #2d8b83;   /* Main brand color */
  --primary-600: #236f69;
  --primary-700: #1d5854;
  --primary-800: #194644;
  --primary-900: #163a39;

  /* Secondary - Warm Terracotta (Warmth, Energy, Earth) */
  --secondary-50: #fef6f3;
  --secondary-100: #fde9e0;
  --secondary-200: #fbd0bf;
  --secondary-300: #f7ac93;
  --secondary-400: #f17d5f;
  --secondary-500: #e85835;   /* Accent color */
  --secondary-600: #d43d22;
  --secondary-700: #b22f1c;
  --secondary-800: #932a1c;
  --secondary-900: #7a271d;

  /* Accent - Gold (Luxury, Premium, Success) */
  --accent-50: #fefbeb;
  --accent-100: #fdf4c7;
  --accent-200: #fbe88a;
  --accent-300: #f9d54d;
  --accent-400: #f7c123;   /* Gold accent */
  --accent-500: #e1a00c;
  --accent-600: #c27b07;
  --accent-700: #9b570a;
  --accent-800: #804510;
  --accent-900: #6d3913;
}
```

#### Neutral Colors (Refined Grays with Warmth)
```css
:root {
  /* Warm Neutrals */
  --gray-50: #fafaf9;
  --gray-100: #f5f5f4;
  --gray-200: #e7e5e4;
  --gray-300: #d6d3d1;
  --gray-400: #a8a29e;
  --gray-500: #78716c;
  --gray-600: #57534e;
  --gray-700: #44403c;
  --gray-800: #292524;
  --gray-900: #1c1917;

  /* Background Colors */
  --bg-primary: #fdfcfb;         /* Warm white */
  --bg-secondary: #f8f6f4;       /* Light warm gray */
  --bg-tertiary: #f0ede9;        /* Deeper warm */
  --bg-dark: #1c1917;            /* Rich dark */
  
  /* Text Colors */
  --text-primary: #1c1917;       /* Almost black */
  --text-secondary: #57534e;     /* Medium gray */
  --text-tertiary: #78716c;      /* Light gray */
  --text-inverse: #fafaf9;       /* White on dark */
}
```

#### Semantic Colors
```css
:root {
  /* Status Colors */
  --success: #16a34a;
  --success-light: #dcfce7;
  --warning: #f59e0b;
  --warning-light: #fef3c7;
  --error: #dc2626;
  --error-light: #fee2e2;
  --info: #2563eb;
  --info-light: #dbeafe;
}
```

### Typography System

```css
:root {
  /* Font Families */
  --font-display: 'Playfair Display', 'Georgia', serif;  /* Elegant headers */
  --font-heading: 'Montserrat', 'Helvetica Neue', sans-serif;  /* Clean headings */
  --font-body: 'Inter', 'system-ui', sans-serif;  /* Readable body */
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;  /* Code/data */

  /* Font Sizes (Fluid Typography) */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem);
  --text-3xl: clamp(1.875rem, 1.65rem + 1.125vw, 2.25rem);
  --text-4xl: clamp(2.25rem, 1.95rem + 1.5vw, 3rem);
  --text-5xl: clamp(3rem, 2.5rem + 2.5vw, 4rem);

  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}
```

### Spacing & Layout

```css
:root {
  /* Spacing Scale (8px base) */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* Shadows (Elegant & Subtle) */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Component Styling Examples

```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
}

/* Card Component */
.card {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
  border: 1px solid var(--gray-200);
  transition: all var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

/* Input Fields */
.input {
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  transition: all var(--transition-fast);
}

.input:focus {
  border-color: var(--primary-500);
  outline: none;
  box-shadow: 0 0 0 3px rgba(45, 139, 131, 0.1);
}
```

### Design Principles for Application

1. **Whitespace**: Generous padding and margins for breathing room
2. **Imagery**: High-quality travel photos with subtle overlays
3. **Icons**: Lucide React icons for consistency
4. **Gradients**: Subtle gradients for headers and CTAs
5. **Animations**: Smooth transitions on hover, staggered list animations
6. **Depth**: Layered cards with shadows for hierarchy
7. **Consistency**: Reuse design tokens throughout

---

## 🗄️ ROBUST DATABASE SCHEMA (PostgreSQL)

### Complete Schema with Relationships, Constraints & Indexes

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(100),
    country VARCHAR(100),
    photo_url TEXT,
    bio TEXT,
    preferences JSONB DEFAULT '{}',  -- Store user preferences
    is_active BOOLEAN DEFAULT true,
    is_email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
CREATE INDEX idx_users_is_active ON users(is_active);

-- ============================================
-- COUNTRIES TABLE (Reference Data)
-- ============================================
CREATE TABLE countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    code VARCHAR(3) UNIQUE NOT NULL,  -- ISO 3166-1 alpha-3
    region VARCHAR(100),
    subregion VARCHAR(100),
    currency_code VARCHAR(3),
    currency_symbol VARCHAR(10),
    average_cost_index DECIMAL(5,2) DEFAULT 1.0,  -- 1.0 = baseline
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_countries_name ON countries(name);
CREATE INDEX idx_countries_region ON countries(region);

-- ============================================
-- CITIES TABLE
-- ============================================
CREATE TABLE cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    timezone VARCHAR(50),
    population INTEGER,
    description TEXT,
    image_url TEXT,
    cover_image_url TEXT,
    
    -- Cost indicators
    cost_index DECIMAL(5,2) DEFAULT 1.0,  -- Relative to baseline
    accommodation_avg_cost DECIMAL(10,2),
    food_avg_cost DECIMAL(10,2),
    transport_avg_cost DECIMAL(10,2),
    
    -- Popularity metrics
    popularity_score INTEGER DEFAULT 0,
    total_visits INTEGER DEFAULT 0,
    
    -- Metadata
    best_time_to_visit VARCHAR(100),  -- e.g., "March to May"
    climate_type VARCHAR(50),
    language_spoken VARCHAR(100),
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_city_country UNIQUE(name, country_id)
);

CREATE INDEX idx_cities_country ON cities(country_id);
CREATE INDEX idx_cities_popularity ON cities(popularity_score DESC);
CREATE INDEX idx_cities_cost_index ON cities(cost_index);
CREATE INDEX idx_cities_name ON cities(name);
CREATE INDEX idx_cities_location ON cities(latitude, longitude);

-- ============================================
-- ACTIVITY CATEGORIES TABLE
-- ============================================
CREATE TABLE activity_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),  -- e.g., "camera", "utensils", "map"
    color_hex VARCHAR(7),   -- e.g., "#2D8B83"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_categories_slug ON activity_categories(slug);

-- ============================================
-- ACTIVITIES TABLE
-- ============================================
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    category_id UUID REFERENCES activity_categories(id) ON DELETE SET NULL,
    
    description TEXT,
    long_description TEXT,
    image_url TEXT,
    
    -- Pricing
    cost DECIMAL(10,2) NOT NULL DEFAULT 0,
    currency_code VARCHAR(3) DEFAULT 'USD',
    is_free BOOLEAN DEFAULT false,
    
    -- Duration
    duration_minutes INTEGER,  -- Estimated duration
    
    -- Location details
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Ratings & Reviews
    rating DECIMAL(3,2) DEFAULT 0.0,  -- 0.00 to 5.00
    review_count INTEGER DEFAULT 0,
    
    -- Metadata
    difficulty_level VARCHAR(20),  -- easy, moderate, hard
    suitable_for VARCHAR(100),  -- families, couples, solo, groups
    tags TEXT[],  -- Array of tags: ['outdoor', 'historical', 'photography']
    
    -- Booking info
    requires_booking BOOLEAN DEFAULT false,
    booking_url TEXT,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT positive_cost CHECK (cost >= 0),
    CONSTRAINT valid_rating CHECK (rating >= 0 AND rating <= 5)
);

CREATE INDEX idx_activities_city ON activities(city_id);
CREATE INDEX idx_activities_category ON activities(category_id);
CREATE INDEX idx_activities_cost ON activities(cost);
CREATE INDEX idx_activities_rating ON activities(rating DESC);
CREATE INDEX idx_activities_tags ON activities USING GIN(tags);
CREATE INDEX idx_activities_is_free ON activities(is_free);

-- ============================================
-- TRIPS TABLE
-- ============================================
CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Basic info
    name VARCHAR(200) NOT NULL,
    description TEXT,
    cover_image_url TEXT,
    
    -- Dates
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    
    -- Budget
    total_budget DECIMAL(12,2),
    currency_code VARCHAR(3) DEFAULT 'USD',
    actual_cost DECIMAL(12,2) DEFAULT 0,
    
    -- Trip metadata
    total_days INTEGER GENERATED ALWAYS AS (end_date - start_date + 1) STORED,
    total_stops INTEGER DEFAULT 0,
    total_activities INTEGER DEFAULT 0,
    
    -- Sharing & Privacy
    is_public BOOLEAN DEFAULT false,
    share_token VARCHAR(100) UNIQUE,  -- For public sharing
    view_count INTEGER DEFAULT 0,
    copy_count INTEGER DEFAULT 0,  -- How many times copied by others
    
    -- Status
    status VARCHAR(20) DEFAULT 'planning',  -- planning, confirmed, ongoing, completed, cancelled
    
    -- Collaboration
    is_collaborative BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT valid_dates CHECK (end_date >= start_date),
    CONSTRAINT positive_budget CHECK (total_budget IS NULL OR total_budget >= 0)
);

CREATE INDEX idx_trips_user ON trips(user_id);
CREATE INDEX idx_trips_dates ON trips(start_date, end_date);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_trips_is_public ON trips(is_public);
CREATE INDEX idx_trips_share_token ON trips(share_token);
CREATE INDEX idx_trips_created_at ON trips(created_at DESC);

-- ============================================
-- TRIP STOPS TABLE (Cities in a trip)
-- ============================================
CREATE TABLE trip_stops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    city_id UUID NOT NULL REFERENCES cities(id) ON DELETE RESTRICT,
    
    -- Dates for this stop
    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL,
    
    -- Ordering
    stop_order INTEGER NOT NULL,  -- Order of stops in the trip
    
    -- Accommodation
    accommodation_name VARCHAR(200),
    accommodation_address TEXT,
    accommodation_cost DECIMAL(10,2),
    accommodation_booking_url TEXT,
    
    -- Transportation to this stop
    transport_type VARCHAR(50),  -- flight, train, bus, car, ferry
    transport_cost DECIMAL(10,2),
    transport_details TEXT,
    
    -- Notes
    notes TEXT,
    
    -- Calculated fields
    num_nights INTEGER GENERATED ALWAYS AS (departure_date - arrival_date) STORED,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT valid_stop_dates CHECK (departure_date >= arrival_date),
    CONSTRAINT unique_trip_stop_order UNIQUE(trip_id, stop_order),
    CONSTRAINT positive_costs CHECK (
        (accommodation_cost IS NULL OR accommodation_cost >= 0) AND
        (transport_cost IS NULL OR transport_cost >= 0)
    )
);

CREATE INDEX idx_trip_stops_trip ON trip_stops(trip_id, stop_order);
CREATE INDEX idx_trip_stops_city ON trip_stops(city_id);
CREATE INDEX idx_trip_stops_dates ON trip_stops(arrival_date, departure_date);

-- ============================================
-- TRIP ACTIVITIES TABLE (Activities assigned to stops)
-- ============================================
CREATE TABLE trip_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_stop_id UUID NOT NULL REFERENCES trip_stops(id) ON DELETE CASCADE,
    activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE RESTRICT,
    
    -- Scheduling
    scheduled_date DATE NOT NULL,
    scheduled_time TIME,
    activity_order INTEGER NOT NULL,  -- Order within the day
    
    -- Cost override (can differ from default activity cost)
    actual_cost DECIMAL(10,2),
    
    -- Notes & status
    notes TEXT,
    status VARCHAR(20) DEFAULT 'planned',  -- planned, booked, completed, cancelled
    booking_reference VARCHAR(100),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_stop_activity_order UNIQUE(trip_stop_id, scheduled_date, activity_order)
);

CREATE INDEX idx_trip_activities_stop ON trip_activities(trip_stop_id);
CREATE INDEX idx_trip_activities_activity ON trip_activities(activity_id);
CREATE INDEX idx_trip_activities_date ON trip_activities(scheduled_date);
CREATE INDEX idx_trip_activities_status ON trip_activities(status);

-- ============================================
-- TRIP EXPENSES TABLE (Additional expenses)
-- ============================================
CREATE TABLE trip_expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    trip_stop_id UUID REFERENCES trip_stops(id) ON DELETE CASCADE,
    
    category VARCHAR(50) NOT NULL,  -- food, transport, accommodation, shopping, misc
    description VARCHAR(200) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency_code VARCHAR(3) DEFAULT 'USD',
    expense_date DATE NOT NULL,
    
    notes TEXT,
    receipt_url TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT positive_amount CHECK (amount >= 0)
);

CREATE INDEX idx_trip_expenses_trip ON trip_expenses(trip_id);
CREATE INDEX idx_trip_expenses_stop ON trip_expenses(trip_stop_id);
CREATE INDEX idx_trip_expenses_category ON trip_expenses(category);
CREATE INDEX idx_trip_expenses_date ON trip_expenses(expense_date);

-- ============================================
-- TRIP COLLABORATORS TABLE (Shared trips)
-- ============================================
CREATE TABLE trip_collaborators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    permission_level VARCHAR(20) DEFAULT 'view',  -- view, edit, admin
    invited_by UUID REFERENCES users(id) ON DELETE SET NULL,
    invitation_status VARCHAR(20) DEFAULT 'pending',  -- pending, accepted, declined
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT unique_trip_collaborator UNIQUE(trip_id, user_id)
);

CREATE INDEX idx_trip_collaborators_trip ON trip_collaborators(trip_id);
CREATE INDEX idx_trip_collaborators_user ON trip_collaborators(user_id);

-- ============================================
-- SAVED DESTINATIONS TABLE (User wishlist)
-- ============================================
CREATE TABLE saved_destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    
    notes TEXT,
    priority INTEGER DEFAULT 0,  -- For ordering wishlist
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_user_destination UNIQUE(user_id, city_id)
);

CREATE INDEX idx_saved_destinations_user ON saved_destinations(user_id, priority DESC);

-- ============================================
-- TRIP REVIEWS TABLE (Community feedback)
-- ============================================
CREATE TABLE trip_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    rating INTEGER NOT NULL,  -- 1-5
    review_text TEXT,
    helpful_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT valid_rating CHECK (rating >= 1 AND rating <= 5),
    CONSTRAINT unique_user_trip_review UNIQUE(trip_id, user_id)
);

CREATE INDEX idx_trip_reviews_trip ON trip_reviews(trip_id);
CREATE INDEX idx_trip_reviews_user ON trip_reviews(user_id);
CREATE INDEX idx_trip_reviews_rating ON trip_reviews(rating DESC);

-- ============================================
-- USER FOLLOWS TABLE (Social feature)
-- ============================================
CREATE TABLE user_follows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT no_self_follow CHECK (follower_id != following_id),
    CONSTRAINT unique_follow UNIQUE(follower_id, following_id)
);

CREATE INDEX idx_user_follows_follower ON user_follows(follower_id);
CREATE INDEX idx_user_follows_following ON user_follows(following_id);

-- ============================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cities_updated_at BEFORE UPDATE ON cities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON trips
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trip_stops_updated_at BEFORE UPDATE ON trip_stops
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trip_activities_updated_at BEFORE UPDATE ON trip_activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTIONS FOR STATISTICS
-- ============================================

-- Calculate total trip cost
CREATE OR REPLACE FUNCTION calculate_trip_cost(trip_uuid UUID)
RETURNS DECIMAL AS $$
DECLARE
    total DECIMAL(12,2);
BEGIN
    SELECT 
        COALESCE(SUM(ts.accommodation_cost), 0) +
        COALESCE(SUM(ts.transport_cost), 0) +
        COALESCE(SUM(ta.actual_cost), 0) +
        COALESCE(SUM(te.amount), 0)
    INTO total
    FROM trips t
    LEFT JOIN trip_stops ts ON t.id = ts.trip_id
    LEFT JOIN trip_activities ta ON ts.id = ta.trip_stop_id
    LEFT JOIN trip_expenses te ON t.id = te.trip_id
    WHERE t.id = trip_uuid;
    
    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;

-- Update trip statistics trigger
CREATE OR REPLACE FUNCTION update_trip_statistics()
RETURNS TRIGGER AS $$
BEGIN
    -- Update total_stops
    UPDATE trips 
    SET total_stops = (
        SELECT COUNT(*) FROM trip_stops WHERE trip_id = NEW.trip_id
    )
    WHERE id = NEW.trip_id;
    
    -- Update total_activities
    UPDATE trips 
    SET total_activities = (
        SELECT COUNT(*) 
        FROM trip_activities ta
        JOIN trip_stops ts ON ta.trip_stop_id = ts.id
        WHERE ts.trip_id = NEW.trip_id
    )
    WHERE id = NEW.trip_id;
    
    -- Update actual_cost
    UPDATE trips
    SET actual_cost = calculate_trip_cost(NEW.trip_id)
    WHERE id = NEW.trip_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_trip_stats_on_stop_change
AFTER INSERT OR UPDATE OR DELETE ON trip_stops
FOR EACH ROW EXECUTE FUNCTION update_trip_statistics();

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- Popular destinations view
CREATE OR REPLACE VIEW popular_destinations AS
SELECT 
    c.id,
    c.name,
    c.image_url,
    co.name as country_name,
    c.cost_index,
    c.popularity_score,
    COUNT(DISTINCT ts.trip_id) as trip_count,
    AVG(tr.rating) as avg_rating
FROM cities c
JOIN countries co ON c.country_id = co.id
LEFT JOIN trip_stops ts ON c.id = ts.city_id
LEFT JOIN trips t ON ts.trip_id = t.id
LEFT JOIN trip_reviews tr ON t.id = tr.trip_id
WHERE c.is_active = true
GROUP BY c.id, c.name, c.image_url, co.name, c.cost_index, c.popularity_score
ORDER BY c.popularity_score DESC;

-- User trip summary view
CREATE OR REPLACE VIEW user_trip_summary AS
SELECT 
    t.id,
    t.name,
    t.start_date,
    t.end_date,
    t.total_days,
    t.status,
    t.cover_image_url,
    t.user_id,
    COUNT(DISTINCT ts.id) as stop_count,
    COUNT(DISTINCT ta.id) as activity_count,
    STRING_AGG(DISTINCT c.name, ', ' ORDER BY ts.stop_order) as cities,
    t.actual_cost,
    t.total_budget,
    t.is_public,
    t.view_count,
    t.created_at
FROM trips t
LEFT JOIN trip_stops ts ON t.id = ts.trip_id
LEFT JOIN trip_activities ta ON ts.id = ta.trip_stop_id
LEFT JOIN cities c ON ts.city_id = c.id
GROUP BY t.id;

-- ============================================
-- SEED DATA FOR ACTIVITY CATEGORIES
-- ============================================
INSERT INTO activity_categories (name, slug, description, icon_name, color_hex) VALUES
('Sightseeing', 'sightseeing', 'Explore landmarks and attractions', 'camera', '#2D8B83'),
('Food & Dining', 'food-dining', 'Restaurants, cafes, and culinary experiences', 'utensils', '#E85835'),
('Adventure', 'adventure', 'Outdoor activities and thrilling experiences', 'mountain', '#F7C123'),
('Culture', 'culture', 'Museums, galleries, and cultural sites', 'palette', '#16A34A'),
('Shopping', 'shopping', 'Markets, malls, and local shops', 'shopping-bag', '#F59E0B'),
('Nightlife', 'nightlife', 'Bars, clubs, and evening entertainment', 'moon', '#A855F7'),
('Relaxation', 'relaxation', 'Spas, beaches, and wellness activities', 'heart', '#EC4899'),
('Transportation', 'transportation', 'Local transport and getting around', 'bus', '#6B7280')
ON CONFLICT (slug) DO NOTHING;
```

---

## 🔄 VERTICAL SLICE WORK DISTRIBUTION

### Developer A: Authentication + Profile + Community
**Complete ownership of user-facing features**

### Developer B: Trip Management + Itinerary + Budget
**Complete ownership of core trip planning features**

---

## ⏰ HOUR-BY-HOUR VERTICAL SLICES

### **HOUR 0-1: Environment Setup (Both)**

#### Both Developers:
```bash
# Backend setup
mkdir globetrotter-api && cd globetrotter-api
npm init -y
npm install express cors dotenv pg prisma @prisma/client bcrypt jsonwebtoken
npm install -D nodemon

# Frontend setup (in parallel)
npm create vite@latest globetrotter-ui -- --template react
cd globetrotter-ui
npm install
npm install react-router-dom axios lucide-react date-fns chart.js react-chartjs-2
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Database Setup:
- Create PostgreSQL database
- Run the complete schema SQL above
- Test database connection

#### Design System Setup:
- Create `styles/theme.css` with the color theme
- Add Google Fonts: Playfair Display, Montserrat, Inter
- Set up Tailwind config with custom colors

**Sync Point:** ✅ Both environments running, design system loaded

---

### **HOUR 1-2.5: VERTICAL SLICE 1**

#### 🔵 Developer A: Complete Authentication Flow
**Backend:**
- Create `POST /api/auth/register` endpoint
- Create `POST /api/auth/login` endpoint
- Create `GET /api/auth/me` endpoint
- JWT middleware for protected routes

**Frontend:**
- Login Screen (Screen 1) - Complete UI with theme
- Registration Screen (Screen 2) - Complete form with validation
- Auth context/service
- Protected route wrapper

**Testing:** Register → Login → Auto-redirect to dashboard

---

#### 🟢 Developer B: Trip Creation Flow
**Backend:**
- Create `POST /api/trips` endpoint
- Create `GET /api/trips/:userId` endpoint
- Create `GET /api/trips/:id` endpoint
- Seed cities table with 20+ popular cities

**Frontend:**
- Create Trip Screen (Screen 4) - Complete form
- Trip card component (reusable)
- Trip service (API calls)
- Form validation and date pickers

**Testing:** Create trip → View in list → Edit trip details

**Sync Point:** ✅ Both slices working, demo to each other

---

### **HOUR 2.5-4: VERTICAL SLICE 2**

#### 🔵 Developer A: User Profile + Dashboard Landing
**Backend:**
- Create `GET /api/users/:id/profile` endpoint
- Create `PUT /api/users/:id` endpoint
- Create `GET /api/destinations/popular` endpoint (for landing page)

**Frontend:**
- Main Landing Page (Screen 3) - Complete with:
  - Header/navigation
  - Hero banner with search
  - Popular destinations section
  - User's recent trips section
- User Profile Page (Screen 7) - Complete with:
  - Profile info display
  - Edit profile form
  - Saved destinations list

**Testing:** Login → Land on dashboard → View profile → Edit profile

---

#### 🟢 Developer B: Stop Management + City Search
**Backend:**
- Create `POST /api/trips/:id/stops` endpoint
- Create `PUT /api/stops/:id` endpoint
- Create `DELETE /api/stops/:id` endpoint
- Create `GET /api/cities/search?q=query` endpoint
- Seed activities table with 100+ activities

**Frontend:**
- User Trip Listing (Screen 6) - Grid of trip cards
- City Search Page (Screen 8 - Part 1) - Search cities
- Stop management in itinerary builder (partial Screen 5)

**Testing:** Open trip → Add stops → Search cities → Add to trip

**Sync Point:** ✅ Can create trip with multiple stops

---

### **HOUR 4-5.5: VERTICAL SLICE 3**

#### 🔵 Developer A: Community Features
**Backend:**
- Create `POST /api/trips/:id/share` endpoint (make public)
- Create `GET /api/trips/community` endpoint
- Create `GET /api/trips/public/:shareToken` endpoint
- Create `POST /api/trips/:id/copy` endpoint

**Frontend:**
- Community Tab Screen (Screen 10) - Complete with:
  - Public trip feed
  - Trip preview cards
  - Copy trip functionality
- Public Trip View - Read-only itinerary
- Social sharing buttons

**Testing:** Make trip public → View in community → Copy someone's trip

---

#### 🟢 Developer B: Activity Management + Itinerary View
**Backend:**
- Create `GET /api/activities/search` endpoint with filters
- Create `POST /api/stops/:id/activities` endpoint
- Create `DELETE /api/activities/:id` endpoint
- Create `GET /api/trips/:id/itinerary` endpoint (full details)
- Create `PUT /api/activities/:id/reorder` endpoint

**Frontend:**
- Activity Search (Screen 8 - Part 2) - Search & filter activities
- Build Itinerary Screen (Screen 5) - Complete with:
  - Add stops
  - Add activities to stops
  - Reorder activities (simple up/down buttons)
  - Date assignments
- Itinerary View Screen (Screen 9 - Part 1) - Day-wise view

**Testing:** Add activities to stops → View complete itinerary → Reorder

**Sync Point:** ✅ Can build complete itinerary with activities

---

### **HOUR 5.5-7: VERTICAL SLICE 4 (Final Features)**

#### 🔵 Developer A: Polish + User Experience
**Frontend:**
- Add loading states everywhere
- Add error messages and validation
- Add success notifications (toast messages)
- Improve navigation and breadcrumbs
- Add empty states (no trips, no activities, etc.)
- Mobile responsive fixes
- Animation polish (fade-ins, slide-ins)

**Backend:**
- Add input validation
- Add error handling middleware
- Add rate limiting (basic)
- Optimize queries

**Testing:** Test all flows on mobile, fix bugs

---

#### 🟢 Developer B: Budget Features + Visualization
**Backend:**
- Create `GET /api/trips/:id/budget` endpoint
- Implement cost calculation logic
- Create expense breakdown by category

**Frontend:**
- Itinerary View with Budget (Screen 9 - Complete):
  - Day-wise timeline
  - Activity blocks with costs
  - Budget breakdown section
  - Pie/bar charts using Chart.js
  - Cost by category
  - Budget vs actual comparison
  - Overbudget warnings
- Budget calculator component (reusable)

**Testing:** View budget → See cost breakdown → Test calculations

**Sync Point:** ✅ All features working, ready for polish

---

### **HOUR 7-8: Integration, Testing & Demo Prep (Both)**

#### Both Developers Together:
1. **End-to-end testing:**
   - Complete user journey from registration to sharing
   - Test all CRUD operations
   - Test edge cases (empty states, invalid data)
   
2. **Bug fixes:**
   - Fix any critical issues
   - Ensure data consistency
   
3. **Demo data:**
   - Create 3-4 complete sample trips
   - Add 20+ cities with images
   - Add 100+ activities with realistic data
   - Create demo user account
   
4. **UI polish:**
   - Ensure consistent styling
   - Fix spacing/alignment issues
   - Add loading indicators
   - Test responsive design
   
5. **Demo preparation:**
   - Write demo script
   - Test demo flow multiple times
   - Prepare screenshots
   - Deploy if possible (Vercel + Railway/Render)

---

## 📊 FINAL FEATURE CHECKLIST

### Must Have ✅
- [x] User registration & login
- [x] Create trip with details
- [x] Add multiple stops/cities
- [x] Search cities
- [x] Search activities
- [x] Add activities to stops
- [x] View complete itinerary
- [x] Basic budget calculation
- [x] Budget visualization
- [x] Share trip publicly
- [x] Community feed
- [x] Copy trips
- [x] User profile

### Nice to Have ⚠️
- [ ] Drag-and-drop reordering
- [ ] Activity time scheduling
- [ ] Expense tracking
- [ ] Trip collaborators
- [ ] Reviews & ratings
- [ ] Follow users
- [ ] Email notifications

---

## 🚀 QUICK START SCRIPTS

### Backend (`package.json` scripts):
```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "seed": "node scripts/seed.js",
    "migrate": "npx prisma migrate dev"
  }
}
```

### Frontend (`package.json` scripts):
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Environment Variables:
```env
# Backend (.env)
DATABASE_URL="postgresql://user:password@localhost:5432/globetrotter"
JWT_SECRET="your-secret-key-change-in-production"
PORT=5000
NODE_ENV=development

# Frontend (.env)
VITE_API_URL=http://localhost:5000/api
```

---

## 🎯 SUCCESS METRICS

By hour 8, you should have:
- ✅ 10/10 screens implemented
- ✅ Complete user flow working
- ✅ Professional, premium UI
- ✅ Responsive design
- ✅ Demo account with rich data
- ✅ Zero critical bugs
- ✅ Deployable application

---

## 💡 CRITICAL SUCCESS FACTORS

1. **Stick to vertical slices** - Don't split backend/frontend
2. **Test immediately** - After each slice, test end-to-end
3. **Use the design system** - Copy CSS variables, don't improvise
4. **Communicate hourly** - 2-minute sync every hour
5. **Don't over-engineer** - MVP features only, polish later
6. **Seed data early** - Don't wait to add sample data
7. **Mobile-first** - Test responsive at each step

---

## 🎨 UI COMPONENT PRIORITY

**Build these reusable components first:**
1. Button (primary, secondary, outline)
2. Input/Textarea with label
3. Card component
4. Modal/Dialog
5. Loading spinner
6. Toast notifications

This saves time - build once, use everywhere!

---

## 📝 Git Workflow (Important!)

```bash
# Developer A works on: feature/auth, feature/profile, feature/community
# Developer B works on: feature/trips, feature/itinerary, feature/budget

# Commit frequently (every 30 minutes)
git add .
git commit -m "feat: descriptive message"
git push origin feature/your-feature

# Merge to main only after testing together
```

---

Good luck! Focus on completing one vertical slice at a time, test immediately, and you'll have a fully functional premium travel app in 8 hours! 🚀✈️
