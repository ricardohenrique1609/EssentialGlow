import React, { useState, useEffect } from 'react'
import { Sparkles, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'O Método', href: '#metodo' },
    { label: 'O Programa', href: '#programa' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Planos', href: '#planos' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-card shadow-lg shadow-rose-100/10 border-b border-rose-100/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center shadow-lg shadow-rose-200/30 group-hover:shadow-rose-300/40 transition-all group-hover:scale-105">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-display text-lg font-medium text-rose-700 tracking-wide">
            Essential <span className="italic text-pink-500">Glow</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-light text-gray-500 hover:text-rose-500 transition-colors tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#planos"
            className="text-sm font-medium bg-gradient-to-r from-rose-400 to-pink-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-rose-200/40 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            Começar agora
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-rose-400 hover:text-rose-600 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${
        menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="glass-card border-t border-rose-100/50 px-6 py-5 flex flex-col gap-4">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-light text-gray-500 hover:text-rose-500 transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#planos"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium bg-gradient-to-r from-rose-400 to-pink-500 text-white px-6 py-3 rounded-full text-center hover:shadow-md transition-all active:scale-95"
          >
            Começar agora
          </a>
        </div>
      </div>
    </nav>
  )
}
