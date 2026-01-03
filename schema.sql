--
-- PostgreSQL database dump
--

-- Dumped from database version 17.7 (bdc8956)
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: calculate_trip_cost(uuid); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.calculate_trip_cost(trip_uuid uuid) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.calculate_trip_cost(trip_uuid uuid) OWNER TO neondb_owner;

--
-- Name: update_trip_statistics(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.update_trip_statistics() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.update_trip_statistics() OWNER TO neondb_owner;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: neondb_owner
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: activities; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.activities (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(200) NOT NULL,
    city_id uuid NOT NULL,
    category_id uuid,
    description text,
    long_description text,
    image_url text,
    cost numeric(10,2) DEFAULT 0 NOT NULL,
    currency_code character varying(3) DEFAULT 'INR'::character varying,
    is_free boolean DEFAULT false,
    duration_minutes integer,
    address text,
    latitude numeric(10,8),
    longitude numeric(11,8),
    rating numeric(3,2) DEFAULT 0.0,
    review_count integer DEFAULT 0,
    difficulty_level character varying(20),
    suitable_for character varying(100),
    tags text[],
    requires_booking boolean DEFAULT false,
    booking_url text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT positive_cost CHECK ((cost >= (0)::numeric)),
    CONSTRAINT valid_rating CHECK (((rating >= (0)::numeric) AND (rating <= (5)::numeric)))
);


ALTER TABLE public.activities OWNER TO neondb_owner;

--
-- Name: activity_categories; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.activity_categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    description text,
    icon_name character varying(50),
    color_hex character varying(7),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.activity_categories OWNER TO neondb_owner;

--
-- Name: cities; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.cities (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    country_id uuid NOT NULL,
    latitude numeric(10,8),
    longitude numeric(11,8),
    timezone character varying(50),
    population integer,
    description text,
    image_url text,
    cover_image_url text,
    cost_index numeric(5,2) DEFAULT 1.0,
    accommodation_avg_cost numeric(10,2),
    food_avg_cost numeric(10,2),
    transport_avg_cost numeric(10,2),
    popularity_score integer DEFAULT 0,
    total_visits integer DEFAULT 0,
    best_time_to_visit character varying(100),
    climate_type character varying(50),
    language_spoken character varying(100),
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cities OWNER TO neondb_owner;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.countries (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    code character varying(3) NOT NULL,
    region character varying(100),
    subregion character varying(100),
    currency_code character varying(3),
    currency_symbol character varying(10),
    average_cost_index numeric(5,2) DEFAULT 1.0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.countries OWNER TO neondb_owner;

--
-- Name: trip_reviews; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.trip_reviews (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    trip_id uuid NOT NULL,
    user_id uuid NOT NULL,
    rating integer NOT NULL,
    review_text text,
    helpful_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_rating CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.trip_reviews OWNER TO neondb_owner;

--
-- Name: trip_stops; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.trip_stops (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    trip_id uuid NOT NULL,
    city_id uuid NOT NULL,
    arrival_date date NOT NULL,
    departure_date date NOT NULL,
    stop_order integer NOT NULL,
    accommodation_name character varying(200),
    accommodation_address text,
    accommodation_cost numeric(10,2),
    accommodation_booking_url text,
    transport_type character varying(50),
    transport_cost numeric(10,2),
    transport_details text,
    notes text,
    num_nights integer GENERATED ALWAYS AS ((departure_date - arrival_date)) STORED,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT positive_costs CHECK ((((accommodation_cost IS NULL) OR (accommodation_cost >= (0)::numeric)) AND ((transport_cost IS NULL) OR (transport_cost >= (0)::numeric)))),
    CONSTRAINT valid_stop_dates CHECK ((departure_date >= arrival_date))
);


ALTER TABLE public.trip_stops OWNER TO neondb_owner;

--
-- Name: trips; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.trips (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    name character varying(200) NOT NULL,
    description text,
    cover_image_url text,
    start_date date NOT NULL,
    end_date date NOT NULL,
    total_budget numeric(12,2),
    currency_code character varying(3) DEFAULT 'INR'::character varying,
    actual_cost numeric(12,2) DEFAULT 0,
    total_days integer GENERATED ALWAYS AS (((end_date - start_date) + 1)) STORED,
    total_stops integer DEFAULT 0,
    total_activities integer DEFAULT 0,
    is_public boolean DEFAULT false,
    share_token character varying(100),
    view_count integer DEFAULT 0,
    copy_count integer DEFAULT 0,
    status character varying(20) DEFAULT 'planning'::character varying,
    is_collaborative boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT positive_budget CHECK (((total_budget IS NULL) OR (total_budget >= (0)::numeric))),
    CONSTRAINT valid_dates CHECK ((end_date >= start_date))
);


ALTER TABLE public.trips OWNER TO neondb_owner;

--
-- Name: popular_destinations; Type: VIEW; Schema: public; Owner: neondb_owner
--

CREATE VIEW public.popular_destinations AS
 SELECT c.id,
    c.name,
    c.image_url,
    co.name AS country_name,
    c.cost_index,
    c.popularity_score,
    count(DISTINCT ts.trip_id) AS trip_count,
    avg(tr.rating) AS avg_rating
   FROM ((((public.cities c
     JOIN public.countries co ON ((c.country_id = co.id)))
     LEFT JOIN public.trip_stops ts ON ((c.id = ts.city_id)))
     LEFT JOIN public.trips t ON ((ts.trip_id = t.id)))
     LEFT JOIN public.trip_reviews tr ON ((t.id = tr.trip_id)))
  WHERE (c.is_active = true)
  GROUP BY c.id, c.name, c.image_url, co.name, c.cost_index, c.popularity_score
  ORDER BY c.popularity_score DESC;


ALTER VIEW public.popular_destinations OWNER TO neondb_owner;

--
-- Name: saved_destinations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.saved_destinations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    city_id uuid NOT NULL,
    notes text,
    priority integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.saved_destinations OWNER TO neondb_owner;

--
-- Name: trip_activities; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.trip_activities (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    trip_stop_id uuid NOT NULL,
    activity_id uuid NOT NULL,
    scheduled_date date NOT NULL,
    scheduled_time time without time zone,
    activity_order integer NOT NULL,
    actual_cost numeric(10,2),
    notes text,
    status character varying(20) DEFAULT 'planned'::character varying,
    booking_reference character varying(100),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.trip_activities OWNER TO neondb_owner;

--
-- Name: trip_collaborators; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.trip_collaborators (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    trip_id uuid NOT NULL,
    user_id uuid NOT NULL,
    permission_level character varying(20) DEFAULT 'view'::character varying,
    invited_by uuid,
    invitation_status character varying(20) DEFAULT 'pending'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    accepted_at timestamp with time zone
);


ALTER TABLE public.trip_collaborators OWNER TO neondb_owner;

--
-- Name: trip_expenses; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.trip_expenses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    trip_id uuid NOT NULL,
    trip_stop_id uuid,
    category character varying(50) NOT NULL,
    description character varying(200) NOT NULL,
    amount numeric(10,2) NOT NULL,
    currency_code character varying(3) DEFAULT 'INR'::character varying,
    expense_date date NOT NULL,
    notes text,
    receipt_url text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT positive_amount CHECK ((amount >= (0)::numeric))
);


ALTER TABLE public.trip_expenses OWNER TO neondb_owner;

--
-- Name: user_follows; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_follows (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    follower_id uuid NOT NULL,
    following_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT no_self_follow CHECK ((follower_id <> following_id))
);


ALTER TABLE public.user_follows OWNER TO neondb_owner;

--
-- Name: user_trip_summary; Type: VIEW; Schema: public; Owner: neondb_owner
--

CREATE VIEW public.user_trip_summary AS
 SELECT t.id,
    t.name,
    t.start_date,
    t.end_date,
    t.total_days,
    t.status,
    t.cover_image_url,
    t.user_id,
    count(DISTINCT ts.id) AS stop_count,
    count(DISTINCT ta.id) AS activity_count,
    string_agg((c.name)::text, ', '::text ORDER BY ts.stop_order) FILTER (WHERE (c.name IS NOT NULL)) AS cities,
    t.actual_cost,
    t.total_budget,
    t.is_public,
    t.view_count,
    t.created_at
   FROM (((public.trips t
     LEFT JOIN public.trip_stops ts ON ((t.id = ts.trip_id)))
     LEFT JOIN public.trip_activities ta ON ((ts.id = ta.trip_stop_id)))
     LEFT JOIN public.cities c ON ((ts.city_id = c.id)))
  GROUP BY t.id, t.name, t.start_date, t.end_date, t.total_days, t.status, t.cover_image_url, t.user_id, t.actual_cost, t.total_budget, t.is_public, t.view_count, t.created_at;


ALTER VIEW public.user_trip_summary OWNER TO neondb_owner;

--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    phone character varying(20),
    city character varying(100),
    country character varying(100),
    photo_url text,
    bio text,
    preferences jsonb DEFAULT '{}'::jsonb,
    is_active boolean DEFAULT true,
    is_email_verified boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_login_at timestamp with time zone,
    CONSTRAINT email_format CHECK (((email)::text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'::text))
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- Name: activity_categories activity_categories_name_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.activity_categories
    ADD CONSTRAINT activity_categories_name_key UNIQUE (name);


--
-- Name: activity_categories activity_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.activity_categories
    ADD CONSTRAINT activity_categories_pkey PRIMARY KEY (id);


--
-- Name: activity_categories activity_categories_slug_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.activity_categories
    ADD CONSTRAINT activity_categories_slug_key UNIQUE (slug);


--
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- Name: countries countries_code_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_code_key UNIQUE (code);


--
-- Name: countries countries_name_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_name_key UNIQUE (name);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: saved_destinations saved_destinations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.saved_destinations
    ADD CONSTRAINT saved_destinations_pkey PRIMARY KEY (id);


--
-- Name: trip_activities trip_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_activities
    ADD CONSTRAINT trip_activities_pkey PRIMARY KEY (id);


--
-- Name: trip_collaborators trip_collaborators_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_collaborators
    ADD CONSTRAINT trip_collaborators_pkey PRIMARY KEY (id);


--
-- Name: trip_expenses trip_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_expenses
    ADD CONSTRAINT trip_expenses_pkey PRIMARY KEY (id);


--
-- Name: trip_reviews trip_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_reviews
    ADD CONSTRAINT trip_reviews_pkey PRIMARY KEY (id);


--
-- Name: trip_stops trip_stops_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_stops
    ADD CONSTRAINT trip_stops_pkey PRIMARY KEY (id);


--
-- Name: trips trips_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (id);


--
-- Name: trips trips_share_token_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_share_token_key UNIQUE (share_token);


--
-- Name: cities unique_city_country; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT unique_city_country UNIQUE (name, country_id);


--
-- Name: user_follows unique_follow; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_follows
    ADD CONSTRAINT unique_follow UNIQUE (follower_id, following_id);


--
-- Name: trip_activities unique_stop_activity_order; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_activities
    ADD CONSTRAINT unique_stop_activity_order UNIQUE (trip_stop_id, scheduled_date, activity_order);


--
-- Name: trip_collaborators unique_trip_collaborator; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_collaborators
    ADD CONSTRAINT unique_trip_collaborator UNIQUE (trip_id, user_id);


--
-- Name: trip_stops unique_trip_stop_order; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_stops
    ADD CONSTRAINT unique_trip_stop_order UNIQUE (trip_id, stop_order);


--
-- Name: saved_destinations unique_user_destination; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.saved_destinations
    ADD CONSTRAINT unique_user_destination UNIQUE (user_id, city_id);


--
-- Name: trip_reviews unique_user_trip_review; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_reviews
    ADD CONSTRAINT unique_user_trip_review UNIQUE (trip_id, user_id);


--
-- Name: user_follows user_follows_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_follows
    ADD CONSTRAINT user_follows_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_activities_category; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_activities_category ON public.activities USING btree (category_id);


--
-- Name: idx_activities_city; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_activities_city ON public.activities USING btree (city_id);


--
-- Name: idx_activities_cost; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_activities_cost ON public.activities USING btree (cost);


--
-- Name: idx_activities_is_free; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_activities_is_free ON public.activities USING btree (is_free);


--
-- Name: idx_activities_rating; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_activities_rating ON public.activities USING btree (rating DESC);


--
-- Name: idx_activities_tags; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_activities_tags ON public.activities USING gin (tags);


--
-- Name: idx_activity_categories_slug; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_activity_categories_slug ON public.activity_categories USING btree (slug);


--
-- Name: idx_cities_cost_index; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_cities_cost_index ON public.cities USING btree (cost_index);


--
-- Name: idx_cities_country; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_cities_country ON public.cities USING btree (country_id);


--
-- Name: idx_cities_location; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_cities_location ON public.cities USING btree (latitude, longitude);


--
-- Name: idx_cities_name; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_cities_name ON public.cities USING btree (name);


--
-- Name: idx_cities_popularity; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_cities_popularity ON public.cities USING btree (popularity_score DESC);


--
-- Name: idx_countries_name; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_countries_name ON public.countries USING btree (name);


--
-- Name: idx_countries_region; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_countries_region ON public.countries USING btree (region);


--
-- Name: idx_saved_destinations_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_saved_destinations_user ON public.saved_destinations USING btree (user_id, priority DESC);


--
-- Name: idx_trip_activities_activity; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_activities_activity ON public.trip_activities USING btree (activity_id);


--
-- Name: idx_trip_activities_date; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_activities_date ON public.trip_activities USING btree (scheduled_date);


--
-- Name: idx_trip_activities_status; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_activities_status ON public.trip_activities USING btree (status);


--
-- Name: idx_trip_activities_stop; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_activities_stop ON public.trip_activities USING btree (trip_stop_id);


--
-- Name: idx_trip_collaborators_trip; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_collaborators_trip ON public.trip_collaborators USING btree (trip_id);


--
-- Name: idx_trip_collaborators_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_collaborators_user ON public.trip_collaborators USING btree (user_id);


--
-- Name: idx_trip_expenses_category; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_expenses_category ON public.trip_expenses USING btree (category);


--
-- Name: idx_trip_expenses_date; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_expenses_date ON public.trip_expenses USING btree (expense_date);


--
-- Name: idx_trip_expenses_stop; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_expenses_stop ON public.trip_expenses USING btree (trip_stop_id);


--
-- Name: idx_trip_expenses_trip; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_expenses_trip ON public.trip_expenses USING btree (trip_id);


--
-- Name: idx_trip_reviews_rating; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_reviews_rating ON public.trip_reviews USING btree (rating DESC);


--
-- Name: idx_trip_reviews_trip; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_reviews_trip ON public.trip_reviews USING btree (trip_id);


--
-- Name: idx_trip_reviews_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_reviews_user ON public.trip_reviews USING btree (user_id);


--
-- Name: idx_trip_stops_city; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_stops_city ON public.trip_stops USING btree (city_id);


--
-- Name: idx_trip_stops_dates; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_stops_dates ON public.trip_stops USING btree (arrival_date, departure_date);


--
-- Name: idx_trip_stops_trip; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trip_stops_trip ON public.trip_stops USING btree (trip_id, stop_order);


--
-- Name: idx_trips_created_at; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trips_created_at ON public.trips USING btree (created_at DESC);


--
-- Name: idx_trips_dates; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trips_dates ON public.trips USING btree (start_date, end_date);


--
-- Name: idx_trips_is_public; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trips_is_public ON public.trips USING btree (is_public);


--
-- Name: idx_trips_share_token; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trips_share_token ON public.trips USING btree (share_token);


--
-- Name: idx_trips_status; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trips_status ON public.trips USING btree (status);


--
-- Name: idx_trips_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_trips_user ON public.trips USING btree (user_id);


--
-- Name: idx_user_follows_follower; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_user_follows_follower ON public.user_follows USING btree (follower_id);


--
-- Name: idx_user_follows_following; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_user_follows_following ON public.user_follows USING btree (following_id);


--
-- Name: idx_users_created_at; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_users_created_at ON public.users USING btree (created_at DESC);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: idx_users_is_active; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_users_is_active ON public.users USING btree (is_active);


--
-- Name: activities update_activities_updated_at; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: cities update_cities_updated_at; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER update_cities_updated_at BEFORE UPDATE ON public.cities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: trip_activities update_trip_activities_updated_at; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER update_trip_activities_updated_at BEFORE UPDATE ON public.trip_activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: trip_stops update_trip_stats_on_stop_change; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER update_trip_stats_on_stop_change AFTER INSERT OR DELETE OR UPDATE ON public.trip_stops FOR EACH ROW EXECUTE FUNCTION public.update_trip_statistics();


--
-- Name: trip_stops update_trip_stops_updated_at; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER update_trip_stops_updated_at BEFORE UPDATE ON public.trip_stops FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: trips update_trips_updated_at; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON public.trips FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: users update_users_updated_at; Type: TRIGGER; Schema: public; Owner: neondb_owner
--

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: activities activities_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.activity_categories(id) ON DELETE SET NULL;


--
-- Name: activities activities_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(id) ON DELETE CASCADE;


--
-- Name: cities cities_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id) ON DELETE CASCADE;


--
-- Name: saved_destinations saved_destinations_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.saved_destinations
    ADD CONSTRAINT saved_destinations_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(id) ON DELETE CASCADE;


--
-- Name: saved_destinations saved_destinations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.saved_destinations
    ADD CONSTRAINT saved_destinations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: trip_activities trip_activities_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_activities
    ADD CONSTRAINT trip_activities_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON DELETE RESTRICT;


--
-- Name: trip_activities trip_activities_trip_stop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_activities
    ADD CONSTRAINT trip_activities_trip_stop_id_fkey FOREIGN KEY (trip_stop_id) REFERENCES public.trip_stops(id) ON DELETE CASCADE;


--
-- Name: trip_collaborators trip_collaborators_invited_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_collaborators
    ADD CONSTRAINT trip_collaborators_invited_by_fkey FOREIGN KEY (invited_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: trip_collaborators trip_collaborators_trip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_collaborators
    ADD CONSTRAINT trip_collaborators_trip_id_fkey FOREIGN KEY (trip_id) REFERENCES public.trips(id) ON DELETE CASCADE;


--
-- Name: trip_collaborators trip_collaborators_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_collaborators
    ADD CONSTRAINT trip_collaborators_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: trip_expenses trip_expenses_trip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_expenses
    ADD CONSTRAINT trip_expenses_trip_id_fkey FOREIGN KEY (trip_id) REFERENCES public.trips(id) ON DELETE CASCADE;


--
-- Name: trip_expenses trip_expenses_trip_stop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_expenses
    ADD CONSTRAINT trip_expenses_trip_stop_id_fkey FOREIGN KEY (trip_stop_id) REFERENCES public.trip_stops(id) ON DELETE CASCADE;


--
-- Name: trip_reviews trip_reviews_trip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_reviews
    ADD CONSTRAINT trip_reviews_trip_id_fkey FOREIGN KEY (trip_id) REFERENCES public.trips(id) ON DELETE CASCADE;


--
-- Name: trip_reviews trip_reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_reviews
    ADD CONSTRAINT trip_reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: trip_stops trip_stops_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_stops
    ADD CONSTRAINT trip_stops_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(id) ON DELETE RESTRICT;


--
-- Name: trip_stops trip_stops_trip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trip_stops
    ADD CONSTRAINT trip_stops_trip_id_fkey FOREIGN KEY (trip_id) REFERENCES public.trips(id) ON DELETE CASCADE;


--
-- Name: trips trips_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_follows user_follows_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_follows
    ADD CONSTRAINT user_follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_follows user_follows_following_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_follows
    ADD CONSTRAINT user_follows_following_id_fkey FOREIGN KEY (following_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

