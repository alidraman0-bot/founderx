export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { industry, market, problem } = req.query;

  // Generate ideas based on query parameters
  const generateIdeas = () => {
    const baseIdeas = [
      {
        id: 1,
        title: "AI-Powered Personal Finance Assistant",
        description: "An intelligent app that analyzes spending patterns and provides personalized financial advice to help users save money and invest wisely.",
        tags: ["AI", "FinTech", "Mobile App"],
        marketSize: "2.5B",
        difficulty: "Medium",
        timeToMvp: "3-4 months",
        problem: "People struggle with managing personal finances and making informed investment decisions",
        solution: "AI-powered financial advisor that learns from user behavior",
        targetAudience: "Young professionals aged 25-40",
        revenueModel: "Freemium with premium features",
        competitors: ["Mint", "YNAB", "Personal Capital"],
        marketTrend: "Growing 15% YoY due to increased financial awareness"
      },
      {
        id: 2,
        title: "Sustainable Packaging Marketplace",
        description: "A B2B platform connecting businesses with eco-friendly packaging suppliers, helping companies reduce their environmental footprint.",
        tags: ["Sustainability", "B2B", "Marketplace"],
        marketSize: "850M",
        difficulty: "Hard",
        timeToMvp: "6-8 months",
        problem: "Businesses struggle to find reliable eco-friendly packaging suppliers",
        solution: "Curated marketplace with verified sustainable packaging options",
        targetAudience: "E-commerce businesses, retail companies",
        revenueModel: "Commission-based marketplace",
        competitors: ["EcoEnclose", "Noissue", "Packhelp"],
        marketTrend: "Growing 25% YoY due to sustainability regulations"
      },
      {
        id: 3,
        title: "Remote Team Productivity Tracker",
        description: "A comprehensive tool for remote teams to track productivity, manage projects, and maintain team cohesion through gamification.",
        tags: ["SaaS", "Remote Work", "Productivity"],
        marketSize: "1.2B",
        difficulty: "Medium",
        timeToMvp: "4-5 months",
        problem: "Remote teams face coordination challenges and productivity issues",
        solution: "All-in-one platform with productivity tracking and team building features",
        targetAudience: "Remote teams, startups, consulting firms",
        revenueModel: "Per-seat subscription",
        competitors: ["Asana", "Monday.com", "Notion"],
        marketTrend: "Growing 20% YoY due to remote work adoption"
      },
      {
        id: 4,
        title: "Local Food Delivery for Small Restaurants",
        description: "A hyperlocal food delivery platform focused on supporting small, independent restaurants in underserved neighborhoods.",
        tags: ["Food Delivery", "Local Business", "Mobile App"],
        marketSize: "3.8B",
        difficulty: "Hard",
        timeToMvp: "5-6 months",
        problem: "Small restaurants can't afford high commission fees from major delivery platforms",
        solution: "Low-commission platform focused on local community support",
        targetAudience: "Small restaurants, local food businesses",
        revenueModel: "Lower commission fees (5-8% vs 15-30%)",
        competitors: ["DoorDash", "Uber Eats", "Grubhub"],
        marketTrend: "Growing 12% YoY with focus on local businesses"
      },
      {
        id: 5,
        title: "Mental Health Check-in App",
        description: "A simple, non-intrusive app that helps users track their mental health daily and connects them with resources when needed.",
        tags: ["HealthTech", "Mental Health", "Mobile App"],
        marketSize: "1.5B",
        difficulty: "Medium",
        timeToMvp: "3-4 months",
        problem: "People lack accessible tools for daily mental health monitoring",
        solution: "Simple daily check-ins with AI-powered insights and resource recommendations",
        targetAudience: "General population, students, professionals",
        revenueModel: "Freemium with premium analytics",
        competitors: ["Headspace", "Calm", "Moodpath"],
        marketTrend: "Growing 30% YoY due to increased mental health awareness"
      }
    ];

    // Filter ideas based on query parameters
    let filteredIdeas = baseIdeas;

    if (industry) {
      filteredIdeas = filteredIdeas.filter(idea => 
        idea.tags.some(tag => 
          tag.toLowerCase().includes(industry.toLowerCase())
        )
      );
    }

    if (market) {
      filteredIdeas = filteredIdeas.filter(idea => 
        idea.marketSize.includes(market) || 
        idea.targetAudience.toLowerCase().includes(market.toLowerCase())
      );
    }

    if (problem) {
      filteredIdeas = filteredIdeas.filter(idea => 
        idea.problem.toLowerCase().includes(problem.toLowerCase()) ||
        idea.description.toLowerCase().includes(problem.toLowerCase())
      );
    }

    // If no matches, return all ideas
    return filteredIdeas.length > 0 ? filteredIdeas : baseIdeas;
  };

  const ideas = generateIdeas();

  res.status(200).json(ideas);
}

