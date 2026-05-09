import React, { useEffect, useRef, useState } from 'react'
import { Sparkles, Star, ArrowDown } from 'lucide-react'

function FloatingParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 8,
    opacity: Math.random() * 0.4 + 0.1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-5%',
            background: `radial-gradient(circle, rgba(244,114,182,${p.opacity + 0.3}), rgba(249,168,212,${p.opacity}))`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const floatRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = floatRef.current
    if (el) {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setMousePos({ x, y })
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero pt-20 pb-12 sm:pb-0"
      onMouseMove={handleMouseMove}
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Animated morphing blobs — hidden on small screens for performance */}
      <div className="hidden sm:block absolute top-24 left-12 w-48 h-48 md:w-72 md:h-72 bg-rose-200/30 morph-blob blur-2xl" />
      <div className="hidden sm:block absolute bottom-32 right-12 w-56 h-56 md:w-80 md:h-80 bg-pink-200/30 morph-blob blur-2xl" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[700px] md:h-[700px] rounded-full bg-rose-100/30 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div
              ref={floatRef}
              className="inline-flex items-center gap-1.5 glass-card rounded-full px-4 py-2 sm:px-5 sm:py-2.5 mb-4 sm:mb-6 shadow-sm"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease' }}
            >
              <Sparkles size={11} className="text-rose-400 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs font-medium text-rose-500 tracking-wide">
                Dicas de skincare + autocuidado
              </span>
              <Sparkles size={11} className="text-rose-400 flex-shrink-0" />
            </div>

            {/* Headline */}
            <h1 className="font-display text-[2rem] leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl font-medium text-gray-800 sm:leading-tight mb-4 sm:mb-5">
              Descubra o segredo{' '}
              <span className="inline sm:block italic text-gradient text-glow">da pele com glow</span>
            </h1>

            {/* Subheadline */}
            <p className="text-[15px] sm:text-lg md:text-xl font-light text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-2 sm:mb-3">
              Dicas práticas de skincare e autocuidado para você aplicar no dia a dia.
              Cuide da sua pele <em className="text-rose-400 not-italic font-normal">com</em> carinho e consistência.
            </p>

            <p className="text-sm font-light text-rose-400 tracking-wide mb-6 sm:mb-8 shimmer-text inline-block">
              De dentro pra fora. Com glow. Com você. ✨
            </p>

            {/* Stars */}
            <div className="flex items-center justify-center lg:justify-start gap-1 mb-6 sm:mb-8 flex-wrap">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-rose-300 text-rose-300" />
              ))}
              <span className="ml-1.5 text-xs sm:text-sm text-gray-400 font-light">Altamente avaliado pelas alunas</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
              <a
                href="#planos"
                className="group w-full sm:w-auto bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 text-white font-medium text-sm px-8 sm:px-10 py-4 rounded-full shadow-lg shadow-rose-200/50 active:scale-95 transition-all tracking-wide min-h-[52px] flex items-center justify-center relative overflow-hidden"
              >
                <span className="relative z-10">Quero começar agora →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#metodo"
                className="text-sm font-light text-gray-400 hover:text-rose-400 transition-colors tracking-wide flex items-center gap-2 py-2"
              >
                <span>Conhecer o método</span>
                <ArrowDown size={13} className="animate-bounce" />
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap justify-center lg:justify-start sm:gap-6 text-xs text-gray-400 font-light tracking-wide">
              {[
                '🌿 Ingredientes naturais',
                '💆‍♀️ Rotinas práticas',
                '✨ Dicas de skincare',
                '📱 Acesso vitalício',
              ].map(badge => (
                <span key={badge} className="flex items-center justify-center lg:justify-start gap-1 py-1">{badge}</span>
              ))}
            </div>
          </div>

          {/* 3D Image Side */}
          <div className="order-1 lg:order-2 flex justify-center perspective-container mb-2 sm:mb-0">
            <div
              className="relative"
              style={{
                transform: `rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s ease-out',
              }}
            >
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-300 via-pink-400 to-rose-300 rounded-3xl blur-3xl opacity-25 sm:opacity-30 scale-110 glow-pulse" />

              {/* Rotating glow ring — hidden on mobile */}
              <div className="hidden sm:block absolute -inset-6 md:-inset-10 glow-ring pointer-events-none">
                <svg viewBox="0 0 400 400" className="w-full h-full opacity-20">
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#ec4899" stopOpacity="0" />
                      <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <circle cx="200" cy="200" r="180" fill="none" stroke="url(#ringGrad)" strokeWidth="2" />
                </svg>
              </div>

              {/* Main product image */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden w-56 h-56 sm:w-80 sm:h-80 md:w-96 md:h-96 hero-3d-float shine-overlay">
                <img
                  src="/hero-product.png"
                  alt="Essential Glow Skincare"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge bottom-left */}
              <div
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-6 glass-card rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-xl"
                style={{ transform: 'translateZ(60px)' }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-green-300 to-emerald-400 flex items-center justify-center">
                    <span className="text-white text-[10px] sm:text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs font-medium text-gray-700">100% Natural</p>
                    <p className="text-[9px] sm:text-[10px] text-gray-400 hidden sm:block">Ingredientes selecionados</p>
                  </div>
                </div>
              </div>

              {/* Floating badge top-right */}
              <div
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-6 glass-card rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-xl"
                style={{ transform: 'translateZ(40px)', animation: 'float 5s ease-in-out infinite' }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-sm sm:text-lg">✨</span>
                  <div>
                    <p className="text-[11px] sm:text-xs font-medium text-gray-700">+2.500</p>
                    <p className="text-[9px] sm:text-[10px] text-gray-400 hidden sm:block">Alunas transformadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40C240 70 480 10 720 40C960 70 1200 10 1440 40V80H0V40Z"
            fill="white"
            fillOpacity="0.4"
          />
          <path
            d="M0 55C240 25 480 70 720 55C960 40 1200 70 1440 55V80H0V55Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
