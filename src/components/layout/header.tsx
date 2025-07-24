'use client'

export function Header() {
  return (
    <header className="flex items-center justify-between p-6 text-white relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">❤️</span>
        </div>
        <span className="text-xl font-bold">Lovable</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
        <a href="#" className="hover:text-white transition-colors">Community</a>
        <a href="#" className="hover:text-white transition-colors">Pricing</a>
        <a href="#" className="hover:text-white transition-colors">Enterprise</a>
        <a href="#" className="hover:text-white transition-colors">Learn</a>
        <a href="#" className="hover:text-white transition-colors">Launched</a>
      </nav>
      
      <div className="flex items-center gap-4">
        <button className="text-sm text-gray-300 hover:text-white transition-colors">
          Log in
        </button>
        <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
          Get started
        </button>
      </div>
    </header>
  )
} 