export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const launch = {
    hosting: [
      {
        provider: "Vercel",
        type: "Frontend",
        description: "Perfect for Next.js applications with automatic deployments and global CDN.",
        price: "20"
      },
      {
        provider: "Railway",
        type: "Full Stack",
        description: "Simple deployment platform for full-stack applications with database hosting.",
        price: "5"
      },
      {
        provider: "AWS",
        type: "Enterprise",
        description: "Scalable cloud infrastructure with extensive services and global reach.",
        price: "50"
      }
    ],
    payments: [
      {
        name: "Stripe",
        description: "Most popular payment processor with excellent developer experience",
        fee: "2.9% + 30¢"
      },
      {
        name: "PayPal",
        description: "Widely recognized payment method with buyer protection",
        fee: "2.9% + 30¢"
      },
      {
        name: "Square",
        description: "Good for businesses with both online and offline sales",
        fee: "2.9% + 30¢"
      }
    ],
    monetization: [
      {
        type: "Freemium",
        description: "Free basic features with premium upgrades",
        revenue: "5000",
        timeline: "Month 3-6"
      },
      {
        type: "Subscription",
        description: "Monthly recurring revenue model",
        revenue: "15000",
        timeline: "Month 6-12"
      },
      {
        type: "Enterprise",
        description: "Custom solutions for large businesses",
        revenue: "50000",
        timeline: "Month 12+"
      }
    ]
  };

  res.status(200).json(launch);
}

