import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-[#6C63FF]">FounderX</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link 
              href="/dashboard" 
              className="text-gray-600 hover:text-[#6C63FF] px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="/idea-discovery" 
              className="text-gray-600 hover:text-[#6C63FF] px-3 py-2 rounded-md text-sm font-medium"
            >
              Ideas
            </Link>
            <Link 
              href="/plan-generator" 
              className="text-gray-600 hover:text-[#6C63FF] px-3 py-2 rounded-md text-sm font-medium"
            >
              Plans
            </Link>
            <Link 
              href="/mvp-builder" 
              className="text-gray-600 hover:text-[#6C63FF] px-3 py-2 rounded-md text-sm font-medium"
            >
              MVP Builder
            </Link>
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-[#6C63FF] px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-gradient-to-r from-[#6C63FF] to-[#38E4AE] text-white px-6 py-2 rounded-full text-sm font-medium hover:from-[#5A52E5] hover:to-[#32D19A] transition-all duration-200"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
