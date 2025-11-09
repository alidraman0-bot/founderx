import { NextApiRequest, NextApiResponse } from 'next'
import { processAICommand, applySchemaChanges } from '@/lib/ai/adapter'
import { AppSchema } from '@/types/builder'

// Disable body parsing for this route - we'll handle it manually if needed
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validate request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        success: false,
        error: 'Request body is required' 
      })
    }

    const { appId, prompt, schema } = req.body

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ 
        success: false,
        error: 'Prompt is required and must be a string' 
      })
    }

    if (!schema || typeof schema !== 'object') {
      return res.status(400).json({ 
        success: false,
        error: 'Schema is required and must be an object' 
      })
    }

    // Process AI command
    const aiResponse = await processAICommand(prompt, schema as AppSchema)

    if (!aiResponse.success) {
      return res.status(400).json(aiResponse)
    }

    // Apply changes to schema
    let updatedSchema = schema
    if (aiResponse.changes && aiResponse.changes.length > 0) {
      updatedSchema = applySchemaChanges(schema, aiResponse.changes)
    }

    return res.status(200).json({
      ...aiResponse,
      updatedSchema,
    })
  } catch (error) {
    console.error('AI command processing error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to process AI command',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
