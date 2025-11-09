// Mock implementation - OpenAI not available

export interface IdeaResult {
  title: string
  problem: string
  target_customer: string
  market_potential: number
}

export interface BusinessPlanResult {
  problem: string
  solution: string
  market_size: string
  revenue_model: string
  gtm_strategy: string
  created_at: string
}

export interface MVPPlanResult {
  tech_stack: string
  features: string[]
  timeline: string
  budget: string
  created_at: string
}

export interface BrandingResult {
  logo: string
  colors: string[]
  fonts: string[]
  domain: {
    available: boolean
    suggestions: string[]
  }
  created_at: string
}

export const generateIdeas = async (prompt: string): Promise<IdeaResult[]> => {
  // Mock implementation - OpenAI not available
  return [
    {
      title: "AI-Powered Personal Assistant",
      problem: "People struggle to manage their daily tasks and schedules efficiently",
      target_customer: "Busy professionals and entrepreneurs",
      market_potential: 8
    },
    {
      title: "Sustainable Food Delivery",
      problem: "Food delivery services generate excessive packaging waste",
      target_customer: "Environmentally conscious consumers",
      market_potential: 7
    },
    {
      title: "Remote Team Collaboration Tool",
      problem: "Remote teams struggle with effective communication and project management",
      target_customer: "Remote workers and distributed teams",
      market_potential: 9
    }
  ]
}

export const generateBusinessPlan = async (idea: IdeaResult): Promise<BusinessPlanResult> => {
  // Mock implementation - OpenAI not available
  return {
    problem: idea.problem,
    solution: `An innovative solution that addresses ${idea.problem.toLowerCase()} through technology and user-centered design.`,
    market_size: "Large market opportunity with significant growth potential",
    revenue_model: "Subscription-based model with freemium tier",
    gtm_strategy: "Digital marketing, partnerships, and content marketing",
    created_at: new Date().toISOString()
  }
}

export const generateMVPPlan = async (idea: IdeaResult): Promise<MVPPlanResult> => {
  // Mock implementation - OpenAI not available
  return {
    tech_stack: "Next.js, React, Node.js, PostgreSQL",
    features: [
      "User authentication and profiles",
      "Core functionality implementation",
      "Basic dashboard and analytics",
      "Mobile-responsive design"
    ],
    timeline: "4-6 weeks",
    budget: "$5,000 - $10,000",
    created_at: new Date().toISOString()
  }
}

export const generateBranding = async (startupName: string): Promise<BrandingResult> => {
  // Mock implementation - OpenAI not available
  return {
    logo: "🚀",
    colors: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"],
    fonts: ["Inter", "Poppins", "Roboto", "Open Sans"],
    domain: {
      available: true,
      suggestions: [
        `${startupName.toLowerCase()}.com`,
        `${startupName.toLowerCase()}.io`,
        `get${startupName.toLowerCase()}.com`
      ]
    },
    created_at: new Date().toISOString()
  }
}