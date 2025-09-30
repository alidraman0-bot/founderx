export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { idea, description, targetMarket, businessModel } = req.body;

  // Generate realistic validation based on input
  const generateValidation = () => {
    const ideaText = (idea || description || '').toLowerCase();
    
    // Calculate scores based on keywords and content
    let marketScore = 60;
    let competitionScore = 70;
    let technicalScore = 80;
    let businessScore = 65;
    let scalabilityScore = 75;
    
    // Adjust scores based on idea content
    if (ideaText.includes('ai') || ideaText.includes('artificial intelligence')) {
      marketScore += 15;
      technicalScore += 10;
      scalabilityScore += 10;
    }
    
    if (ideaText.includes('sustainability') || ideaText.includes('green') || ideaText.includes('eco')) {
      marketScore += 20;
      businessScore += 15;
    }
    
    if (ideaText.includes('health') || ideaText.includes('mental health') || ideaText.includes('wellness')) {
      marketScore += 18;
      businessScore += 12;
    }
    
    if (ideaText.includes('fintech') || ideaText.includes('finance') || ideaText.includes('payment')) {
      marketScore += 12;
      competitionScore -= 10; // More competitive
      businessScore += 8;
    }
    
    if (ideaText.includes('b2b') || ideaText.includes('enterprise')) {
      businessScore += 15;
      scalabilityScore += 12;
    }
    
    if (ideaText.includes('mobile') || ideaText.includes('app')) {
      technicalScore += 5;
      marketScore += 8;
    }

    // Ensure scores are within bounds
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    
    return {
    ideaId: Math.random().toString(36).substr(2, 9),
    idea: idea || "AI-Powered Personal Finance Assistant",
    description: description || "An intelligent app that analyzes spending patterns and provides personalized financial advice.",
      overallScore: Math.floor((marketScore + competitionScore + technicalScore + businessScore + scalabilityScore) / 5),
    validationChecks: [
      {
        category: "Market Demand",
          score: clamp(marketScore, 40, 100),
          status: marketScore >= 70 ? "pass" : marketScore >= 60 ? "warning" : "fail",
          details: marketScore >= 70 ? 
            "Strong market demand with growing interest in this sector" :
            marketScore >= 60 ? 
            "Moderate market demand, consider niche targeting" :
            "Limited market demand, needs validation",
          recommendations: marketScore >= 70 ? 
            ["Focus on high-growth demographics", "Consider international expansion"] :
            ["Conduct extensive market research", "Test with pilot customers", "Refine target market"]
      },
      {
        category: "Competition Analysis",
          score: clamp(competitionScore, 40, 100),
          status: competitionScore >= 70 ? "pass" : competitionScore >= 60 ? "warning" : "fail",
          details: competitionScore >= 70 ? 
            "Moderate competition with room for differentiation" :
            competitionScore >= 60 ? 
            "High competition but opportunities exist" :
            "Very competitive market, need strong differentiation",
          recommendations: competitionScore >= 70 ? 
            ["Focus on unique value proposition", "Target underserved niches"] :
            ["Develop strong competitive advantages", "Consider partnerships", "Focus on customer experience"]
      },
      {
        category: "Technical Feasibility",
          score: clamp(technicalScore, 40, 100),
          status: technicalScore >= 70 ? "pass" : technicalScore >= 60 ? "warning" : "fail",
          details: technicalScore >= 70 ? 
            "Technically feasible with existing technologies" :
            technicalScore >= 60 ? 
            "Moderate technical complexity" :
            "High technical complexity, consider alternatives",
          recommendations: technicalScore >= 70 ? 
            ["Start with MVP using existing APIs", "Consider no-code solutions"] :
            ["Partner with technical co-founder", "Consider outsourcing development", "Start with simpler version"]
      },
      {
        category: "Business Model",
          score: clamp(businessScore, 40, 100),
          status: businessScore >= 70 ? "pass" : businessScore >= 60 ? "warning" : "fail",
          details: businessScore >= 70 ? 
            "Clear revenue model with good potential" :
            businessScore >= 60 ? 
            "Revenue model needs refinement" :
            "Unclear revenue model, needs development",
          recommendations: businessScore >= 70 ? 
            ["Test pricing with customers", "Consider multiple revenue streams"] :
            ["Research successful business models in sector", "Test different pricing strategies", "Consider freemium model"]
      },
      {
        category: "Scalability",
          score: clamp(scalabilityScore, 40, 100),
          status: scalabilityScore >= 70 ? "pass" : scalabilityScore >= 60 ? "warning" : "fail",
          details: scalabilityScore >= 70 ? 
            "Good scalability potential with cloud infrastructure" :
            scalabilityScore >= 60 ? 
            "Moderate scalability potential" :
            "Limited scalability, consider alternatives",
          recommendations: scalabilityScore >= 70 ? 
            ["Plan for international expansion", "Consider API monetization"] :
            ["Focus on local markets first", "Consider franchise model", "Plan for manual processes"]
      }
    ],
    riskFactors: [
      {
          factor: "Market Timing",
          level: marketScore < 70 ? "high" : "medium",
          description: "Market may not be ready for this solution",
          mitigation: "Conduct extensive market research and pilot testing"
        },
        {
          factor: "Competition",
          level: competitionScore < 70 ? "high" : "medium",
          description: "Strong competition from established players",
          mitigation: "Focus on differentiation and unique value proposition"
        },
        {
          factor: "Technical Complexity",
          level: technicalScore < 70 ? "high" : "low",
          description: "High technical barriers to entry",
          mitigation: "Partner with technical experts or consider simpler MVP"
        },
        {
          factor: "Regulatory Compliance",
          level: ideaText.includes('health') || ideaText.includes('finance') ? "high" : "medium",
          description: "May require regulatory compliance",
          mitigation: "Consult with legal experts early, consider compliance costs"
      }
    ],
    nextSteps: [
      "Conduct user interviews with 20+ potential customers",
      "Create landing page and collect email signups",
      "Build MVP with core features",
      "Test pricing with different user segments",
        "Develop go-to-market strategy",
        "Secure initial funding if needed"
    ],
    estimatedTimeline: {
        mvp: technicalScore >= 70 ? "2-3 months" : "4-6 months",
      launch: "6-8 months",
        profitability: businessScore >= 70 ? "12-15 months" : "18-24 months"
    },
    fundingRecommendation: {
        needed: technicalScore >= 70 && businessScore >= 70 ? "$25,000 - $50,000" : "$50,000 - $100,000",
      use: "Product development, marketing, team expansion",
        sources: ["Bootstrapping", "Angel investors", "Seed funding", "Grants"]
    }
  };
  };

  const validationResults = generateValidation();

  // Simulate processing time
  setTimeout(() => {
    res.status(200).json(validationResults);
  }, 1000);
}
