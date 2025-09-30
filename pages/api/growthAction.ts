import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { action, startupId, data } = req.body

    if (!action || !startupId) {
      return res.status(400).json({ error: 'Action and startup ID are required' })
    }

    // Simulate growth action API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock growth action responses
    const responses = {
      'reddit': {
        success: true,
        message: 'Posted to r/startups and r/webdev',
        url: 'https://reddit.com/r/startups/comments/example',
        engagement: {
          upvotes: 23,
          comments: 8,
          shares: 5
        }
      },
      'producthunt': {
        success: true,
        message: 'Submitted to ProductHunt successfully',
        url: 'https://producthunt.com/posts/example',
        status: 'pending_review'
      },
      'twitter': {
        success: true,
        message: 'Tweet thread posted successfully',
        url: 'https://twitter.com/example/status/1234567890',
        engagement: {
          likes: 45,
          retweets: 12,
          replies: 8
        }
      },
      'hackernews': {
        success: true,
        message: 'Posted to Hacker News',
        url: 'https://news.ycombinator.com/item?id=12345678',
        engagement: {
          points: 67,
          comments: 15
        }
      }
    }

    const response = responses[action as keyof typeof responses] || {
      success: false,
      message: 'Unknown action'
    }

    res.status(200).json(response)
  } catch (error) {
    console.error('Error executing growth action:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
