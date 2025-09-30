// API endpoint for AI synthesis of business plan data
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { idea, industry, targetMarket, marketData, competitors, pricing, gtmInsights } = req.body;

  try {
    // Simulate OpenAI API call for business plan synthesis
    const businessPlan = await synthesizeBusinessPlan({
      idea,
      industry,
      targetMarket,
      marketData,
      competitors,
      pricing,
      gtmInsights
    });
    
    res.status(200).json(businessPlan);
  } catch (error) {
    console.error('Error synthesizing business plan:', error);
    res.status(500).json({ message: 'Error synthesizing business plan' });
  }
}

async function synthesizeBusinessPlan(data) {
  // Simulate OpenAI API call for comprehensive business plan synthesis
  const { idea, industry, targetMarket, marketData, competitors, pricing, gtmInsights } = data;

  // Extract key insights from the idea
  const ideaAnalysis = analyzeIdea(idea, industry);
  
  // Generate comprehensive business plan
  const businessPlan = {
    title: generateTitle(idea, industry),
    tagline: generateTagline(idea, industry),
    
    // Problem & Solution
    problem: generateProblemStatement(idea, industry, gtmInsights),
    solution: generateSolution(idea, industry, ideaAnalysis),
    uniqueValueProp: generateUniqueValueProp(idea, industry, competitors),
    
    // Market Analysis
    marketSize: `${marketData.tam} TAM, ${marketData.sam} SAM, ${marketData.som} SOM`,
    targetCustomer: generateTargetCustomer(targetMarket, industry),
    marketTrends: marketData.marketTrends.join(', '),
    
    // Competitive Analysis
    competitors: competitors.competitors.map(comp => ({
      name: comp.name,
      description: comp.description,
      funding: comp.funding,
      stage: comp.stage
    })),
    
    // Revenue Model
    revenueModel: pricing.pricingStrategy.recommendedModel,
    pricingStrategy: generatePricingStrategy(pricing, targetMarket),
    revenueStreams: generateRevenueStreams(pricing, industry),
    
    // Go-to-Market
    channels: gtmInsights.gtmStrategy.recommendedChannels.join(', '),
    marketingStrategy: generateMarketingStrategy(gtmInsights, targetMarket),
    salesStrategy: generateSalesStrategy(targetMarket, industry),
    
    // Financial Projections
    keyMetrics: generateKeyMetrics(targetMarket, industry),
    costStructure: generateCostStructure(industry, targetMarket),
    fundingNeeds: generateFundingNeeds(industry, targetMarket),
    
    // Additional Insights
    riskFactors: generateRiskFactors(industry, competitors),
    opportunities: generateOpportunities(marketData, industry),
    nextSteps: generateNextSteps(targetMarket, industry),
    
    // Metadata
    confidence: calculateConfidence(marketData, competitors, pricing, gtmInsights),
    dataSources: [
      ...marketData.sources,
      ...competitors.sources,
      ...pricing.sources,
      ...gtmInsights.sources
    ],
    generatedAt: new Date().toISOString()
  };

  return businessPlan;
}

function analyzeIdea(idea, industry) {
  const ideaLower = (idea || '').toLowerCase();
  
  return {
    problemType: extractProblemType(ideaLower),
    solutionType: extractSolutionType(ideaLower),
    complexity: assessComplexity(ideaLower),
    innovation: assessInnovation(ideaLower, industry),
    scalability: assessScalability(ideaLower, industry)
  };
}

function extractProblemType(ideaLower) {
  if (ideaLower.includes('expensive') || ideaLower.includes('cost')) return 'Cost Efficiency';
  if (ideaLower.includes('slow') || ideaLower.includes('time')) return 'Time Optimization';
  if (ideaLower.includes('complex') || ideaLower.includes('difficult')) return 'Usability';
  if (ideaLower.includes('manual') || ideaLower.includes('automate')) return 'Automation';
  return 'General Efficiency';
}

function extractSolutionType(ideaLower) {
  if (ideaLower.includes('ai') || ideaLower.includes('machine learning')) return 'AI-Powered';
  if (ideaLower.includes('mobile') || ideaLower.includes('app')) return 'Mobile-First';
  if (ideaLower.includes('cloud') || ideaLower.includes('saas')) return 'Cloud-Based';
  if (ideaLower.includes('api') || ideaLower.includes('integration')) return 'Platform/API';
  return 'Software Solution';
}

function assessComplexity(ideaLower) {
  const complexityIndicators = ['ai', 'machine learning', 'blockchain', 'iot', 'integration'];
  const complexityScore = complexityIndicators.filter(indicator => 
    ideaLower.includes(indicator)
  ).length;
  
  if (complexityScore >= 3) return 'High';
  if (complexityScore >= 1) return 'Medium';
  return 'Low';
}

function assessInnovation(ideaLower, industry) {
  const innovationKeywords = ['revolutionary', 'breakthrough', 'innovative', 'cutting-edge', 'next-generation'];
  const hasInnovationKeywords = innovationKeywords.some(keyword => 
    ideaLower.includes(keyword)
  );
  
  return hasInnovationKeywords ? 'High' : 'Medium';
}

function assessScalability(ideaLower, industry) {
  const scalableKeywords = ['platform', 'marketplace', 'network', 'ecosystem', 'global'];
  const hasScalableKeywords = scalableKeywords.some(keyword => 
    ideaLower.includes(keyword)
  );
  
  return hasScalableKeywords ? 'High' : 'Medium';
}

function generateTitle(idea, industry) {
  const ideaWords = idea.split(' ').slice(0, 3);
  const industryContext = industry === 'AI/ML' ? 'AI' : industry;
  return `${ideaWords.join(' ')} - ${industryContext} Solution`;
}

function generateTagline(idea, industry) {
  const taglines = {
    'AI/ML': 'Intelligent solutions for modern challenges',
    'FinTech': 'Transforming financial services with technology',
    'HealthTech': 'Advancing healthcare through innovation',
    'EdTech': 'Empowering learning through technology',
    'SaaS': 'Streamlining business operations',
    'E-commerce': 'Revolutionizing online commerce'
  };
  return taglines[industry] || 'Innovative solutions for your business';
}

function generateProblemStatement(idea, industry, gtmInsights) {
  const painPoints = gtmInsights.painPoints.join(' ');
  return `The ${industry} industry faces significant challenges: ${painPoints}. Current solutions are inadequate, creating inefficiencies and missed opportunities for businesses.`;
}

function generateSolution(idea, industry, ideaAnalysis) {
  return `Our ${ideaAnalysis.solutionType} platform addresses these challenges by ${extractSolutionApproach(idea)}. We provide ${ideaAnalysis.complexity.toLowerCase()}-complexity solutions that ${generateSolutionBenefits(ideaAnalysis)}.`;
}

function extractSolutionApproach(idea) {
  const ideaLower = (idea || '').toLowerCase();
  if (ideaLower.includes('automate')) return 'automating manual processes';
  if (ideaLower.includes('optimize')) return 'optimizing existing workflows';
  if (ideaLower.includes('streamline')) return 'streamlining operations';
  if (ideaLower.includes('enhance')) return 'enhancing current capabilities';
  return 'providing innovative solutions';
}

function generateSolutionBenefits(ideaAnalysis) {
  const benefits = [];
  if (ideaAnalysis.complexity === 'Low') benefits.push('easy implementation');
  if (ideaAnalysis.innovation === 'High') benefits.push('cutting-edge technology');
  if (ideaAnalysis.scalability === 'High') benefits.push('unlimited scalability');
  return benefits.join(', ') || 'significant value';
}

function generateUniqueValueProp(idea, industry, competitors) {
  const competitorCount = competitors.competitors.length;
  const marketSaturation = competitorCount > 5 ? 'crowded' : 'emerging';
  
  return `Unlike existing solutions in this ${marketSaturation} market, we offer ${extractUniqueValue(idea)} with ${generateDifferentiators(industry)}.`;
}

function extractUniqueValue(idea) {
  const ideaLower = (idea || '').toLowerCase();
  if (ideaLower.includes('ai')) return 'AI-powered intelligence';
  if (ideaLower.includes('real-time')) return 'real-time processing';
  if (ideaLower.includes('mobile')) return 'mobile-first design';
  if (ideaLower.includes('integrated')) return 'seamless integration';
  return 'unique approach';
}

function generateDifferentiators(industry) {
  const differentiators = {
    'AI/ML': 'superior accuracy and explainability',
    'FinTech': 'enhanced security and compliance',
    'HealthTech': 'better patient outcomes and efficiency',
    'EdTech': 'personalized learning experiences',
    'SaaS': 'intuitive user experience',
    'E-commerce': 'advanced analytics and optimization'
  };
  return differentiators[industry] || 'superior performance';
}

function generateTargetCustomer(targetMarket, industry) {
  const customerMap = {
    'B2B Enterprise': 'Large enterprises with complex operational needs',
    'B2B SMB': 'Small to medium businesses seeking efficiency gains',
    'B2C Consumer': 'Individual consumers looking for convenience',
    'B2C Prosumer': 'Professional consumers requiring advanced features',
    'Marketplace': 'Multi-sided platform participants',
    'Developer Tools': 'Software developers and engineering teams'
  };
  return customerMap[targetMarket] || 'Business users seeking solutions';
}

function generatePricingStrategy(pricing, targetMarket) {
  const strategy = pricing.pricingStrategy;
  return `${strategy.recommendedModel} model with ${strategy.pricePoints.starter} starter tier, ${strategy.pricePoints.pro} professional tier, and ${strategy.pricePoints.enterprise} enterprise tier. ${strategy.freemiumStrategy.recommended ? 'Freemium strategy recommended for user acquisition.' : 'Direct paid model for immediate revenue.'}`;
}

function generateRevenueStreams(pricing, industry) {
  const streams = [];
  const model = pricing.pricingStrategy.recommendedModel;
  
  if (model === 'Subscription') {
    streams.push('Monthly/annual subscription fees');
  } else if (model === 'Usage-based') {
    streams.push('Per-transaction or per-usage fees');
  } else if (model === 'Freemium') {
    streams.push('Freemium conversion to paid tiers');
  }
  
  streams.push('Enterprise custom solutions');
  streams.push('Professional services and support');
  
  return streams.join(', ');
}

function generateMarketingStrategy(gtmInsights, targetMarket) {
  const channels = gtmInsights.gtmStrategy.recommendedChannels;
  const messaging = gtmInsights.gtmStrategy.messaging;
  
  return `Focus on ${channels.join(', ')} channels with messaging centered on "${messaging.valueProposition}". Target ${generateTargetAudience(targetMarket)} with ${messaging.keyMessages.join(', ')}.`;
}

function generateTargetAudience(targetMarket) {
  const audienceMap = {
    'B2B Enterprise': 'C-level executives and decision makers',
    'B2B SMB': 'business owners and managers',
    'B2C Consumer': 'end consumers and users',
    'B2C Prosumer': 'professional users and enthusiasts',
    'Marketplace': 'platform participants and stakeholders',
    'Developer Tools': 'software developers and engineers'
  };
  return audienceMap[targetMarket] || 'target users';
}

function generateSalesStrategy(targetMarket, industry) {
  if (targetMarket.includes('B2B')) {
    return `Direct sales approach with ${targetMarket === 'B2B Enterprise' ? 'long-term enterprise sales cycles' : 'quick SMB sales process'}. Focus on ${targetMarket === 'B2B Enterprise' ? 'custom solutions and enterprise features' : 'standard packages and self-service'}.`;
  } else {
    return `Self-service model with ${targetMarket === 'B2C Consumer' ? 'freemium conversion' : 'direct paid subscriptions'}. Focus on ${targetMarket === 'B2C Consumer' ? 'user acquisition and retention' : 'professional features and support'}.`;
  }
}

function generateKeyMetrics(targetMarket, industry) {
  const metrics = {
    'B2B Enterprise': 'Customer Acquisition Cost (CAC), Customer Lifetime Value (LTV), Sales Cycle Length, Churn Rate',
    'B2B SMB': 'Monthly Recurring Revenue (MRR), Customer Acquisition Cost (CAC), Conversion Rate, Support Tickets',
    'B2C Consumer': 'Daily Active Users (DAU), Monthly Active Users (MAU), Conversion Rate, Retention Rate',
    'B2C Prosumer': 'User Engagement, Feature Adoption, Upgrade Rate, Community Growth',
    'Marketplace': 'Gross Merchandise Value (GMV), Take Rate, Seller Acquisition, Buyer Retention',
    'Developer Tools': 'Developer Adoption, API Usage, Documentation Views, Community Engagement'
  };
  return metrics[targetMarket] || 'Revenue Growth, Customer Acquisition, User Engagement, Market Share';
}

function generateCostStructure(industry, targetMarket) {
  const costs = {
    'AI/ML': 'High: Compute resources, data processing, model training',
    'FinTech': 'Medium-High: Compliance, security, payment processing',
    'HealthTech': 'High: Regulatory compliance, security, integration',
    'EdTech': 'Medium: Content creation, platform maintenance, support',
    'SaaS': 'Medium: Infrastructure, development, customer success',
    'E-commerce': 'Medium: Inventory, logistics, payment processing'
  };
  
  const baseCosts = costs[industry] || 'Medium: Development, infrastructure, marketing';
  const targetCosts = targetMarket.includes('Enterprise') ? 'Higher: Custom development, enterprise support' : 'Standard: Platform maintenance, customer support';
  
  return `${baseCosts}. ${targetCosts}.`;
}

function generateFundingNeeds(industry, targetMarket) {
  const fundingMap = {
    'AI/ML': '$2-5M for compute resources and talent',
    'FinTech': '$1-3M for compliance and security infrastructure',
    'HealthTech': '$3-7M for regulatory approval and integration',
    'EdTech': '$500K-2M for content and platform development',
    'SaaS': '$1-3M for product development and go-to-market',
    'E-commerce': '$1-4M for inventory and logistics setup'
  };
  
  const baseFunding = fundingMap[industry] || '$1-3M for product development and market entry';
  const targetFunding = targetMarket.includes('Enterprise') ? 'Additional $1-2M for enterprise sales team' : 'Standard go-to-market budget';
  
  return `${baseFunding}. ${targetFunding}.`;
}

function generateRiskFactors(industry, competitors) {
  const risks = [
    'Market competition from established players',
    'Regulatory changes affecting industry',
    'Technology disruption and obsolescence',
    'Customer acquisition challenges',
    'Funding and cash flow management'
  ];
  
  if (competitors.competitors.length > 5) {
    risks.unshift('High market saturation and competition');
  }
  
  return risks.slice(0, 4).join(', ');
}

function generateOpportunities(marketData, industry) {
  const opportunities = [
    `Growing market with ${marketData.growthRate} annual growth`,
    'Emerging technology trends creating new possibilities',
    'Underserved customer segments and use cases',
    'Partnership opportunities with industry leaders'
  ];
  
  return opportunities.join(', ');
}

function generateNextSteps(targetMarket, industry) {
  const steps = [
    'Validate problem-solution fit with target customers',
    'Build MVP and gather user feedback',
    'Develop go-to-market strategy and pricing',
    'Secure initial funding and team expansion',
    'Launch beta program and iterate based on feedback'
  ];
  
  return steps.join(', ');
}

function calculateConfidence(marketData, competitors, pricing, gtmInsights) {
  const dataQuality = [
    marketData.sources.reduce((sum, s) => sum + s.confidence, 0) / marketData.sources.length,
    competitors.sources.reduce((sum, s) => sum + s.confidence, 0) / competitors.sources.length,
    pricing.sources.reduce((sum, s) => sum + s.confidence, 0) / pricing.sources.length,
    gtmInsights.sources.reduce((sum, s) => sum + s.confidence, 0) / gtmInsights.sources.length
  ];
  
  const averageConfidence = dataQuality.reduce((sum, conf) => sum + conf, 0) / dataQuality.length;
  return Math.round(averageConfidence);
}
