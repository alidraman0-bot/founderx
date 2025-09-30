export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { idea, industry, personality } = req.query;

  // Generate branding based on input
  const generateBranding = () => {
    const ideaText = (idea || '').toLowerCase();
    const industryText = (industry || '').toLowerCase();
    const personalityText = (personality || '').toLowerCase();

    // Default branding
    let branding = {
      name: "InnovateX",
      tagline: "Innovation Made Simple",
      logo: "IX",
      colors: [
        { name: "Primary Blue", hex: "#3B82F6" },
        { name: "Success Green", hex: "#10B981" },
        { name: "Warning Orange", hex: "#F59E0B" },
        { name: "Neutral Gray", hex: "#6B7280" }
      ],
      typography: "Inter (Headings), System UI (Body)",
      personality: ["Professional", "Innovative", "Reliable", "Approachable"],
      targetAudience: "Small business owners and entrepreneurs who need innovative solutions.",
      brandVoice: "Professional yet approachable, confident but not arrogant, helpful and solution-oriented."
    };

    // Customize based on industry/idea
    if (ideaText.includes('ai') || ideaText.includes('artificial intelligence')) {
      branding = {
        name: "NeuralFlow",
        tagline: "AI-Powered Solutions",
        logo: "NF",
        colors: [
          { name: "Neural Blue", hex: "#1E40AF" },
          { name: "AI Purple", hex: "#7C3AED" },
          { name: "Data Green", hex: "#059669" },
          { name: "Tech Gray", hex: "#374151" }
        ],
        typography: "JetBrains Mono (Code), Inter (UI)",
        personality: ["Cutting-edge", "Intelligent", "Precise", "Forward-thinking"],
        targetAudience: "Tech-savvy businesses looking to leverage AI for competitive advantage.",
        brandVoice: "Technical but accessible, confident in capabilities, focused on results and innovation."
      };
    }

    if (ideaText.includes('health') || ideaText.includes('wellness') || industryText.includes('health')) {
      branding = {
        name: "VitalSync",
        tagline: "Your Health, Simplified",
        logo: "VS",
        colors: [
          { name: "Health Green", hex: "#10B981" },
          { name: "Vital Blue", hex: "#3B82F6" },
          { name: "Wellness Orange", hex: "#F59E0B" },
          { name: "Pure White", hex: "#FFFFFF" }
        ],
        typography: "Poppins (Headings), Open Sans (Body)",
        personality: ["Caring", "Trustworthy", "Empowering", "Compassionate"],
        targetAudience: "Health-conscious individuals seeking personalized wellness solutions.",
        brandVoice: "Warm and supportive, evidence-based, encouraging and non-judgmental."
      };
    }

    if (ideaText.includes('sustainability') || ideaText.includes('green') || ideaText.includes('eco')) {
      branding = {
        name: "EcoFlow",
        tagline: "Sustainable Solutions",
        logo: "EF",
        colors: [
          { name: "Earth Green", hex: "#059669" },
          { name: "Sky Blue", hex: "#0EA5E9" },
          { name: "Sun Yellow", hex: "#EAB308" },
          { name: "Forest Brown", hex: "#92400E" }
        ],
        typography: "Montserrat (Headings), Source Sans Pro (Body)",
        personality: ["Eco-conscious", "Responsible", "Natural", "Purpose-driven"],
        targetAudience: "Environmentally conscious businesses and individuals committed to sustainability.",
        brandVoice: "Passionate about the environment, authentic, inspiring action and change."
      };
    }

    if (ideaText.includes('fintech') || ideaText.includes('finance') || ideaText.includes('payment')) {
      branding = {
        name: "SecureFlow",
        tagline: "Financial Freedom",
        logo: "SF",
        colors: [
          { name: "Trust Blue", hex: "#1E40AF" },
          { name: "Success Green", hex: "#059669" },
          { name: "Security Gray", hex: "#374151" },
          { name: "Premium Gold", hex: "#D97706" }
        ],
        typography: "Roboto (Headings), Lato (Body)",
        personality: ["Secure", "Trustworthy", "Professional", "Reliable"],
        targetAudience: "Small business owners and entrepreneurs seeking reliable financial solutions.",
        brandVoice: "Professional and trustworthy, transparent about security, focused on financial empowerment."
      };
    }

    if (ideaText.includes('education') || ideaText.includes('learning') || industryText.includes('education')) {
      branding = {
        name: "LearnFlow",
        tagline: "Knowledge Unleashed",
        logo: "LF",
        colors: [
          { name: "Learning Purple", hex: "#7C3AED" },
          { name: "Growth Green", hex: "#10B981" },
          { name: "Energy Orange", hex: "#F59E0B" },
          { name: "Wisdom Blue", hex: "#3B82F6" }
        ],
        typography: "Nunito (Headings), Source Sans Pro (Body)",
        personality: ["Inspiring", "Knowledgeable", "Supportive", "Engaging"],
        targetAudience: "Students, professionals, and lifelong learners seeking effective educational experiences.",
        brandVoice: "Encouraging and supportive, knowledgeable but not condescending, focused on growth and achievement."
      };
    }

    // Adjust based on personality preferences
    if (personalityText.includes('playful') || personalityText.includes('fun')) {
      branding.personality = [...branding.personality.filter(p => !['Professional', 'Serious'].includes(p)), 'Playful', 'Creative'];
      branding.brandVoice = branding.brandVoice.replace('Professional', 'Playful').replace('serious', 'fun');
    }

    if (personalityText.includes('luxury') || personalityText.includes('premium')) {
      branding.personality = [...branding.personality.filter(p => !['Approachable', 'Casual'].includes(p)), 'Luxurious', 'Exclusive'];
      branding.brandVoice = branding.brandVoice.replace('approachable', 'sophisticated').replace('casual', 'refined');
    }

    return branding;
  };

  const branding = generateBranding();

  res.status(200).json(branding);
}

