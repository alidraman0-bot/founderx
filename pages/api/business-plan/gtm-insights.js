// API endpoint for GTM strategy insights using Reddit, Twitter, and LinkedIn data
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { idea, industry, targetMarket } = req.body;

  try {
    // Simulate API calls to real data sources
    const gtmData = await generateGTMData(idea, industry, targetMarket);
    
    res.status(200).json(gtmData);
  } catch (error) {
    console.error('Error fetching GTM data:', error);
    res.status(500).json({ message: 'Error fetching GTM data' });
  }
}

async function generateGTMData(idea, industry, targetMarket) {
  // Simulate Reddit API call
  const redditData = await simulateRedditAPI(idea, industry);
  
  // Simulate Twitter API call
  const twitterData = await simulateTwitterAPI(industry);
  
  // Simulate LinkedIn API call
  const linkedinData = await simulateLinkedInAPI(industry, targetMarket);

  return {
    painPoints: redditData.painPoints,
    marketingTactics: twitterData.marketingTactics,
    channelAnalysis: linkedinData.channelAnalysis,
    gtmStrategy: {
      recommendedChannels: generateRecommendedChannels(targetMarket, industry),
      messaging: generateMessagingStrategy(idea, industry),
      timeline: generateGTMTimeline(targetMarket),
      budget: generateBudgetRecommendations(targetMarket, industry)
    },
    sources: [
      { name: 'Reddit', type: 'Community Insights', confidence: 85 },
      { name: 'Twitter', type: 'Marketing Trends', confidence: 80 },
      { name: 'LinkedIn', type: 'B2B Strategy', confidence: 88 }
    ],
    lastUpdated: new Date().toISOString()
  };
}

async function simulateRedditAPI(idea, industry) {
  // Simulate Reddit data from startup communities
  const painPoints = [
    `Users in r/${industry.toLowerCase()} frequently mention ${extractPainPoint(idea)}`,
    `Common complaint: ${generateCommonComplaint(industry)}`,
    `Top request: ${generateTopRequest(industry)}`,
    `Frustration point: ${generateFrustrationPoint(industry)}`
  ];

  return {
    painPoints: painPoints.slice(0, 3),
    communitySentiment: 'Positive',
    keyDiscussions: [
      'Pricing concerns',
      'Feature requests',
      'Integration needs',
      'Support quality'
    ],
    userPersonas: generateUserPersonas(industry)
  };
}

async function simulateTwitterAPI(industry) {
  // Simulate Twitter marketing insights
  return {
    marketingTactics: [
      `#${industry} hashtag trending with 15K mentions this week`,
      'Influencer partnerships showing 3x engagement',
      'User-generated content driving 40% of conversions',
      'Video content performing 2.5x better than static posts'
    ],
    trendingHashtags: [`#${industry}`, '#startup', '#innovation', '#tech'],
    engagementRates: {
      organic: '4.2%',
      paid: '8.7%',
      influencer: '12.3%'
    },
    bestPerformingContent: [
      'Product demos and tutorials',
      'Customer success stories',
      'Industry insights and trends',
      'Behind-the-scenes content'
    ]
  };
}

async function simulateLinkedInAPI(industry, targetMarket) {
  // Simulate LinkedIn B2B insights
  return {
    channelAnalysis: {
      contentMarketing: { effectiveness: 'High', cost: 'Medium', reach: 'Broad' },
      emailMarketing: { effectiveness: 'Very High', cost: 'Low', reach: 'Targeted' },
      webinars: { effectiveness: 'High', cost: 'Medium', reach: 'Engaged' },
      partnerships: { effectiveness: 'Very High', cost: 'High', reach: 'Qualified' },
      salesOutreach: { effectiveness: 'Medium', cost: 'High', reach: 'Direct' }
    },
    b2bInsights: {
      decisionMakers: 'CTOs, VPs of Engineering, Product Managers',
      buyingProcess: '6-12 months average sales cycle',
      keyInfluencers: 'Industry analysts, thought leaders, peer recommendations',
      contentPreferences: 'Technical documentation, case studies, ROI calculators'
    }
  };
}

function extractPainPoint(idea) {
  const ideaLower = (idea || '').toLowerCase();
  if (ideaLower.includes('expensive') || ideaLower.includes('cost')) {
    return 'high costs and pricing concerns';
  } else if (ideaLower.includes('slow') || ideaLower.includes('time')) {
    return 'slow processes and time inefficiencies';
  } else if (ideaLower.includes('complex') || ideaLower.includes('difficult')) {
    return 'complexity and usability issues';
  } else {
    return 'general workflow inefficiencies';
  }
}

function generateCommonComplaint(industry) {
  const complaints = {
    'AI/ML': 'lack of transparency in AI decision-making',
    'FinTech': 'slow payment processing and high fees',
    'HealthTech': 'difficult integration with existing systems',
    'EdTech': 'poor user experience and limited customization',
    'SaaS': 'complex setup and onboarding processes',
    'E-commerce': 'inventory management and shipping challenges'
  };
  return complaints[industry] || 'integration and usability challenges';
}

function generateTopRequest(industry) {
  const requests = {
    'AI/ML': 'better explainability and model interpretability',
    'FinTech': 'real-time transaction processing',
    'HealthTech': 'seamless EHR integration',
    'EdTech': 'personalized learning paths',
    'SaaS': 'better API documentation',
    'E-commerce': 'advanced analytics and reporting'
  };
  return requests[industry] || 'improved user experience and features';
}

function generateFrustrationPoint(industry) {
  const frustrations = {
    'AI/ML': 'black box algorithms and lack of control',
    'FinTech': 'regulatory compliance complexity',
    'HealthTech': 'data privacy and security concerns',
    'EdTech': 'limited customization options',
    'SaaS': 'vendor lock-in and migration challenges',
    'E-commerce': 'inventory synchronization issues'
  };
  return frustrations[industry] || 'limited customization and control';
}

function generateUserPersonas(industry) {
  const personas = {
    'AI/ML': ['Data Scientists', 'ML Engineers', 'Product Managers', 'CTOs'],
    'FinTech': ['CFOs', 'Finance Directors', 'Payment Managers', 'Compliance Officers'],
    'HealthTech': ['Doctors', 'Nurses', 'IT Directors', 'Practice Managers'],
    'EdTech': ['Teachers', 'Students', 'IT Administrators', 'Curriculum Directors'],
    'SaaS': ['Business Users', 'IT Administrators', 'Decision Makers', 'End Users'],
    'E-commerce': ['Store Owners', 'Marketing Managers', 'Operations Teams', 'Customers']
  };
  return personas[industry] || ['End Users', 'Decision Makers', 'Administrators'];
}

function generateRecommendedChannels(targetMarket, industry) {
  const channelMap = {
    'B2B Enterprise': ['Content Marketing', 'Webinars', 'Partnerships', 'Direct Sales'],
    'B2B SMB': ['Email Marketing', 'Social Media', 'Content Marketing', 'Referrals'],
    'B2C Consumer': ['Social Media', 'Influencer Marketing', 'Content Marketing', 'Paid Ads'],
    'B2C Prosumer': ['Content Marketing', 'Community Building', 'Email Marketing', 'Social Media'],
    'Marketplace': ['SEO', 'Content Marketing', 'Partnerships', 'Paid Acquisition'],
    'Developer Tools': ['Developer Communities', 'Content Marketing', 'Open Source', 'Conferences']
  };
  return channelMap[targetMarket] || ['Content Marketing', 'Social Media', 'Email Marketing'];
}

function generateMessagingStrategy(idea, industry) {
  return {
    valueProposition: `Transform ${extractProblem(idea)} with our innovative ${industry} solution`,
    keyMessages: [
      'Solve the problem faster and more efficiently',
      'Reduce costs and improve ROI',
      'Easy to implement and scale',
      'Trusted by industry leaders'
    ],
    proofPoints: [
      'X% improvement in efficiency',
      'Y% cost reduction',
      'Z customer testimonials',
      'Industry certifications and compliance'
    ]
  };
}

function extractProblem(idea) {
  const ideaLower = idea.toLowerCase();
  if (ideaLower.includes('manage')) return 'management challenges';
  if (ideaLower.includes('track')) return 'tracking difficulties';
  if (ideaLower.includes('analyze')) return 'analysis bottlenecks';
  if (ideaLower.includes('automate')) return 'manual processes';
  return 'workflow inefficiencies';
}

function generateGTMTimeline(targetMarket) {
  const timelines = {
    'B2B Enterprise': {
      phase1: 'Months 1-3: Content creation and SEO',
      phase2: 'Months 4-6: Direct outreach and partnerships',
      phase3: 'Months 7-12: Sales enablement and scaling'
    },
    'B2B SMB': {
      phase1: 'Months 1-2: Content marketing and social media',
      phase2: 'Months 3-4: Email campaigns and referrals',
      phase3: 'Months 5-6: Paid acquisition and optimization'
    },
    'B2C Consumer': {
      phase1: 'Months 1-2: Social media and influencer outreach',
      phase2: 'Months 3-4: Paid advertising and content creation',
      phase3: 'Months 5-6: Community building and retention'
    }
  };
  return timelines[targetMarket] || timelines['B2B SMB'];
}

function generateBudgetRecommendations(targetMarket, industry) {
  const budgets = {
    'B2B Enterprise': {
      content: '40%',
      sales: '35%',
      events: '15%',
      paid: '10%'
    },
    'B2B SMB': {
      content: '30%',
      paid: '25%',
      email: '20%',
      social: '15%',
      events: '10%'
    },
    'B2C Consumer': {
      paid: '40%',
      social: '25%',
      content: '20%',
      influencer: '15%'
    }
  };
  return budgets[targetMarket] || budgets['B2B SMB'];
}
