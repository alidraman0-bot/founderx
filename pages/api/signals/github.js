// API endpoint for GitHub signals
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Mock GitHub data - in production, integrate with GitHub API
  const githubSignals = [
    {
      title: "trending: AI-powered code review tool",
      url: "https://github.com/ai-code-review",
      stars: 1234,
      language: "Python",
      forks: 89,
      description: "Automated code review using machine learning"
    },
    {
      title: "trending: Sustainable energy monitoring platform",
      url: "https://github.com/energy-monitor",
      stars: 567,
      language: "JavaScript",
      forks: 45,
      description: "Real-time energy consumption tracking"
    },
    {
      title: "trending: Mental health tracking app",
      url: "https://github.com/mental-health-tracker",
      stars: 890,
      language: "React",
      forks: 67,
      description: "Personal mental health monitoring and insights"
    },
    {
      title: "trending: No-code form builder",
      url: "https://github.com/nocode-forms",
      stars: 234,
      language: "TypeScript",
      forks: 23,
      description: "Drag-and-drop form builder for non-technical users"
    },
    {
      title: "trending: Climate data visualization",
      url: "https://github.com/climate-viz",
      stars: 456,
      language: "Python",
      forks: 34,
      description: "Interactive climate change data visualization"
    }
  ];

  res.status(200).json(githubSignals);
}
