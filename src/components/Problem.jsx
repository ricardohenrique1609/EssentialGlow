import React from 'react'
import { AlertCircle, TrendingDown, Frown, Zap } from 'lucide-react'

export default function Problem() {
  const problems = [
    {
      icon: TrendingDown,
      title: 'Pele opaca e sem viço',
      desc: 'A correria do dia a dia faz você esquecer de cuidar da pele — e ela perde o brilho natural com o tempo.',
      gradient: 'from-rose-400 to-pink-500',
    },
    {
      icon: Frown,
      title: 'Rotina complicada demais',
      desc: 'Muitos produtos, muitas etapas — parece impossível manter uma rotina de skincare consistente.',
      gradient: 'from-pink-400 to-rose-500',
    },
    {
      icon: AlertCircle,
      title: 'Produtos errados',
      desc: 'Sem orientação, você acaba usando produtos que não combinam com seu tipo de pele e não vê resultados.',
      gradient: 'from-rose-500 to-pink-400',
    },
    {
      icon: Zap,
      title: 'Falta de consistência',
      desc: 'Começar e parar é o maior inimigo do skincare. Sem uma rotina simples e prática, os resultados nunca aparecem.',
      gradient: 'from-pink-500 to-rose-400',
    },
  ]

  return (
    <section id="metodo" className="py-14 sm:py-16 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/30 to-transparent" />

      {/* Decorative 3D shapes */}
      <div className="hidden md:block absolute top-20 right-10 w-32 h-32 rounded-full bg-rose-100/40 blur-2xl morph-blob" />
      <div className="hidden md:block absolute bottom-20 left-10 w-40 h-40 rounded-full bg-pink-100/30 blur-2xl morph-blob" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-5">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-16 reveal">
          <p className="text-xs font-medium text-rose-400 tracking-widest uppercase mb-2 sm:mb-3">
            A raiz do problema
          </p>
          <h2 className="font-display text-[1.65rem] leading-tight sm:text-4xl md:text-5xl font-medium text-gray-800 mb-3 sm:mb-4">
            Por que sua pele perde{' '}
            <span className="italic text-rose-400 text-glow">o brilho?</span>
          </h2>
          <p className="text-gray-500 font-light text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            A rotina corrida, produtos errados e falta de consistência afetam sua pele.
            Veja os erros mais comuns…
          </p>
        </div>

        {/* Problem cards with 3D effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-16 perspective-container">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`card-3d group relative flex gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-rose-50/80 hover:border-rose-200 transition-all duration-500 reveal`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

              <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg shadow-rose-200/30 group-hover:shadow-rose-300/40 transition-shadow`}>
                <p.icon size={18} className="text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-[15px] sm:text-base md:text-lg font-medium text-gray-700 mb-1">{p.title}</h3>
                <p className="text-[13px] sm:text-sm font-light text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image + Quote */}
        <div className="flex flex-col items-center gap-5 sm:gap-8 md:flex-row reveal-scale">
          <div className="flex-shrink-0 flex justify-center">
            <div className="img-frame-gradient">
              <img
                src="/results-woman.png"
                alt="Mulher com pele radiante"
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 object-cover"
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="glass-card rounded-2xl sm:rounded-3xl px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 max-w-lg mx-auto md:mx-0">
              <p className="font-display text-lg sm:text-xl md:text-2xl italic text-rose-600 leading-relaxed mb-2 sm:mb-3">
                "E se você pudesse ter uma pele com glow natural todos os dias?"
              </p>
              <p className="text-[13px] sm:text-sm text-gray-400 font-light">
                É isso que o Essential Glow te ajuda a descobrir — com dicas simples e práticas.
              </p>
              <div className="mt-3 sm:mt-4 flex items-center gap-2 justify-center md:justify-start">
                <div className="w-8 h-[2px] bg-gradient-to-r from-rose-300 to-pink-400 rounded-full" />
                <span className="text-xs text-rose-400 tracking-wide">Método exclusivo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
