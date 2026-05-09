import React from 'react'
import { Sparkles } from 'lucide-react'

function FloatingParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: Math.random() * 5 + 7,
    opacity: Math.random() * 0.3 + 0.1,
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
            background: `radial-gradient(circle, rgba(255,255,255,${p.opacity + 0.4}), rgba(255,255,255,${p.opacity}))`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function CTA() {
  return (
    <section className="py-14 sm:py-16 md:py-28 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/cta-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/90 via-pink-500/85 to-rose-600/90" />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Decorative circles */}
      <div className="hidden sm:block absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 rounded-full bg-white opacity-5 -translate-x-1/2 -translate-y-1/2" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-64 h-64 md:w-[28rem] md:h-[28rem] rounded-full bg-white opacity-5 translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-5 text-center">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 sm:px-5 sm:py-2.5 mb-5 sm:mb-6 border border-white/20">
          <Sparkles size={12} className="text-white flex-shrink-0" />
          <span className="text-[11px] sm:text-xs font-medium text-white tracking-wide">
            Sua transformação começa hoje
          </span>
          <Sparkles size={12} className="text-white flex-shrink-0" />
        </div>

        <h2 className="font-display text-[1.75rem] leading-tight sm:text-4xl md:text-6xl font-medium text-white mb-4 sm:mb-5">
          Você merece uma pele{' '}
          <span className="italic block sm:inline" style={{ textShadow: '0 0 40px rgba(255,255,255,0.3)' }}>com glow</span>
        </h2>

        <p className="text-rose-100 font-light text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto px-2 sm:px-0">
          Dicas práticas de skincare e autocuidado para você aplicar no dia a dia
          — de forma simples, acessível e no seu ritmo.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-center">
          <a
            href="#planos"
            className="group w-full sm:w-auto bg-white text-rose-500 font-medium text-sm px-8 sm:px-10 py-4 rounded-full shadow-2xl active:scale-95 transition-all tracking-wide min-h-[52px] flex items-center justify-center hover:shadow-white/30 hover:-translate-y-0.5 relative overflow-hidden"
          >
            <span className="relative z-10">Quero cuidar da minha pele →</span>
            <div className="absolute inset-0 bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#resultados"
            className="w-full sm:w-auto border-2 border-white/30 text-white font-light text-sm px-8 sm:px-10 py-4 rounded-full hover:bg-white/10 transition-all tracking-wide min-h-[52px] flex items-center justify-center backdrop-blur-sm"
          >
            Ver resultados reais
          </a>
        </div>

        <p className="text-rose-200/80 text-[10px] sm:text-xs font-light mt-6 sm:mt-8 tracking-wide">
          7 dias de garantia · Acesso imediato · Conteúdo educacional
        </p>
      </div>
    </section>
  )
}
