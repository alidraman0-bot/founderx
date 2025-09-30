// API endpoint for Twitter/X signals
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Mock Twitter/X data - in production, integrate with X API v2
  const twitterSignals = [
    {
      title: "#AI startups are raising $50M+ rounds at record pace",
      url: "https://twitter.com/startupnews/status/123456",
      hashtags: ["#AI", "#startup", "#funding"],
      retweets: 234,
      likes: 567,
      timestamp: "1h ago"
    },
    {
      title: "Climate tech is the new fintech - investors are all in",
      url: "https://twitter.com/vcinsights/status/123457",
      hashtags: ["#climatetech", "#fintech"],
      retweets: 189,
      likes: 423,
      timestamp: "3h ago"
    },
    {
      title: "No-code tools are democratizing entrepreneurship",
      url: "https://twitter.com/nocode/status/123458",
      hashtags: ["#nocode", "#entrepreneurship"],
      retweets: 156,
      likes: 389,
      timestamp: "5h ago"
    },
    {
      title: "Mental health apps see 300% growth in enterprise adoption",
      url: "https://twitter.com/healthtech/status/123459",
      hashtags: ["#healthtech", "#mentalhealth"],
      retweets: 98,
      likes: 234,
      timestamp: "7h ago"
    },
    {
      title: "Sustainable packaging startups are the next unicorns",
      url: "https://twitter.com/greentech/status/123460",
      hashtags: ["#sustainability", "#packaging"],
      retweets: 145,
      likes: 312,
      timestamp: "9h ago"
    }
  ];

  res.status(200).json(twitterSignals);
}
