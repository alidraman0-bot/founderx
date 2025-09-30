# Stripe Integration Setup Guide

## 1. Install Dependencies

```bash
npm install @stripe/stripe-js stripe
```

## 2. Environment Variables

Add to your `.env.local` file:

```env
# Stripe Keys (Get these from your Stripe Dashboard)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# App URL (Update for production)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Stripe Price IDs (Replace with your actual Stripe price IDs)
STRIPE_PRO_PRICE_ID=price_pro_monthly_your_price_id_here
STRIPE_PREMIUM_PRICE_ID=price_premium_monthly_your_price_id_here
```

## 3. Stripe Dashboard Setup

### Create Products and Prices

1. Go to Stripe Dashboard → Products
2. Create two products:
   - **Pro Plan**: $15/month
   - **Premium Plan**: $35/month
3. Copy the Price IDs and update your environment variables

### Setup Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/payments/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the webhook secret to your environment variables

## 4. Database Migration

Run the Supabase migration:

```sql
-- Run the migration from supabase-migrations/003_stripe_integration.sql
```

## 5. Testing

### Test Cards (Stripe Test Mode)

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

### Test Flow

1. Go to `/pricing`
2. Click "Upgrade to Pro" or "Go Premium"
3. Use test card `4242 4242 4242 4242`
4. Complete checkout
5. Check user plan updated in Supabase
6. Verify success toast appears

## 6. Production Deployment

### Update Environment Variables

```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_PUBLIC_KEY=pk_live_your_live_public_key
```

### Update Webhook URL

Update webhook endpoint in Stripe Dashboard to your production URL.

## 7. Monitoring

### Stripe Dashboard

- Monitor payments in Stripe Dashboard → Payments
- Check webhook deliveries in Stripe Dashboard → Webhooks
- View customer subscriptions in Stripe Dashboard → Customers

### Application Logs

- Check API route logs for checkout session creation
- Monitor webhook processing logs
- Verify Supabase user updates

## 8. Error Handling

The integration includes comprehensive error handling:

- **Checkout failures**: User-friendly error messages
- **Webhook failures**: Detailed logging and retry logic
- **Database errors**: Graceful fallbacks and error reporting
- **Network issues**: Timeout handling and retry mechanisms

## 9. Security Considerations

- **Webhook signature verification**: Prevents unauthorized webhook calls
- **Environment variable protection**: Never expose secret keys
- **User authentication**: Verify user identity before checkout
- **Input validation**: Sanitize all user inputs
- **Rate limiting**: Implement rate limiting for API endpoints

## 10. Support

For issues with Stripe integration:

1. Check Stripe Dashboard for payment status
2. Review webhook delivery logs
3. Verify environment variables are correct
4. Check Supabase database for user updates
5. Review application logs for errors
