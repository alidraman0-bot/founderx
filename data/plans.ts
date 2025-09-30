export interface Plan {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  limitations?: string[]
  cta: string
  ctaLink: string
  popular: boolean
  priceId: string | null
  color: string
  badge: string | null
  icon: string
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started with your first startup idea',
    features: [
      'Limited idea generation (5 per month)',
      '1 MVP builder',
      '1 Startup launch page',
      'Community support',
      'Basic templates',
      'Email support'
    ],
    limitations: [
      'Limited AI generations',
      'No priority support',
      'Basic analytics only'
    ],
    cta: 'Get Started Free',
    ctaLink: '/signup',
    popular: false,
    priceId: null,
    color: 'from-gray-500 to-gray-600',
    badge: null,
    icon: '🚀'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 15,
    period: 'month',
    description: 'For serious entrepreneurs ready to scale',
    features: [
      'Unlimited idea generation',
      '5 MVPs',
      '3 Startup launch pages',
      'Analytics dashboard',
      'Priority support',
      'Advanced templates',
      'Export to PDF/Word',
      'Custom branding tools'
    ],
    limitations: [],
    cta: 'Upgrade to Pro',
    ctaLink: '/api/payments/create-checkout-session',
    popular: true,
    priceId: 'price_pro_monthly',
    color: 'from-indigo-500 to-purple-600',
    badge: 'Most Popular',
    icon: '⚡'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 35,
    period: 'month',
    description: 'For scaling startups and teams',
    features: [
      'Unlimited everything',
      'Unlimited launch pages + MVPs',
      'Team collaboration (add co-founders)',
      'Advanced analytics & AI signals',
      'Direct founder coaching / concierge',
      'White-label solutions',
      'API access',
      'Custom integrations',
      'Priority feature requests'
    ],
    limitations: [],
    cta: 'Go Premium',
    ctaLink: '/api/payments/create-checkout-session',
    popular: false,
    priceId: 'price_premium_monthly',
    color: 'from-purple-500 to-pink-600',
    badge: null,
    icon: '👑'
  }
]

export const comparisonFeatures = [
  {
    feature: 'Idea Generation',
    free: '5 per month',
    pro: 'Unlimited',
    premium: 'Unlimited'
  },
  {
    feature: 'MVP Builder',
    free: '1',
    pro: '5',
    premium: 'Unlimited'
  },
  {
    feature: 'Launch Pages',
    free: '1',
    pro: '3',
    premium: 'Unlimited'
  },
  {
    feature: 'Analytics Dashboard',
    free: '❌',
    pro: '✅',
    premium: '✅'
  },
  {
    feature: 'Team Collaboration',
    free: '❌',
    pro: '❌',
    premium: '✅'
  },
  {
    feature: 'Priority Support',
    free: '❌',
    pro: '✅',
    premium: '✅'
  },
  {
    feature: 'AI Signals',
    free: '❌',
    pro: '❌',
    premium: '✅'
  },
  {
    feature: 'Founder Coaching',
    free: '❌',
    pro: '❌',
    premium: '✅'
  },
  {
    feature: 'API Access',
    free: '❌',
    pro: '❌',
    premium: '✅'
  },
  {
    feature: 'White-label',
    free: '❌',
    pro: '❌',
    premium: '✅'
  }
]

export const faqData = [
  {
    question: 'Can I start free and upgrade later?',
    answer: 'Absolutely! You can start with our free plan and upgrade to Pro or Premium whenever you\'re ready. Your data and progress will be preserved when you upgrade.'
  },
  {
    question: 'What happens if I cancel my subscription?',
    answer: 'You\'ll retain access to all premium features until the end of your billing period. After that, you\'ll be downgraded to the free plan, but your data will be preserved.'
  },
  {
    question: 'Do you offer team plans?',
    answer: 'Yes! Our Premium plan includes team collaboration features where you can add co-founders and work together on startup projects.'
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start your trial.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe.'
  },
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.'
  }
]
