# AI App Builder Hooks

Production-ready React hooks for managing the AI App Builder application state.

## Overview

These hooks provide a complete data management layer for the AI app builder, with:
- React Query integration for caching and optimistic updates
- Supabase integration for data persistence and real-time sync
- Full TypeScript support
- Error handling and loading states

## Hooks

### useAppSchema

Manages individual app schema with real-time synchronization.

**Features:**
- Fetches app schema from Supabase
- Subscribes to real-time updates via Supabase Realtime
- Optimistic UI updates with automatic rollback on error
- Schema update and replace functions

**Usage:**

```typescript
import { useAppSchema } from '@/hooks';

function AppEditor({ appId }: { appId: string }) {
  const {
    schema,
    isLoading,
    error,
    updateSchema,
    replaceSchema,
    isUpdating,
    isSubscribed
  } = useAppSchema(appId);

  const handleUpdateName = async () => {
    await updateSchema({ name: 'New App Name' });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{schema?.name}</h1>
      <p>Real-time: {isSubscribed ? 'Connected' : 'Disconnected'}</p>
      {/* Your app editor UI */}
    </div>
  );
}
```

**Options:**

```typescript
interface UseAppSchemaOptions {
  enabled?: boolean;        // Enable/disable the query (default: true)
  refetchOnMount?: boolean; // Refetch when component mounts (default: true)
}
```

**Returns:**

```typescript
interface UseAppSchemaReturn {
  schema: AppSchema | null;
  isLoading: boolean;
  error: Error | null;
  updateSchema: (updates: Partial<AppSchema>) => Promise<void>;
  replaceSchema: (newSchema: AppSchema) => Promise<void>;
  isUpdating: boolean;
  isSubscribed: boolean;
}
```

---

### useAICommand

Sends AI commands to modify the app schema.

**Features:**
- Sends prompts to AI API endpoint
- Applies schema changes optimistically
- Updates Supabase with new schema
- Maintains command history
- Automatic error handling and rollback

**Usage:**

```typescript
import { useAICommand } from '@/hooks';

function AICommandInput({ appId, currentSchema }: Props) {
  const {
    sendCommand,
    isExecuting,
    error,
    history,
    clearHistory,
    lastResponse
  } = useAICommand({
    appId,
    onSuccess: (response) => {
      console.log('Command executed:', response.message);
    },
    onError: (error) => {
      console.error('Command failed:', error);
    }
  });

  const handleSubmit = async (prompt: string) => {
    try {
      const response = await sendCommand(prompt, currentSchema);
      if (response.success) {
        console.log('Schema updated successfully');
      }
    } catch (err) {
      console.error('Failed to execute command');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Tell AI what to build..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e.currentTarget.value);
          }
        }}
        disabled={isExecuting}
      />
      {error && <p className="error">{error.message}</p>}
      <div>
        <h3>History ({history.length})</h3>
        {history.map((item) => (
          <div key={item.id}>
            <p>{item.prompt}</p>
            <small>{new Date(item.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Options:**

```typescript
interface UseAICommandOptions {
  appId: string;
  onSuccess?: (response: AIResponse) => void;
  onError?: (error: Error) => void;
}
```

**Returns:**

```typescript
interface UseAICommandReturn {
  sendCommand: (prompt: string, currentSchema?: AppSchema | null) => Promise<AIResponse>;
  isExecuting: boolean;
  error: Error | null;
  history: CommandHistoryItem[];
  clearHistory: () => void;
  lastResponse: AIResponse | null;
}
```

**Helper Functions:**

```typescript
import { applySchemaChanges } from '@/hooks';

// Apply schema changes manually
const updatedSchema = applySchemaChanges(currentSchema, changes);
```

---

### useApps

Manages the user's list of apps.

**Features:**
- Fetches all user apps from Supabase
- Create new app with optional template
- Update app metadata
- Delete app with confirmation
- Duplicate existing app
- Optimistic UI updates

**Usage:**

```typescript
import { useApps } from '@/hooks';

function AppsList() {
  const {
    apps,
    isLoading,
    error,
    createApp,
    updateApp,
    deleteApp,
    duplicateApp,
    isCreating,
    isUpdating,
    isDeleting,
    refetch
  } = useApps();

  const handleCreateApp = async () => {
    const newApp = await createApp({
      name: 'My New App',
      description: 'A great app built with AI',
      settings: {
        theme: {
          primaryColor: '#FF6B6B',
          secondaryColor: '#4ECDC4',
          fontFamily: 'Roboto, sans-serif',
        }
      }
    });
    console.log('Created app:', newApp.id);
  };

  const handleUpdateApp = async (appId: string) => {
    await updateApp({
      id: appId,
      name: 'Updated Name',
      status: 'published'
    });
  };

  const handleDeleteApp = async (appId: string) => {
    if (confirm('Are you sure you want to delete this app?')) {
      await deleteApp(appId);
    }
  };

  const handleDuplicateApp = async (appId: string) => {
    const duplicate = await duplicateApp(appId);
    console.log('Duplicated app:', duplicate.id);
  };

  if (isLoading) return <div>Loading apps...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={handleCreateApp} disabled={isCreating}>
        {isCreating ? 'Creating...' : 'Create New App'}
      </button>
      <div className="apps-grid">
        {apps.map((app) => (
          <div key={app.id} className="app-card">
            <h3>{app.name}</h3>
            <p>{app.description}</p>
            <p>Status: {app.status}</p>
            <button onClick={() => handleUpdateApp(app.id)}>
              Update
            </button>
            <button onClick={() => handleDuplicateApp(app.id)}>
              Duplicate
            </button>
            <button onClick={() => handleDeleteApp(app.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Options:**

```typescript
interface UseAppsOptions {
  enabled?: boolean; // Enable/disable the query (default: true)
  userId?: string;   // Specify user ID (default: current authenticated user)
}
```

**Returns:**

```typescript
interface UseAppsReturn {
  apps: AppSchema[];
  isLoading: boolean;
  error: Error | null;
  createApp: (input: CreateAppInput) => Promise<AppSchema>;
  updateApp: (input: UpdateAppInput) => Promise<AppSchema>;
  deleteApp: (appId: string) => Promise<void>;
  duplicateApp: (appId: string) => Promise<AppSchema>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  refetch: () => Promise<void>;
}
```

**Input Types:**

```typescript
interface CreateAppInput {
  name: string;
  description?: string;
  template?: string;
  settings?: Partial<AppSchema['settings']>;
}

interface UpdateAppInput {
  id: string;
  name?: string;
  description?: string;
  status?: 'draft' | 'published' | 'archived';
  previewImage?: string;
  settings?: Partial<AppSchema['settings']>;
}
```

## Setup Requirements

### 1. React Query Provider

Wrap your app with the QueryClientProvider:

```typescript
// app/layout.tsx or _app.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### 2. Supabase Setup

Ensure your Supabase client is configured:

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);
```

### 3. Database Schema

Required Supabase tables:

```sql
-- Apps table
CREATE TABLE apps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  pages JSONB DEFAULT '[]',
  data_models JSONB DEFAULT '[]',
  workflows JSONB DEFAULT '[]',
  settings JSONB DEFAULT '{}',
  status TEXT DEFAULT 'draft',
  preview_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Commands table
CREATE TABLE ai_commands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  prompt TEXT NOT NULL,
  intent TEXT,
  response JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_commands ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own apps"
  ON apps FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own apps"
  ON apps FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own apps"
  ON apps FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own apps"
  ON apps FOR DELETE
  USING (auth.uid() = user_id);
```

### 4. API Endpoint

Create the AI command API endpoint:

```typescript
// app/api/ai/command/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, appId, currentSchema } = await request.json();

    // Call OpenAI to process the command
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an AI that helps build web applications by modifying app schemas...',
        },
        {
          role: 'user',
          content: `Current schema: ${JSON.stringify(currentSchema)}\n\nCommand: ${prompt}`,
        },
      ],
    });

    // Parse AI response and return schema changes
    const response = {
      success: true,
      message: 'Schema updated successfully',
      changes: [], // Parse from AI response
      updatedSchema: {}, // Parse from AI response
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process AI command' },
      { status: 500 }
    );
  }
}
```

## Best Practices

1. **Error Handling**: Always handle errors from async operations
2. **Loading States**: Show loading indicators during mutations
3. **Optimistic Updates**: The hooks handle optimistic updates automatically
4. **Real-time Sync**: useAppSchema automatically syncs with Supabase Realtime
5. **Type Safety**: All hooks are fully typed with TypeScript

## Troubleshooting

**Real-time not working:**
- Ensure Supabase Realtime is enabled for your database
- Check that your table has the correct replication settings

**Authentication errors:**
- Verify the user is authenticated before using hooks
- Check Supabase Row Level Security policies

**Schema updates not persisting:**
- Check Supabase connection and credentials
- Verify database table structure matches AppSchema type
