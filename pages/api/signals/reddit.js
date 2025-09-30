// API endpoint for Reddit signals
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Mock Reddit data - in production, integrate with Pushshift API
  const redditSignals = [
    {
      title: "Just launched my AI writing assistant - 1000 users in first week",
      url: "https://reddit.com/r/startups/comments/123456",
      subreddit: "startups",
      upvotes: 45,
      comments: 23,
      timestamp: "2h ago"
    },
    {
      title: "Revenue-based financing alternatives for SaaS startups",
      url: "https://reddit.com/r/SaaS/comments/123457",
      subreddit: "SaaS",
      upvotes: 32,
      comments: 18,
      timestamp: "4h ago"
    },
    {
      title: "Bootstrapped to $10K MRR in 6 months - here's how",
      url: "https://reddit.com/r/Entrepreneur/comments/123458",
      subreddit: "Entrepreneur",
      upvotes: 67,
      comments: 41,
      timestamp: "6h ago"
    },
    {
      title: "Mental health app for remote workers - validation results",
      url: "https://reddit.com/r/startups/comments/123459",
      subreddit: "startups",
      upvotes: 28,
      comments: 15,
      timestamp: "8h ago"
    },
    {
      title: "Sustainable packaging marketplace - early traction",
      url: "https://reddit.com/r/Entrepreneur/comments/123460",
      subreddit: "Entrepreneur",
      upvotes: 39,
      comments: 22,
      timestamp: "10h ago"
    }
  ];

  res.status(200).json(redditSignals);
}
