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

      if (!response.ok) {
        throw new Error('Failed to process AI command')
      }

      return response.json() as Promise<AIResponse>
    },
  })

  return {
    sendCommand: mutation.mutate,
    sendCommandAsync: mutation.mutateAsync,
    isProcessing: mutation.isPending,
    response: mutation.data,
    error: mutation.error,
    reset: mutation.reset,
  }
}
