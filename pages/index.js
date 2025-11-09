import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LandingLayout from '@/components/LandingLayout';

export default function Home() {
  return (
    <LandingLayout>
      <Head>
        <title>FounderX - Build Your Startup Faster with AI</title>
        <meta name="description" content="FounderX is your AI cofounder. From idea to MVP to investor pitch — guided like a world-class accelerator mentor." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Header */}
        <header className="relative z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">FounderX</span>
              </Link>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                  How It Works
                </Link>
                <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
              </nav>
              
              {/* CTA Buttons */}
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
              {/* Left Content */}
              <div className="text-white">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  NEW — The World&apos;s First AI Cofounder
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                  Build Your Startup<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                    Faster with AI
                  </span>
                </h1>
                
                {/* Subheadline */}
                <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
                  FounderX is your AI cofounder. From idea to MVP to investor pitch — guided like a world-class accelerator mentor.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/signup" className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Join the Beta
                  </Link>
                  <Link href="/login" className="border-2 border-white text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-indigo-700 transition-all duration-300">
                    Login
                  </Link>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                  <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-white text-xl font-semibold">AI + Founder Collaboration</p>
                      <p className="text-white/80 text-sm mt-2">Building startups together</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Do 90% of Startups Fail?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The journey from idea to successful startup is filled with common pitfalls that derail even the most promising ventures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '⏳',
                  title: 'Time Wasted',
                  description: 'Founders spend months building the wrong thing, chasing features instead of solving real problems.',
                  color: 'from-red-500 to-orange-500'
                },
                {
                  icon: '💡',
                  title: 'Lack of Guidance',
                  description: 'No access to mentors or proven playbooks leads to costly mistakes and missed opportunities.',
                  color: 'from-yellow-500 to-orange-500'
                },
                {
                  icon: '💸',
                  title: 'Funding Struggles',
                  description: 'Hard to pitch and raise capital without proper validation, metrics, and investor-ready materials.',
                  color: 'from-purple-500 to-pink-500'
                }
              ].map((problem, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${problem.color} rounded-2xl flex items-center justify-center text-2xl mb-6`}>
                    {problem.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{problem.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">Meet Your AI Cofounder</h2>
                <div className="space-y-6">
                  {[
                    'Validate your idea in days, not months',
                    'MVP roadmap with clear milestones',
                    'Investor-ready pitch decks',
                    '24/7 YC-style mentorship'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/signup" className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Start Building with FounderX
                  </Link>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8">
                  <div className="aspect-square bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-semibold">AI + Founder</p>
                      <p className="text-gray-500 text-sm">Handshake</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Everything You Need to Build, Validate, and Fundraise</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From initial idea validation to investor pitch preparation, FounderX provides comprehensive tools for startup success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '💡',
                  title: 'Idea Discovery',
                  description: 'AI-powered idea generation and validation with market research and competitor analysis.',
                  color: 'from-yellow-500 to-orange-500',
                  link: '/idea-discovery'
                },
                {
                  icon: '📊',
                  title: 'Business Planning',
                  description: 'Complete business model canvas with financial projections and go-to-market strategy.',
                  color: 'from-blue-500 to-indigo-500',
                  link: '/plan-generator'
                },
                {
                  icon: '🚀',
                  title: 'MVP Builder',
                  description: 'Step-by-step product roadmap with technical specifications and timelines.',
                  color: 'from-green-500 to-teal-500',
                  link: '/mvp-builder'
                },
                {
                  icon: '🧑‍💻',
                  title: 'Founder Guidance',
                  description: '24/7 YC-style mentorship with proven frameworks and best practices.',
                  color: 'from-purple-500 to-pink-500',
                  link: '/dashboard'
                },
                {
                  icon: '💰',
                  title: 'Investor Tools',
                  description: 'Professional pitch decks, financial models, and funding strategy guidance.',
                  color: 'from-red-500 to-pink-500',
                  link: '/launch'
                }
              ].map((feature, index) => (
                <Link key={index} href={feature.link} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group block">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">How FounderX Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Three simple steps to transform your idea into a validated, fundable startup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1️⃣',
                  title: 'Enter Your Idea',
                  description: 'Describe your startup concept, target market, and vision in simple terms.',
                  color: 'from-blue-500 to-indigo-500'
                },
                {
                  step: '2️⃣',
                  title: 'AI Generates Everything',
                  description: 'Get instant validation, market research, MVP roadmap, and pitch materials.',
                  color: 'from-indigo-500 to-purple-500'
                },
                {
                  step: '3️⃣',
                  title: 'Build & Pitch',
                  description: 'Execute your roadmap with confidence and pitch investors with professional materials.',
                  color: 'from-purple-500 to-pink-500'
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg`}>
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Progress Line */}
            <div className="hidden md:block mt-12">
              <div className="flex items-center justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-4"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Inspired by the Best in Startup Building</h2>
              <p className="text-xl text-gray-600">Built on proven methodologies from top accelerators and successful founders.</p>
            </div>

            {/* Logos */}
            <div className="flex justify-center items-center space-x-12 mb-16 opacity-60">
              {['YC', 'Techstars', 'Seedcamp', '500 Startups'].map((logo, index) => (
                <div key={index} className="text-2xl font-bold text-gray-400">{logo}</div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    SL
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Sarah L.</h4>
                    <p className="text-gray-600">Early Founder</p>
                  </div>
                </div>
                <blockquote className="text-xl text-gray-700 italic leading-relaxed">
                  &ldquo;FounderX feels like having a YC partner in your pocket. It validated my SaaS idea in a week instead of 6 months. The AI guidance was spot-on and saved me thousands in consulting fees.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Simple Plans for Every Founder</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start free and upgrade as you grow. No hidden fees, no long-term contracts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Plan</h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg text-gray-600">/month</span></div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">1 idea validation</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">1 MVP roadmap</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Community access</span>
                  </li>
                </ul>
                <Link href="/signup" className="w-full bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-200 block text-center">
                  Get Started Free
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-500 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro Plan</h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">$9<span className="text-lg text-gray-600">/month</span></div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Unlimited validations</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Unlimited roadmaps</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Pitch deck generation</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Priority support</span>
                  </li>
                </ul>
                <Link href="/signup" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 block text-center">
                  Start Pro Trial
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Be the First to Cofound with AI
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join the first wave of entrepreneurs building startups with AI. Limited beta spots available.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/signup" className="bg-white text-indigo-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Join the Beta
              </Link>
              <Link href="#contact" className="border-2 border-white text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white hover:text-indigo-700 transition-all duration-300">
                Get Updates
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-2xl font-bold text-white mb-4 md:mb-0">
                FounderX
              </div>
              <div className="flex space-x-8 text-sm">
                <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms</Link>
              </div>
            </div>
            <div className="text-center text-gray-400 text-sm mt-8">
              © 2025 FounderX. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </LandingLayout>
  );
}