// API endpoint for Google signals
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Mock Google News data - in production, integrate with Serper.dev API
  const googleSignals = [
    {
      title: "AI-powered customer service sees 300% growth in enterprise adoption",
      url: "https://techcrunch.com/ai-customer-service-growth",
      source: "TechCrunch",
      timestamp: "2h ago",
      category: "AI"
    },
    {
      title: "Remote work tools market hits $50B valuation as companies embrace hybrid models",
      url: "https://forbes.com/remote-work-tools-market",
      source: "Forbes", 
      timestamp: "4h ago",
      category: "Remote Work"
    },
    {
      title: "Sustainable packaging startups raise $2B in Q3 funding rounds",
      url: "https://bloomberg.com/sustainable-packaging-funding",
      source: "Bloomberg",
      timestamp: "6h ago",
      category: "Sustainability"
    },
    {
      title: "Mental health apps see surge in enterprise adoption post-pandemic",
      url: "https://wsj.com/mental-health-apps-enterprise",
      source: "WSJ",
      timestamp: "8h ago",
      category: "HealthTech"
    },
    {
      title: "No-code platforms democratize software development for SMBs",
      url: "https://techcrunch.com/nocode-smb-adoption",
      source: "TechCrunch",
      timestamp: "10h ago",
      category: "No-Code"
    }
  ];

  res.status(200).json(googleSignals);
}
