-- Mock data for testing the payment system
-- This file contains sample data to test the payment integration

-- Sample users with different subscription plans
INSERT INTO users (id, email, name, plan, status, stripe_customer_id, subscription_id, created_at, updated_at)
VALUES 
  -- Free users
  ('11111111-1111-1111-1111-111111111111', 'free1@example.com', 'Free User 1', 'free', 'active', NULL, NULL, NOW() - INTERVAL '30 days', NOW()),
  ('11111111-1111-1111-1111-111111111112', 'free2@example.com', 'Free User 2', 'free', 'active', NULL, NULL, NOW() - INTERVAL '15 days', NOW()),
  ('11111111-1111-1111-1111-111111111113', 'free3@example.com', 'Free User 3', 'free', 'active', NULL, NULL, NOW() - INTERVAL '7 days', NOW()),
  
  -- Pro users
  ('22222222-2222-2222-2222-222222222221', 'pro1@example.com', 'Pro User 1', 'pro', 'active', 'cus_pro_user_1', 'sub_pro_user_1', NOW() - INTERVAL '25 days', NOW()),
  ('22222222-2222-2222-2222-222222222222', 'pro2@example.com', 'Pro User 2', 'pro', 'active', 'cus_pro_user_2', 'sub_pro_user_2', NOW() - INTERVAL '20 days', NOW()),
  ('22222222-2222-2222-2222-222222222223', 'pro3@example.com', 'Pro User 3', 'pro', 'active', 'cus_pro_user_3', 'sub_pro_user_3', NOW() - INTERVAL '10 days', NOW()),
  ('22222222-2222-2222-2222-222222222224', 'pro4@example.com', 'Pro User 4', 'pro', 'canceled', 'cus_pro_user_4', 'sub_pro_user_4', NOW() - INTERVAL '35 days', NOW() - INTERVAL '5 days'),
  
  -- Premium users
  ('33333333-3333-3333-3333-333333333331', 'premium1@example.com', 'Premium User 1', 'premium', 'active', 'cus_premium_user_1', 'sub_premium_user_1', NOW() - INTERVAL '22 days', NOW()),
  ('33333333-3333-3333-3333-333333333332', 'premium2@example.com', 'Premium User 2', 'premium', 'active', 'cus_premium_user_2', 'sub_premium_user_2', NOW() - INTERVAL '18 days', NOW()),
  ('33333333-3333-3333-3333-333333333333', 'premium3@example.com', 'Premium User 3', 'premium', 'past_due', 'cus_premium_user_3', 'sub_premium_user_3', NOW() - INTERVAL '12 days', NOW() - INTERVAL '2 days');

-- Sample subscription data
INSERT INTO subscriptions (id, user_id, stripe_subscription_id, stripe_customer_id, plan, status, current_period_start, current_period_end, created_at, updated_at)
VALUES 
  ('sub_11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', 'sub_pro_user_1', 'cus_pro_user_1', 'pro', 'active', NOW() - INTERVAL '25 days', NOW() + INTERVAL '5 days', NOW() - INTERVAL '25 days', NOW()),
  ('sub_11111111-1111-1111-1111-111111111112', '22222222-2222-2222-2222-222222222222', 'sub_pro_user_2', 'cus_pro_user_2', 'pro', 'active', NOW() - INTERVAL '20 days', NOW() + INTERVAL '10 days', NOW() - INTERVAL '20 days', NOW()),
  ('sub_11111111-1111-1111-1111-111111111113', '22222222-2222-2222-2222-222222222223', 'sub_pro_user_3', 'cus_pro_user_3', 'pro', 'active', NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days', NOW() - INTERVAL '10 days', NOW()),
  ('sub_11111111-1111-1111-1111-111111111114', '33333333-3333-3333-3333-333333333331', 'sub_premium_user_1', 'cus_premium_user_1', 'premium', 'active', NOW() - INTERVAL '22 days', NOW() + INTERVAL '8 days', NOW() - INTERVAL '22 days', NOW()),
  ('sub_11111111-1111-1111-1111-111111111115', '33333333-3333-3333-3333-333333333332', 'sub_premium_user_2', 'cus_premium_user_2', 'premium', 'active', NOW() - INTERVAL '18 days', NOW() + INTERVAL '12 days', NOW() - INTERVAL '18 days', NOW()),
  ('sub_11111111-1111-1111-1111-111111111116', '33333333-3333-3333-3333-333333333333', 'sub_premium_user_3', 'cus_premium_user_3', 'premium', 'past_due', NOW() - INTERVAL '12 days', NOW() + INTERVAL '18 days', NOW() - INTERVAL '12 days', NOW() - INTERVAL '2 days');

-- Sample payment transactions
INSERT INTO payments (id, user_id, stripe_payment_intent_id, amount, currency, status, plan, created_at)
VALUES 
  ('pay_11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', 'pi_pro_user_1_1', 1500, 'usd', 'succeeded', 'pro', NOW() - INTERVAL '25 days'),
  ('pay_11111111-1111-1111-1111-111111111112', '22222222-2222-2222-2222-222222222222', 'pi_pro_user_2_1', 1500, 'usd', 'succeeded', 'pro', NOW() - INTERVAL '20 days'),
  ('pay_11111111-1111-1111-1111-111111111113', '22222222-2222-2222-2222-222222222223', 'pi_pro_user_3_1', 1500, 'usd', 'succeeded', 'pro', NOW() - INTERVAL '10 days'),
  ('pay_11111111-1111-1111-1111-111111111114', '33333333-3333-3333-3333-333333333331', 'pi_premium_user_1_1', 3500, 'usd', 'succeeded', 'premium', NOW() - INTERVAL '22 days'),
  ('pay_11111111-1111-1111-1111-111111111115', '33333333-3333-3333-3333-333333333332', 'pi_premium_user_2_1', 3500, 'usd', 'succeeded', 'premium', NOW() - INTERVAL '18 days'),
  ('pay_11111111-1111-1111-1111-111111111116', '33333333-3333-3333-3333-333333333333', 'pi_premium_user_3_1', 3500, 'usd', 'failed', 'premium', NOW() - INTERVAL '12 days');

-- Sample usage analytics
INSERT INTO user_analytics (user_id, ideas_generated, mvps_built, startups_launched, last_active, created_at, updated_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 1, 0, 0, NOW() - INTERVAL '2 days', NOW() - INTERVAL '30 days', NOW()),
  ('11111111-1111-1111-1111-111111111112', 1, 1, 0, NOW() - INTERVAL '1 day', NOW() - INTERVAL '15 days', NOW()),
  ('11111111-1111-1111-1111-111111111113', 0, 0, 0, NOW() - INTERVAL '3 hours', NOW() - INTERVAL '7 days', NOW()),
  ('22222222-2222-2222-2222-222222222221', 15, 3, 2, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '25 days', NOW()),
  ('22222222-2222-2222-2222-222222222222', 23, 2, 1, NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '20 days', NOW()),
  ('22222222-2222-2222-2222-222222222223', 8, 1, 0, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '10 days', NOW()),
  ('22222222-2222-2222-2222-222222222224', 12, 2, 1, NOW() - INTERVAL '1 week', NOW() - INTERVAL '35 days', NOW()),
  ('33333333-3333-3333-3333-333333333331', 45, 5, 3, NOW() - INTERVAL '15 minutes', NOW() - INTERVAL '22 days', NOW()),
  ('33333333-3333-3333-3333-333333333332', 38, 4, 2, NOW() - INTERVAL '45 minutes', NOW() - INTERVAL '18 days', NOW()),
  ('33333333-3333-3333-3333-333333333333', 28, 3, 1, NOW() - INTERVAL '1 day', NOW() - INTERVAL '12 days', NOW());

-- Sample startup data
INSERT INTO startups (id, user_id, name, description, industry, status, website, revenue, users, traction, created_at, updated_at)
VALUES 
  ('startup_11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', 'CodeReview AI', 'AI-powered code review tool', 'Developer Tools', 'launched', 'https://codereview-ai.com', 12500, 2340, 94, NOW() - INTERVAL '20 days', NOW()),
  ('startup_11111111-1111-1111-1111-111111111112', '22222222-2222-2222-2222-222222222222', 'ClimateTracker', 'Real-time climate data analytics', 'Climate Tech', 'growing', 'https://climatetracker.io', 8900, 1560, 87, NOW() - INTERVAL '15 days', NOW()),
  ('startup_11111111-1111-1111-1111-111111111113', '33333333-3333-3333-3333-333333333331', 'HealthBot Pro', 'AI chatbot for mental health', 'Health Tech', 'mvp', 'https://healthbot-pro.com', 0, 120, 76, NOW() - INTERVAL '10 days', NOW()),
  ('startup_11111111-1111-1111-1111-111111111114', '33333333-3333-3333-3333-333333333332', 'TeamAnalytics', 'Remote team performance analytics', 'SaaS', 'launched', 'https://teamanalytics.co', 5600, 890, 79, NOW() - INTERVAL '8 days', NOW());

-- Update subscription analytics view
REFRESH MATERIALIZED VIEW IF EXISTS subscription_analytics;
