// API endpoint for Crunchbase signals
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Mock Crunchbase data - in production, integrate with Crunchbase API
  const crunchbaseSignals = [
    {
      title: "AI startup raises $30M Series A for customer service automation",
      url: "https://crunchbase.com/organization/ai-service-co",
      amount: "$30M",
      stage: "Series A",
      company: "AI Service Co",
      investors: ["Sequoia Capital", "Andreessen Horowitz"],
      timestamp: "2h ago"
    },
    {
      title: "Health tech company secures $15M Seed round",
      url: "https://crunchbase.com/organization/health-tech-startup",
      amount: "$15M",
      stage: "Seed",
      company: "HealthTech Startup",
      investors: ["General Catalyst", "First Round"],
      timestamp: "4h ago"
    },
    {
      title: "Fintech platform gets $50M Series B funding",
      url: "https://crunchbase.com/organization/fintech-platform",
      amount: "$50M",
      stage: "Series B",
      company: "Fintech Platform",
      investors: ["Kleiner Perkins", "Bessemer Venture Partners"],
      timestamp: "6h ago"
    },
    {
      title: "Sustainable packaging startup raises $25M Series A",
      url: "https://crunchbase.com/organization/eco-packaging",
      amount: "$25M",
      stage: "Series A",
      company: "Eco Packaging",
      investors: ["Union Square Ventures", "GV"],
      timestamp: "8h ago"
    },
    {
      title: "No-code platform secures $40M Series A",
      url: "https://crunchbase.com/organization/nocode-platform",
      amount: "$40M",
      stage: "Series A",
      company: "NoCode Platform",
      investors: ["Accel", "Index Ventures"],
      timestamp: "10h ago"
    }
  ];

  res.status(200).json(crunchbaseSignals);
}
