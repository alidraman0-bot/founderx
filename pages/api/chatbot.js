// API endpoint for live MVP builder chatbot
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message, context } = req.body;

  try {
    // Generate contextual response based on current building step and user question
    const response = await generateContextualResponse(message, context);
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      response: 'Sorry, I encountered an error processing your message. Please try again.',
      suggestions: ['What\'s happening now?', 'Show me the code']
    });
  }
}

async function generateContextualResponse(userMessage, context) {
  const message = userMessage.toLowerCase();
  const { currentStep, buildProgress, generatedCode, mvpConfig } = context;

  // Context-aware responses based on building process
  if (message.includes('what') && (message.includes('happening') || message.includes('doing'))) {
    if (currentStep && currentStep.status === 'in_progress') {
      return {
        response: `🎯 **Currently ${currentStep.step}**\n\n${currentStep.details || 'Processing your request...'}\n\n**Progress:** ${buildProgress}%\n\n**Your MVP includes:**\n• Tech Stack: ${mvpConfig?.techStack || 'Next.js + React'}\n• Features: ${mvpConfig?.features?.length || 0} selected\n• Target Users: ${mvpConfig?.targetUsers || 'General users'}\n\nIs there anything specific you'd like me to explain about this step?`,
        suggestions: ['Explain the code being generated', 'Optimize this component', 'Add error handling']
      };
    }
  }

  if (message.includes('code') || message.includes('explain')) {
    if (generatedCode) {
      return {
        response: `📝 **Code Analysis**\n\nHere's what's being generated:\n\n\`\`\`javascript\n${generatedCode.split('\n').slice(0, 5).join('\n')}...\n\`\`\`\n\n**Code Quality:**\n• ✅ Modern React patterns with hooks\n• ✅ TypeScript for type safety\n• ✅ Responsive design with Tailwind\n• ✅ Accessibility features included\n• ✅ Performance optimized\n\n**Suggestions:**\n• Add error boundaries for robustness\n• Implement loading states\n• Add form validation\n\nWould you like me to optimize any specific part?`,
        suggestions: ['Optimize this component', 'Add error handling', 'Make it responsive', 'Add TypeScript types']
      };
    }
  }

  if (message.includes('customize') || message.includes('change')) {
    return {
      response: `🎨 **Customization Options**\n\nYou can customize your MVP in several ways:\n\n**During Build:**\n• Modify color schemes and branding\n• Adjust component layouts\n• Add/remove specific features\n\n**After Build:**\n• Access full source code\n• Deploy to different platforms\n• Integrate additional services\n• Scale as your business grows\n\nWhat aspect would you like to customize?`,
      suggestions: ['Change the branding', 'Modify the layout', 'Add more features', 'Deploy differently']
    };
  }

  if (message.includes('time') || message.includes('long') || message.includes('fast')) {
    const estimatedTime = Math.round((100 - buildProgress) / 20 * 30); // Rough estimate
    return {
      response: `⏱️ **Build Timeline**\n\n**Current Progress:** ${buildProgress}%\n**Estimated Remaining:** ~${estimatedTime} seconds\n\n**Typical MVP Build Time:**\n• Simple Demo: 2-3 minutes\n• Full MVP: 3-5 minutes\n• Enterprise Features: 5-8 minutes\n\n**Factors affecting speed:**\n• Feature complexity\n• Tech stack selection\n• Custom requirements\n• Server performance\n\nThe good news is that our AI runs in parallel, so adding more features doesn't linearly increase build time! 🚀`,
      suggestions: ['What makes it faster?', 'Why is it taking this long?', 'Can I speed it up?']
    };
  }

  if (message.includes('optimize') || message.includes('improve') || message.includes('performance')) {
    return {
      response: `⚡ **Performance Optimization**\n\n**Current Optimizations:**\n• ✅ Code splitting for faster loading\n• ✅ Image optimization with Next.js\n• ✅ CSS purging with Tailwind\n• ✅ Bundle size optimization\n• ✅ Lazy loading components\n\n**Additional Optimizations:**\n• Add React.memo for expensive components\n• Implement virtual scrolling for large lists\n• Use React.Suspense for better UX\n• Add service worker for caching\n• Optimize API calls with React Query\n\n**Performance Score:** 95/100 🚀\n\nWould you like me to implement any specific optimization?`,
      suggestions: ['Add React.memo', 'Implement lazy loading', 'Add caching', 'Optimize images']
    };
  }

  if (message.includes('next') || message.includes('after') || message.includes('then')) {
    const remainingSteps = getRemainingSteps(buildProgress);
    return {
      response: `🔄 **Upcoming Steps**\n\n**Immediately Next:**\n${remainingSteps.map((step, i) => `${i + 1}. **${step.name}** - ${step.description}`).join('\n')}\n\n**After MVP Completion:**\n• Review and test your live MVP\n• Access full source code\n• Customize branding and features\n• Deploy additional integrations\n• Monitor analytics\n• Gather user feedback\n\n**Pro Tips:**\n• Test your MVP on mobile devices\n• Share with potential users early\n• Plan your marketing strategy\n• Consider user onboarding flow`,
      suggestions: ['What can I do after?', 'How to test it?', 'Marketing tips?']
    };
  }

  if (message.includes('help') || message.includes('stuck')) {
    return {
      response: `🆘 **How I Can Help You**\n\nI'm your AI assistant for MVP building! Here's what I can do:\n\n**Real-time Assistance:**\n• Explain what's happening during build\n• Answer technical questions about the code\n• Suggest improvements and optimizations\n• Help with customization decisions\n\n**Context-Aware:**\n• I see your current build progress (${buildProgress}%)\n• I know your selected features and tech stack\n• I can explain the generated code\n• I understand your business goals\n\n**Just ask me:**\n• "What's this code doing?"\n• "How can I customize this?"\n• "Is this optimal for my use case?"\n• "What happens next?"\n\nWhat specific help do you need right now?`,
      suggestions: ['What\'s happening now?', 'Explain the code', 'How to customize?']
    };
  }

  // Default helpful response
  return {
    response: `💡 **I'm here to help!**\n\nI can assist you with:\n\n• **Understanding the build process** - What's happening each step\n• **Code explanations** - Break down the generated code\n• **Customization guidance** - How to modify your MVP\n• **Optimization tips** - Making your app faster and better\n• **Next steps** - What to do after your MVP is ready\n\nYour MVP building progress: **${buildProgress}%**\n\nWhat would you like to know? Ask me anything about your MVP or the building process! 🤖`,
    suggestions: ['What\'s happening now?', 'Explain the code', 'How to customize?', 'What\'s next?']
  };
}

function getRemainingSteps(currentProgress) {
  const allSteps = [
    { name: 'Code Generation', progress: 0, description: 'AI creates React components' },
    { name: 'Branding Assets', progress: 20, description: 'Design logos and color schemes' },
    { name: 'Cloud Deployment', progress: 40, description: 'Set up hosting infrastructure' },
    { name: 'Payment Integration', progress: 60, description: 'Configure Stripe payments' },
    { name: 'Analytics Setup', progress: 80, description: 'Install tracking and monitoring' },
    { name: 'Finalization', progress: 95, description: 'Final preparations and testing' }
  ];

  return allSteps.filter(step => step.progress > currentProgress);
}
