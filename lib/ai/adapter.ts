import OpenAI from 'openai'
import { AIResponse, AppSchema, SchemaChange } from '@/types/builder'

// Check if API key is available and initialize OpenAI client safely
let openai: OpenAI | null = null

try {
  const apiKey = process.env.OPENAI_API_KEY
  if (apiKey && apiKey.trim().length > 0) {
    openai = new OpenAI({
      apiKey: apiKey.trim(),
    })
  } else {
    console.warn('OPENAI_API_KEY is not set. AI features will not work.')
  }
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error)
  openai = null
}

// Helper function to safely parse JSON from OpenAI response
function parseJSONResponse(content: string): any {
  if (!content || content.trim().length === 0) {
    throw new Error('Empty response from AI')
  }

  // Try to extract JSON from markdown code blocks
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*\}/)
  const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content.trim()

  try {
    return JSON.parse(jsonString)
  } catch (error) {
    // If parsing fails, try to find JSON object in the content
    const fallbackMatch = content.match(/\{[\s\S]*\}/)
    if (fallbackMatch) {
      try {
        return JSON.parse(fallbackMatch[0])
      } catch (e) {
        console.error('Failed to parse JSON:', jsonString.substring(0, 200))
        throw new Error(`Invalid JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
    throw new Error(`Invalid JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

const SYSTEM_PROMPT = `You are an AI assistant that helps users build web applications.
You understand natural language commands and convert them into structured application schemas.

When a user asks to create, update, or modify their app, you should:
1. Parse their intent (createPage, updateComponent, createDataModel, createWorkflow, etc.)
2. Generate the appropriate schema changes in JSON format
3. Return a structured response with the changes

Response format:
{
  "success": true,
  "message": "Human-readable description of what was done",
  "changes": [
    {
      "type": "page|component|dataModel|workflow",
      "action": "create|update|delete",
      "target": "identifier",
      "changes": { ...updated properties }
    }
  ],
  "updatedSchema": { ...partial schema update }
}

Examples:
- "Add a dashboard page" -> Create a new page with dashboard components
- "Create a users table with name and email fields" -> Create a data model
- "Add a submit button to the form" -> Update component in current page
- "Make the header blue" -> Update component styling
- "Delete the sidebar" -> Remove component

Always generate valid, production-ready schemas.`

export async function processAICommand(
  prompt: string,
  currentSchema: AppSchema
): Promise<AIResponse> {
  if (!openai) {
    return {
      success: false,
      message: 'OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment variables.',
    }
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Current app schema:\n${JSON.stringify(currentSchema, null, 2)}\n\nUser request: ${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from AI')
    }

    try {
      const aiResponse: AIResponse = parseJSONResponse(content)
    return aiResponse
    } catch (error) {
      console.error('JSON parsing error:', error)
      console.error('Raw content:', content.substring(0, 500))
      throw new Error(`Failed to parse AI response: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  } catch (error) {
    console.error('AI command processing error:', error)
    return {
      success: false,
      message: `Failed to process command: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

export async function generateAppFromPrompt(prompt: string): Promise<AppSchema | null> {
  if (!openai) {
    console.error('OpenAI API key is not configured')
    return null
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an AI that generates complete web application schemas from user descriptions.

Generate a full app schema with:
- At least 2-3 pages with appropriate components
- Data models based on the app's needs
- Basic workflows for common actions

Return ONLY valid JSON matching the AppSchema type. Do not include markdown code blocks, just the raw JSON.`,
        },
        {
          role: 'user',
          content: `Create a web app: ${prompt}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 3000,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from AI')
    }

    try {
      const schema = parseJSONResponse(content)
    return schema
    } catch (error) {
      console.error('JSON parsing error:', error)
      console.error('Raw content:', content.substring(0, 500))
      throw new Error(`Failed to parse AI response: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  } catch (error) {
    console.error('App generation error:', error)
    return null
  }
}

export function applySchemaChanges(
  currentSchema: AppSchema,
  changes: SchemaChange[]
): AppSchema {
  let updatedSchema = { ...currentSchema }

  for (const change of changes) {
    switch (change.type) {
      case 'page':
        updatedSchema = applyPageChange(updatedSchema, change)
        break
      case 'component':
        updatedSchema = applyComponentChange(updatedSchema, change)
        break
      case 'dataModel':
        updatedSchema = applyDataModelChange(updatedSchema, change)
        break
      case 'workflow':
        updatedSchema = applyWorkflowChange(updatedSchema, change)
        break
    }
  }

  return updatedSchema
}

function applyPageChange(schema: AppSchema, change: SchemaChange): AppSchema {
  const pages = [...schema.pages]

  switch (change.action) {
    case 'create':
      pages.push(change.changes as any)
      break
    case 'update':
      const pageIndex = pages.findIndex((p) => p.id === change.target)
      if (pageIndex !== -1) {
        pages[pageIndex] = { ...pages[pageIndex], ...change.changes }
      }
      break
    case 'delete':
      const deleteIndex = pages.findIndex((p) => p.id === change.target)
      if (deleteIndex !== -1) {
        pages.splice(deleteIndex, 1)
      }
      break
  }

  return { ...schema, pages }
}

function applyComponentChange(schema: AppSchema, change: SchemaChange): AppSchema {
  const pages = schema.pages.map((page) => {
    const components = updateComponentsRecursive(page.components, change)
    return { ...page, components }
  })

  return { ...schema, pages }
}

function updateComponentsRecursive(components: any[], change: SchemaChange): any[] {
  return components.map((comp) => {
    if (comp.id === change.target) {
      switch (change.action) {
        case 'update':
          return { ...comp, ...change.changes }
        case 'delete':
          return null
        default:
          return comp
      }
    }

    if (comp.children) {
      return {
        ...comp,
        children: updateComponentsRecursive(comp.children, change),
      }
    }

    return comp
  }).filter(Boolean)
}

function applyDataModelChange(schema: AppSchema, change: SchemaChange): AppSchema {
  const dataModels = [...schema.dataModels]

  switch (change.action) {
    case 'create':
      dataModels.push(change.changes as any)
      break
    case 'update':
      const modelIndex = dataModels.findIndex((m) => m.id === change.target)
      if (modelIndex !== -1) {
        dataModels[modelIndex] = { ...dataModels[modelIndex], ...change.changes }
      }
      break
    case 'delete':
      const deleteIndex = dataModels.findIndex((m) => m.id === change.target)
      if (deleteIndex !== -1) {
        dataModels.splice(deleteIndex, 1)
      }
      break
  }

  return { ...schema, dataModels }
}

function applyWorkflowChange(schema: AppSchema, change: SchemaChange): AppSchema {
  const workflows = [...schema.workflows]

  switch (change.action) {
    case 'create':
      workflows.push(change.changes as any)
      break
    case 'update':
      const workflowIndex = workflows.findIndex((w) => w.id === change.target)
      if (workflowIndex !== -1) {
        workflows[workflowIndex] = { ...workflows[workflowIndex], ...change.changes }
      }
      break
    case 'delete':
      const deleteIndex = workflows.findIndex((w) => w.id === change.target)
      if (deleteIndex !== -1) {
        workflows.splice(deleteIndex, 1)
      }
      break
  }

  return { ...schema, workflows }
}
