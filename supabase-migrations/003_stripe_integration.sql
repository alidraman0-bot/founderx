-- Supabase Migration: Add Stripe payment fields to users table
-- Run this migration to add Stripe integration fields

-- Add new columns to users table for Stripe integration
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'premium')),
ADD COLUMN IF NOT EXISTS subscription_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid')),
ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS trial_end_date TIMESTAMP WITH TIME ZONE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_plan ON users(plan);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_users_subscription_id ON users(subscription_id);

-- Create a function to update user subscription
CREATE OR REPLACE FUNCTION update_user_subscription(
  user_id UUID,
  new_plan VARCHAR(20),
  new_subscription_id VARCHAR(255),
  new_status VARCHAR(20),
  stripe_customer_id VARCHAR(255) DEFAULT NULL,
  subscription_start_date TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  subscription_end_date TIMESTAMP WITH TIME ZONE DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  UPDATE users 
  SET 
    plan = new_plan,
    subscription_id = new_subscription_id,
    status = new_status,
    stripe_customer_id = COALESCE(stripe_customer_id, users.stripe_customer_id),
    subscription_start_date = COALESCE(subscription_start_date, users.subscription_start_date),
    subscription_end_date = COALESCE(subscription_end_date, users.subscription_end_date),
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get subscription statistics
CREATE OR REPLACE FUNCTION get_subscription_stats()
RETURNS TABLE(
  total_users BIGINT,
  free_users BIGINT,
  pro_users BIGINT,
  premium_users BIGINT,
  active_subscriptions BIGINT,
  canceled_subscriptions BIGINT,
  mrr NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_users,
    COUNT(*) FILTER (WHERE plan = 'free') as free_users,
    COUNT(*) FILTER (WHERE plan = 'pro') as pro_users,
    COUNT(*) FILTER (WHERE plan = 'premium') as premium_users,
    COUNT(*) FILTER (WHERE status = 'active' AND plan != 'free') as active_subscriptions,
    COUNT(*) FILTER (WHERE status = 'canceled') as canceled_subscriptions,
    COALESCE(
      (COUNT(*) FILTER (WHERE plan = 'pro' AND status = 'active') * 15.00) +
      (COUNT(*) FILTER (WHERE plan = 'premium' AND status = 'active') * 35.00),
      0
    ) as mrr
  FROM users;
END;
$$ LANGUAGE plpgsql;

-- Create a view for subscription analytics
CREATE OR REPLACE VIEW subscription_analytics AS
SELECT 
  plan,
  status,
  COUNT(*) as user_count,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as new_users_30d,
  COUNT(*) FILTER (WHERE updated_at >= NOW() - INTERVAL '30 days') as updated_users_30d
FROM users
GROUP BY plan, status
ORDER BY plan, status;

-- Create a function to handle subscription cancellation
CREATE OR REPLACE FUNCTION cancel_user_subscription(user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE users 
  SET 
    plan = 'free',
    subscription_id = NULL,
    status = 'canceled',
    subscription_end_date = NULL,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Create a function to check if user has active subscription
CREATE OR REPLACE FUNCTION user_has_active_subscription(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_status VARCHAR(20);
BEGIN
  SELECT status INTO user_status
  FROM users
  WHERE id = user_id;
  
  RETURN user_status = 'active';
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON users TO authenticated;
GRANT EXECUTE ON FUNCTION update_user_subscription TO authenticated;
GRANT EXECUTE ON FUNCTION get_subscription_stats TO authenticated;
GRANT EXECUTE ON FUNCTION cancel_user_subscription TO authenticated;
GRANT EXECUTE ON FUNCTION user_has_active_subscription TO authenticated;
GRANT SELECT ON subscription_analytics TO authenticated;

-- Insert sample data for testing (optional)
-- Uncomment the following lines to add test data
/*
INSERT INTO users (id, email, name, plan, status, stripe_customer_id, subscription_id, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'test1@example.com', 'Test User 1', 'free', 'active', NULL, NULL, NOW() - INTERVAL '30 days', NOW()),
  ('00000000-0000-0000-0000-000000000002', 'test2@example.com', 'Test User 2', 'pro', 'active', 'cus_test123', 'sub_test123', NOW() - INTERVAL '25 days', NOW()),
  ('00000000-0000-0000-0000-000000000003', 'test3@example.com', 'Test User 3', 'premium', 'active', 'cus_test456', 'sub_test456', NOW() - INTERVAL '20 days', NOW()),
  ('00000000-0000-0000-0000-000000000004', 'test4@example.com', 'Test User 4', 'pro', 'canceled', 'cus_test789', 'sub_test789', NOW() - INTERVAL '35 days', NOW() - INTERVAL '5 days');
*/
