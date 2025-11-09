import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@supabase/supabase-js'
import { AppSchema } from '@/types/builder'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export function useApps() {
  const queryClient = useQueryClient()

  // Fetch all apps
  const { data: apps, isLoading, error } = useQuery({
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

  // Create new app
  const createApp = useMutation({
    mutationFn: async (appData: {
      name: string
      description: string
      schema: AppSchema
      status?: 'draft' | 'published' | 'archived'
    }) => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('apps')
        .insert([{
          ...appData,
          user_id: user.id,
          status: appData.status || 'draft',
        }])
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] })
    },
  })

  // Update app
  const updateApp = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<AppSchema> }) => {
      const { data, error } = await supabase
        .from('apps')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] })
    },
  })

  // Delete app
  const deleteApp = useMutation({
    mutationFn: async (appId: string) => {
      const { error } = await supabase
        .from('apps')
        .delete()
        .eq('id', appId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] })
    },
  })

  return {
    apps,
    isLoading,
    error,
    createApp: createApp.mutate,
    createAppAsync: createApp.mutateAsync,
    updateApp: updateApp.mutate,
    deleteApp: deleteApp.mutate,
    isCreating: createApp.isPending,
    isUpdating: updateApp.isPending,
    isDeleting: deleteApp.isPending,
  }
}
