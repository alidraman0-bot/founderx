import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Idea {
  id: string
  created_at: string
  industry?: string
  ideas: {
    problem: string
    target_customer: string
    market_potential: number
    title: string
  }[]
}

export interface BusinessPlan {
  id: string
  created_at: string
  idea_id: string
  problem: string
  solution: string
  market_size: string
  revenue_model: string
  gtm_strategy: string
}

export interface MVP {
  id: string
  created_at: string
  plan_id: string
  idea_slug: string
  landing_copy: {
    headline: string
    cta: string
  }
  dashboard_features: string[]
  stripe_link: string
}

export interface Branding {
  id: string
  created_at: string
  idea_id: string
  name: string
  tagline: string
  color_palette: string[]
  font_style: string
  logo_svg: string
}

export interface Launch {
  id: string
  created_at: string
  mvp_id: string
  vercel_url: string
  analytics: {
    signups: number
    revenue: number
    page_views: number
  }
}
