import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@supabase/supabase-js'
import { AppSchema } from '@/types/builder'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export function useAppSchema(appId: string) {
  const queryClient = useQueryClient()
  const [realtimeChannel, setRealtimeChannel] = useState<any>(null)

  // Fetch app schema
  const { data: schema, isLoading, error } = useQuery({
    queryKey: ['app-schema', appId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('id', appId)
        .single()

      if (error) throw error
      return data.schema as AppSchema
    },
    enabled: !!appId,
  })

  // Update schema mutation
  const updateSchemaMutation = useMutation({
    mutationFn: async (updatedSchema: Partial<AppSchema>) => {
      const { data, error } = await supabase
        .from('apps')
        .update({ schema: updatedSchema, updated_at: new Date().toISOString() })
        .eq('id', appId)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onMutate: async (updatedSchema) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['app-schema', appId] })
      const previousSchema = queryClient.getQueryData(['app-schema', appId])
      queryClient.setQueryData(['app-schema', appId], updatedSchema)
      return { previousSchema }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousSchema) {
        queryClient.setQueryData(['app-schema', appId], context.previousSchema)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['app-schema', appId] })
    },
  })

  // Set up realtime subscription
  useEffect(() => {
    if (!appId) return

    const channel = supabase
      .channel(`app-${appId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'apps',
          filter: `id=eq.${appId}`,
        },
        (payload) => {
          queryClient.setQueryData(['app-schema', appId], payload.new.schema)
        }
      )
      .subscribe()

    setRealtimeChannel(channel)

    return () => {
      channel.unsubscribe()
    }
  }, [appId, queryClient])

  return {
    schema,
    isLoading,
    error,
    updateSchema: updateSchemaMutation.mutate,
    isUpdating: updateSchemaMutation.isPending,
  }
}
