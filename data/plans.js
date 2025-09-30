export const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: null,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Limited idea generation',
      '1 MVP builder',
      '1 Startup launch page',
      'Community support',
      'Basic analytics'
    ],
    ctaText: 'Get Started Free',
    ctaLink: '/signup',
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 15,
    priceId: 'price_pro_monthly',
    period: 'month',
    description: 'Most popular for serious founders',
    features: [
      'Unlimited idea generation',
      '5 MVPs',
      '3 Startup launch pages',
      'Analytics dashboard',
      'Priority support',
      'Advanced templates',
      'Custom domains'
    ],
    ctaText: 'Upgrade to Pro',
    ctaLink: '#',
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 35,
    priceId: 'price_premium_monthly',
    period: 'month',
    description: 'For teams and agencies',
    features: [
      'Unlimited everything',
      'Unlimited launch pages + MVPs',
      'Team collaboration',
      'Advanced analytics & AI signals',
      'Direct founder coaching',
      'White-label options',
      'API access'
    ],
    ctaText: 'Go Premium',
    ctaLink: '#',
    popular: false
  }
]

export const faqs = [
  {
    question: 'Can I start free and upgrade later?',
    answer: 'Absolutely! You can start with our free plan and upgrade to Pro or Premium anytime. Your data will be preserved when you upgrade.'
  },
  {
    question: 'What happens if I cancel my subscription?',
    answer: 'You can cancel anytime. After cancellation, you\'ll retain access to Pro/Premium features until the end of your billing period, then revert to the free plan.'
  },
  {
    question: 'Do you offer team plans?',
    answer: 'Yes! Our Premium plan includes team collaboration features. For larger teams, contact us for custom enterprise pricing.'
  },
  {
    question: 'Can I change my plan anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal through our secure Stripe payment processor.'
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied, contact us for a full refund.'
  }
]
