import { NextApiRequest, NextApiResponse } from 'next'
import { generateAppFromPrompt } from '@/lib/ai/adapter'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt } = req.body

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    // Generate app schema from prompt
    const schema = await generateAppFromPrompt(prompt)

    if (!schema) {
      return res.status(500).json({ error: 'Failed to generate app schema' })
    }

    res.status(200).json(schema)
  } catch (error) {
    console.error('App generation error:', error)
    res.status(500).json({
      error: 'Failed to generate app',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
