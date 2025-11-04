import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-[#0b0c2a] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Brand + Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold text-white">Compliance</Link>
          <nav className="hidden sm:flex items-center gap-4">
            <Link to="/" className="text-sm text-white/80 hover:text-accent">Home</Link>
            <Link to="/pricing" className="text-sm text-white/80 hover:text-accent">Pricing</Link>
            <Link to="/faq" className="text-sm text-white/80 hover:text-accent">FAQ</Link>
          </nav>
        </div>

        {/* Right: Auth CTAs */}
        <div className="flex items-center gap-2">
          <Link to="/login" className="px-3 py-1 text-sm border border-white/20 rounded-md text-white hover:bg-white/10">Login</Link>
          <Link to="/signup" className="px-3 py-1 text-sm rounded-md bg-[#00e5ff] text-black hover:opacity-90">Get Started</Link>
        </div>
      </div>
    </header>
  )
}
