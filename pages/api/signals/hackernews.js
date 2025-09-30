// API endpoint for Hacker News signals
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Mock Hacker News data - in production, integrate with official HN API
  const hackerNewsSignals = [
    {
      title: "Show HN: AI that writes better code than me - built with GPT-4",
      url: "https://news.ycombinator.com/item?id=123456",
      score: 234,
      timestamp: "1h ago",
      type: "Show HN"
    },
    {
      title: "Ask HN: What's the next big thing in fintech after BNPL?",
      url: "https://news.ycombinator.com/item?id=123457",
      score: 189,
      timestamp: "3h ago",
      type: "Ask HN"
    },
    {
      title: "Launch HN: Sustainable energy monitoring platform for homes",
      url: "https://news.ycombinator.com/item?id=123458",
      score: 156,
      timestamp: "5h ago",
      type: "Launch HN"
    },
    {
      title: "Tell HN: Built a no-code tool in 3 months, now at $10K MRR",
      url: "https://news.ycombinator.com/item?id=123459",
      score: 98,
      timestamp: "7h ago",
      type: "Tell HN"
    },
    {
      title: "Ask HN: How do you validate startup ideas before building?",
      url: "https://news.ycombinator.com/item?id=123460",
      score: 145,
      timestamp: "9h ago",
      type: "Ask HN"
    }
  ];

  res.status(200).json(hackerNewsSignals);
}
