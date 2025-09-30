import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface IdeaResult {
  problem: string
  target_customer: string
  market_potential: number
  title: string
}

export interface BusinessPlanResult {
  problem: string
  solution: string
  market_size: string
  revenue_model: string
  gtm_strategy: string
}

export interface MVPCopyResult {
  headline: string
  cta: string
  dashboard_features: string[]
}

export interface BrandingResult {
  name: string
  tagline: string
  color_palette: string[]
  font_style: string
}

export const generateIdeas = async (industry?: string): Promise<IdeaResult[]> => {
  const prompt = industry 
    ? `Generate 3-5 innovative startup ideas in the ${industry} industry. For each idea, provide:
       - A compelling problem statement
       - Target customer description
       - Market potential score (1-10)
       - Catchy title
       
       Format as JSON array with keys: title, problem, target_customer, market_potential`
    : `Generate 3-5 innovative startup ideas across any industry. For each idea, provide:
       - A compelling problem statement
       - Target customer description
       - Market potential score (1-10)
       - Catchy title
       
       Format as JSON array with keys: title, problem, target_customer, market_potential`

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  })

  const content = completion.choices[0].message.content
  return JSON.parse(content || '[]')
}

export const generateBusinessPlan = async (idea: IdeaResult): Promise<BusinessPlanResult> => {
  const prompt = `Create a lean business plan for this startup idea:
   
   Title: ${idea.title}
   Problem: ${idea.problem}
   Target Customer: ${idea.target_customer}
   Market Potential: ${idea.market_potential}/10
   
   Provide:
   - Refined problem statement
   - Solution description
   - Market size snapshot
   - Revenue model
   - Early go-to-market strategy
   
   Format as JSON with keys: problem, solution, market_size, revenue_model, gtm_strategy`

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  })

  const content = completion.choices[0].message.content
  return JSON.parse(content || '{}')
}

export const generateMVPCopy = async (plan: BusinessPlanResult): Promise<MVPCopyResult> => {
  const prompt = `Create MVP copy for this business plan:
   
   Problem: ${plan.problem}
   Solution: ${plan.solution}
   Revenue Model: ${plan.revenue_model}
   
   Provide:
   - Compelling landing page headline
   - Call-to-action button text
   - 2-3 dashboard features for the SaaS
   
   Format as JSON with keys: headline, cta, dashboard_features (array)`

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  })

  const content = completion.choices[0].message.content
  return JSON.parse(content || '{}')
}

export const generateBranding = async (idea: IdeaResult): Promise<BrandingResult> => {
  const prompt = `Create branding for this startup:
   
   Title: ${idea.title}
   Problem: ${idea.problem}
   Target Customer: ${idea.target_customer}
   
   Provide:
   - Startup name
   - Catchy tagline
   - Color palette (3-4 hex colors)
   - Suggested font style
   
   Format as JSON with keys: name, tagline, color_palette (array), font_style`

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  })

  const content = completion.choices[0].message.content
  return JSON.parse(content || '{}')
}

export const generateLogoSVG = (name: string, colors: string[]): string => {
  const primaryColor = colors[0] || '#6C63FF'
  const secondaryColor = colors[1] || '#38E4AE'
  
  return `
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="50" fill="url(#gradient)" />
      <text x="60" y="70" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white">
        ${name.charAt(0).toUpperCase()}
      </text>
    </svg>
  `
}
