# AI Web App Builder - Implementation Guide

## ✅ Completed Components

### 1. Type Definitions
- **Location**: `/types/builder.ts`
- **Contains**: AppSchema, Page, Component, DataModel, Workflow, AICommand, Template, etc.
- **Status**: ✅ Complete

### 2. Database Schema
- **Location**: `/supabase-migrations/002_builder_schema.sql`
- **Tables**: apps, ai_commands, team_members, deployments, templates, analytics_events
- **Status**: ✅ Complete (needs migration)

### 3. AI Adapter
- **Location**: `/lib/ai/adapter.ts`
- **Functions**: processAICommand, generateAppFromPrompt, applySchemaChanges
- **Status**: ✅ Complete

### 4. Custom Hooks
- **Location**: `/hooks/useAppSchema.ts`
- **Features**: Real-time updates, optimistic UI, Supabase integration
- **Status**: ✅ Complete

## 🚧 Remaining Implementation

### Core Files Structure

```
founderx/
├── pages/
│   └── builder/                    # NEW BUILDER PAGES
│       ├── dashboard.tsx           # Main dashboard - all apps
│       ├── editor/
│       │   └── [appId].tsx        # AI Builder Editor
│       ├── data.tsx               # Data tables management
│       ├── workflows.tsx          # Workflow builder
│       ├── templates.tsx          # Template library
│       ├── settings.tsx           # App settings
│       └── analytics.tsx          # Usage analytics
│
├── components/builder/            # NEW BUILDER COMPONENTS
│   ├── Sidebar.tsx               # App navigation sidebar
│   ├── AIChat.tsx                # AI command interface
│   ├── PreviewFrame.tsx          # Live app preview
│   ├── TableEditor.tsx           # Visual table editor
│   ├── WorkflowEditor.tsx        # Visual workflow builder
│   ├── TemplateCard.tsx          # Template selector
│   ├── ComponentPalette.tsx      # Drag-drop components
│   ├── PageList.tsx              # Pages sidebar
│   └── CreateAppModal.tsx        # New app creation
│
├── hooks/
│   ├── useAppSchema.ts           # ✅ DONE
│   ├── useAICommand.ts           # TODO
│   ├── useApps.ts                # TODO
│   └── useDeployment.ts          # TODO
│
├── pages/api/builder/            # NEW API ROUTES
│   ├── apps/
│   │   ├── index.ts             # List/Create apps
│   │   ├── [appId].ts           # Get/Update/Delete app
│   │   └── deploy.ts            # Deploy app
│   ├── ai/
│   │   ├── command.ts           # Process AI command
│   │   └── generate.ts          # Generate new app
│   ├── data/
│   │   └── [appId]/[table].ts  # CRUD for app tables
│   └── templates/
│       └── index.ts             # Get templates
│
└── types/
    └── builder.ts                # ✅ DONE
```

## Quick Start Implementation

### Step 1: Run Supabase Migration
```bash
# Apply the schema
supabase db push
```

### Step 2: Create Missing Hooks

**hooks/useAICommand.ts**
```typescript
import { useMutation } from '@tanstack/react-query'
import { AppSchema, AIResponse } from '@/types/builder'

export function useAICommand(appId: string) {
  const mutation = useMutation({
    mutationFn: async ({ prompt, schema }: { prompt: string; schema: AppSchema }) => {
      const response = await fetch('/api/builder/ai/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appId, prompt, schema }),
      })
      return response.json() as Promise<AIResponse>
    },
  })

  return {
    sendCommand: mutation.mutate,
    isProcessing: mutation.isPending,
    response: mutation.data,
    error: mutation.error,
  }
}
```

**hooks/useApps.ts**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/supabase-js'

export function useApps() {
  const supabase = createClientComponentClient()
  const queryClient = useQueryClient()

  const { data: apps, isLoading } = useQuery({
    queryKey: ['apps'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .order('updated_at', { ascending: false })
      if (error) throw error
      return data
    },
  })

  const createApp = useMutation({
    mutationFn: async (appData: any) => {
      const { data, error } = await supabase
        .from('apps')
        .insert([appData])
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] })
    },
  })

  const deleteApp = useMutation({
    mutationFn: async (appId: string) => {
      const { error } = await supabase.from('apps').delete().eq('id', appId)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] })
    },
  })

  return {
    apps,
    isLoading,
    createApp: createApp.mutate,
    deleteApp: deleteApp.mutate,
  }
}
```

### Step 3: Create Main Dashboard Page

**pages/builder/dashboard.tsx**
```typescript
import { useState } from 'react'
import { useApps } from '@/hooks/useApps'
import Link from 'next/link'

export default function BuilderDashboard() {
  const { apps, isLoading, createApp } = useApps()
  const [showModal, setShowModal] = useState(false)
  const [prompt, setPrompt] = useState('')

  const handleCreateApp = async () => {
    // Call AI to generate app from prompt
    const response = await fetch('/api/builder/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
    const schema = await response.json()

    createApp({
      name: prompt.substring(0, 50),
      description: prompt,
      schema,
      status: 'draft',
    })

    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Apps</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Create New App
          </button>
        </div>
      </header>

      {/* App Grid */}
      <main className="max-w-7xl mx-auto p-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {apps?.map((app) => (
              <Link
                key={app.id}
                href={`/builder/editor/${app.id}`}
                className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg">{app.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{app.description}</p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                    {app.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Create New App</h2>
            <textarea
              className="w-full border rounded-lg p-3 h-32"
              placeholder="Describe your app idea..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleCreateApp}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Generate with AI
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

### Step 4: Create API Routes

**pages/api/builder/ai/command.ts**
```typescript
import { NextApiRequest, NextApiResponse } from 'next'
import { processAICommand } from '@/lib/ai/adapter'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt, schema } = req.body
    const response = await processAICommand(prompt, schema)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: 'Failed to process command' })
  }
}
```

**pages/api/builder/ai/generate.ts**
```typescript
import { NextApiRequest, NextApiResponse } from 'next'
import { generateAppFromPrompt } from '@/lib/ai/adapter'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt } = req.body
    const schema = await generateAppFromPrompt(prompt)
    res.status(200).json(schema)
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate app' })
  }
}
```

## Next Steps

1. ✅ Types defined
2. ✅ Database schema ready
3. ✅ AI adapter complete
4. ✅ Core hook created
5. 🔄 Create remaining hooks
6. 🔄 Create dashboard page
7. 🔄 Create editor page with AI chat
8. 🔄 Create API routes
9. 🔄 Add Monaco editor integration
10. 🔄 Add component renderer
11. 🔄 Add deployment system

## Navigation Structure

Update `/pages/dashboard.js` to include link to new builder:

```tsx
<Link href="/builder/dashboard">
  <button>Go to App Builder</button>
</Link>
```

## Environment Variables

Add to `.env.local`:
```
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Key Features Summary

✅ **Completed:**
- Type system
- Database schema
- AI command processing
- Real-time schema updates
- Optimistic UI

🚧 **To Implement:**
- Dashboard UI
- Editor with AI chat
- Component renderer
- Monaco code editor integration
- Workflow visual builder
- Template library
- Deployment system

---

**Total Files Created:** 4
**Total Files Remaining:** ~20-25

The foundation is solid. The remaining work is primarily UI components and API routes following the patterns established above.
