export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const mvp = {
    options: [
      {
        type: "Landing Page",
        description: "Simple landing page with email capture and basic information about your product.",
        price: "500",
        timeframe: "1-2 weeks",
        features: [
          "Responsive design",
          "Email capture form",
          "Basic analytics",
          "Contact form",
          "Social media integration"
        ]
      },
      {
        type: "SaaS App",
        description: "Full-featured web application with user authentication, dashboard, and core functionality.",
        price: "5000",
        timeframe: "2-3 months",
        features: [
          "User authentication",
          "Dashboard interface",
          "Core features",
          "Payment integration",
          "Admin panel",
          "API endpoints"
        ]
      },
      {
        type: "Micro-tool",
        description: "Simple, focused tool that solves one specific problem for your target audience.",
        price: "1500",
        timeframe: "3-4 weeks",
        features: [
          "Single-purpose functionality",
          "Simple UI",
          "Basic analytics",
          "Share functionality",
          "Mobile responsive"
        ]
      }
    ],
    recommendation: "Start with a landing page to validate your idea and gather early user feedback before building the full SaaS application."
  };

  res.status(200).json(mvp);
}

