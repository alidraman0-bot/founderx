import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { startupName, industry, description } = req.body

    if (!startupName) {
      return res.status(400).json({ error: 'Startup name is required' })
    }

    // Simulate branding generation API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock branding response
    const logos = ['🚀', '💡', '⚡', '🌟', '🎯', '🔥', '💎', '🎨']
    const colorPalettes = [
      ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'],
      ['#EF4444', '#F97316', '#EAB308', '#22C55E'],
      ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'],
      ['#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899']
    ]
    const fonts = ['Inter', 'Poppins', 'Roboto', 'Open Sans', 'Montserrat', 'Lato']

    const randomLogo = logos[Math.floor(Math.random() * logos.length)]
    const randomColors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)]
    const randomFonts = fonts.sort(() => 0.5 - Math.random()).slice(0, 4)

    res.status(200).json({
      logo: randomLogo,
      colors: randomColors,
      fonts: randomFonts,
      tagline: `${startupName} - ${description || 'Innovative solution for modern problems'}`,
      brandGuidelines: {
        primaryColor: randomColors[0],
        secondaryColor: randomColors[1],
        accentColor: randomColors[2],
        textColor: '#1F2937',
        backgroundColor: '#FFFFFF'
      },
      logoVariations: [
        { type: 'full', url: `/api/logo/${startupName}/full` },
        { type: 'icon', url: `/api/logo/${startupName}/icon` },
        { type: 'monochrome', url: `/api/logo/${startupName}/monochrome` }
      ]
    })
  } catch (error) {
    console.error('Error generating branding:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
