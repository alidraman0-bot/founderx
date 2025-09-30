-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ideas table
CREATE TABLE ideas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  industry TEXT,
  ideas JSONB NOT NULL
);

-- Business plans table
CREATE TABLE business_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  idea_id TEXT NOT NULL,
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  market_size TEXT NOT NULL,
  revenue_model TEXT NOT NULL,
  gtm_strategy TEXT NOT NULL
);

-- MVPs table
CREATE TABLE mvps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  plan_id TEXT NOT NULL,
  idea_slug TEXT NOT NULL,
  landing_copy JSONB NOT NULL,
  dashboard_features JSONB NOT NULL,
  stripe_link TEXT NOT NULL
);

-- Branding table
CREATE TABLE branding (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  idea_id TEXT NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  color_palette JSONB NOT NULL,
  font_style TEXT NOT NULL,
  logo_svg TEXT NOT NULL
);

-- Launches table
CREATE TABLE launches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  mvp_id TEXT NOT NULL,
  vercel_url TEXT NOT NULL,
  analytics JSONB NOT NULL
);

-- Enable Row Level Security
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE mvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE launches ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now, customize based on your auth needs)
CREATE POLICY "Allow all operations on ideas" ON ideas FOR ALL USING (true);
CREATE POLICY "Allow all operations on business_plans" ON business_plans FOR ALL USING (true);
CREATE POLICY "Allow all operations on mvps" ON mvps FOR ALL USING (true);
CREATE POLICY "Allow all operations on branding" ON branding FOR ALL USING (true);
CREATE POLICY "Allow all operations on launches" ON launches FOR ALL USING (true);
