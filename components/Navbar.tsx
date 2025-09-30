import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Idea Discovery', href: '/idea-discovery' },
  { name: 'Business Plan', href: '/business-plan' },
  { name: 'MVP Builder', href: '/mvp-builder' },
  { name: 'Branding', href: '/branding' },
  { name: 'Launch', href: '/launch' },
]

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#6C63FF] to-[#38E4AE] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FounderX</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  router.pathname === item.href
                    ? 'bg-[#6C63FF] text-white'
                    : 'text-gray-700 hover:text-[#6C63FF] hover:bg-gray-50'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-[#6C63FF] focus:outline-none focus:text-[#6C63FF]"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
