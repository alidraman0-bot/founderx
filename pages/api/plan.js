export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { idea, industry, market } = req.query;

  // Generate realistic business plan based on input
  const generatePlan = () => {
    const ideaText = (idea || '').toLowerCase();
    const industryText = (industry || '').toLowerCase();
    
    // Default plan template
    let plan = {
      problem: "Small businesses struggle to manage their operations efficiently, leading to decreased productivity and increased costs.",
      solution: "An integrated platform that streamlines business operations and provides actionable insights.",
      uniqueValueProp: "The only solution that combines automation with intelligent analytics for small businesses.",
      keyMetrics: "Monthly Active Users, Customer Acquisition Cost, Monthly Recurring Revenue, Churn Rate, Net Promoter Score",
      unfairAdvantage: "Proprietary algorithms and deep industry expertise.",
    channels: "Direct sales, Content marketing, Partner integrations, Referral program",
      customerSegments: "Small businesses (1-50 employees), Freelancers, Consultants",
      costStructure: "Development team, Infrastructure, Customer support, Marketing, Sales",
      revenueStreams: "Subscription fees, Premium features, API access, Professional services"
    };

    // Customize based on industry/idea
    if (ideaText.includes('ai') || ideaText.includes('artificial intelligence')) {
      plan = {
        problem: "Businesses struggle to leverage AI effectively due to complexity and high costs.",
        solution: "AI-powered platform that makes artificial intelligence accessible to small businesses.",
        uniqueValueProp: "Democratizing AI for small businesses with no technical expertise required.",
        keyMetrics: "AI Model Accuracy, User Engagement, Cost per Prediction, Customer Satisfaction",
        unfairAdvantage: "Proprietary AI models trained on small business data.",
        channels: "Direct sales, AI conferences, Partner with consultants, Content marketing",
        customerSegments: "Small businesses, E-commerce stores, Service providers",
        costStructure: "AI infrastructure, Data scientists, Customer success, Marketing",
        revenueStreams: "Usage-based pricing, Premium AI models, Custom training, API access"
      };
    }

    if (ideaText.includes('health') || ideaText.includes('wellness') || industryText.includes('health')) {
      plan = {
        problem: "People struggle to maintain consistent health habits due to lack of personalized guidance.",
        solution: "AI-powered health platform that provides personalized wellness recommendations.",
        uniqueValueProp: "The only health platform that adapts to your lifestyle and preferences.",
        keyMetrics: "Daily Active Users, Health Score Improvement, Retention Rate, Engagement Time",
        unfairAdvantage: "Proprietary health algorithms and partnerships with healthcare providers.",
        channels: "Healthcare providers, Fitness influencers, Corporate wellness, App stores",
        customerSegments: "Health-conscious individuals, Corporate employees, Seniors",
        costStructure: "Healthcare compliance, Medical advisors, App development, Marketing",
        revenueStreams: "Subscription fees, Corporate licenses, Health data insights, Premium features"
      };
    }

    if (ideaText.includes('sustainability') || ideaText.includes('green') || ideaText.includes('eco')) {
      plan = {
        problem: "Businesses want to be sustainable but lack tools to measure and improve their environmental impact.",
        solution: "Comprehensive sustainability platform that tracks and optimizes environmental impact.",
        uniqueValueProp: "The most accurate sustainability measurement and improvement platform.",
        keyMetrics: "Carbon Footprint Reduction, Sustainability Score, Customer Retention, Partner Growth",
        unfairAdvantage: "Extensive database of sustainability practices and real-time impact tracking.",
        channels: "Sustainability consultants, B2B sales, Industry conferences, ESG investors",
        customerSegments: "Manufacturing companies, Retailers, Service businesses",
        costStructure: "Sustainability experts, Data collection, Certification costs, Sales team",
        revenueStreams: "SaaS subscriptions, Sustainability consulting, Carbon credits, Reporting services"
      };
    }

    if (ideaText.includes('fintech') || ideaText.includes('finance') || ideaText.includes('payment')) {
      plan = {
        problem: "Small businesses struggle with complex financial management and lack access to affordable financial services.",
        solution: "All-in-one financial platform designed specifically for small businesses.",
        uniqueValueProp: "The only financial platform built by small business owners for small business owners.",
        keyMetrics: "Assets Under Management, Transaction Volume, Customer Acquisition Cost, Regulatory Compliance Score",
        unfairAdvantage: "Deep understanding of small business financial needs and regulatory expertise.",
        channels: "Financial advisors, Business associations, Direct sales, Referral program",
        customerSegments: "Small businesses, Freelancers, Consultants, E-commerce sellers",
        costStructure: "Regulatory compliance, Financial experts, Security infrastructure, Customer support",
        revenueStreams: "Transaction fees, Subscription fees, Financial products, Advisory services"
      };
    }

    if (ideaText.includes('education') || ideaText.includes('learning') || industryText.includes('education')) {
      plan = {
        problem: "Students and professionals struggle to find personalized, effective learning experiences.",
        solution: "AI-powered learning platform that adapts to individual learning styles and pace.",
        uniqueValueProp: "The most personalized learning experience powered by advanced AI.",
        keyMetrics: "Learning Outcomes, Course Completion Rate, Student Satisfaction, Skill Acquisition",
        unfairAdvantage: "Proprietary learning algorithms and partnerships with top educators.",
        channels: "Educational institutions, Corporate training, Direct to consumer, Influencers",
        customerSegments: "Students, Professionals, Corporate employees, Educators",
        costStructure: "Content creation, AI development, Educator partnerships, Platform maintenance",
        revenueStreams: "Course subscriptions, Corporate licenses, Certification fees, Premium content"
      };
    }

    return plan;
  };

  const plan = generatePlan();

  res.status(200).json(plan);
}

