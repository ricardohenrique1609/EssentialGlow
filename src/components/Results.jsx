import React, { useState, useRef, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'

function AnimatedCounter({ value, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const num = parseFloat(value)
          const duration = 1500
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(num * eased * 10) / 10)
            if (progress < 1) requestAnimationFrame(animate)
            else setCount(num)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {Number.isInteger(parseFloat(value)) ? Math.floor(count) : count.toFixed(1)}{suffix}
    </span>
  )
}

export default function Results() {
  const testimonials = [
    {
      name: 'Camila R.',
      age: 28,
      location: 'São Paulo',
      result: 'Pele muito mais firme',
      text: 'Minha pele vivia sem brilho, sem viço nenhum. Depois que comecei a seguir as dicas do Essential Glow, aprendi uma rotina simples que fez toda a diferença. Minha pele ficou muito mais hidratada e iluminada.',
      initial: 'C',
      color: 'from-rose-300 to-pink-400',
    },
    {
      name: 'Fernanda L.',
      age: 34,
      location: 'Belo Horizonte',
      result: 'Mais disposição',
      text: 'Adorei que as dicas são simples e práticas. Nunca achei que uma rotina de skincare pudesse ser tão fácil de seguir. Em poucos minutos por dia já consegui encaixar no meu dia a dia corrido.',
      initial: 'F',
      color: 'from-pink-300 to-rose-400',
    },
    {
      name: 'Juliana M.',
      age: 41,
      location: 'Rio de Janeiro',
      result: 'Glow natural',
      text: 'Com mais de 40 anos achei que seria difícil cuidar do corpo e da pele ao mesmo tempo. O programa me ensinou uma rotina simples que cabe no dia a dia e os resultados vieram com o tempo.',
      initial: 'J',
      color: 'from-rose-200 to-pink-300',
    },
  ]

  const stats = [
    { value: '94', suffix: '%', label: 'recomendam' },
    { value: '4.9', suffix: '★', label: 'avaliação' },
    { value: '5', suffix: ' min', label: 'skincare/dia' },
    { value: '10', suffix: ' min', label: 'rotina/dia' },
  ]

  return (
    <section id="resultados" className="py-14 sm:py-16 md:py-28 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #fda4af 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative 3D float image */}
      <div className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <img src="/abstract-3d.png" alt="" className="w-96 h-96 object-cover" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-5">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-16 reveal">
          <p className="text-xs font-medium text-rose-400 tracking-widest uppercase mb-2 sm:mb-3">
            Quem já começou
          </p>
          <h2 className="font-display text-[1.65rem] leading-tight sm:text-4xl md:text-5xl font-medium text-gray-800 mb-3 sm:mb-4">
            Mulheres que já{' '}
            <span className="italic text-gradient text-glow">encontraram o glow</span>
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2 sm:px-0">
            Depoimentos reais de quem seguiu o método com consistência.
          </p>
        </div>

        {/* Stats — compact horizontal strip on mobile */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-16 reveal">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl glass-card card-3d group">
              <p className="font-display text-xl sm:text-2xl md:text-4xl font-medium text-rose-500 mb-0.5 sm:mb-1 group-hover:text-gradient transition-all">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[10px] sm:text-xs font-light text-gray-400 tracking-wide leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Skincare routine image — full-width on mobile */}
        <div className="mb-8 sm:mb-10 md:mb-16 reveal-scale">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-300 to-pink-400 blur-2xl opacity-10 scale-110" />
            <div className="relative shine-overlay rounded-2xl sm:rounded-3xl overflow-hidden">
              <img
                src="/skincare-routine.png"
                alt="Rotina de skincare"
                className="w-full h-40 sm:h-52 md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Testimonials — horizontal scroll on mobile */}
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* Mobile: horizontal scroll */}
          <div className="flex md:hidden gap-3 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-5 snap-center flex-shrink-0"
                style={{ width: 'calc(85vw - 2rem)', minWidth: '280px' }}
              >
                <Quote size={18} className="text-rose-200 mb-2" />
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={11} className="fill-rose-300 text-rose-300" />
                  ))}
                </div>
                <p className="text-[13px] font-light text-gray-500 leading-relaxed mb-4 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center shadow-lg shadow-rose-200/30 flex-shrink-0`}>
                    <span className="text-white font-medium text-xs">{t.initial}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-gray-700 truncate">{t.name}</p>
                    <p className="text-[11px] font-light text-gray-400">{t.age} anos · {t.location}</p>
                  </div>
                  <span className="text-[10px] font-medium text-rose-500 bg-rose-50 px-2 py-1 rounded-full whitespace-nowrap border border-rose-100 flex-shrink-0">
                    {t.result}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: grid */}
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="hidden md:block card-3d glass-card rounded-3xl p-5 md:p-7 reveal"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <Quote size={20} className="text-rose-200 mb-3" />
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} className="fill-rose-300 text-rose-300" />
                ))}
              </div>
              <p className="text-sm font-light text-gray-500 leading-relaxed mb-5 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-2.5">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center shadow-lg shadow-rose-200/30 flex-shrink-0`}>
                  <span className="text-white font-medium text-xs">{t.initial}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{t.name}</p>
                  <p className="text-xs font-light text-gray-400">{t.age} anos · {t.location}</p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <span className="text-xs font-medium text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full whitespace-nowrap border border-rose-100">
                    {t.result}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[10px] sm:text-xs text-gray-300 font-light mt-6 sm:mt-8 px-4">
          Depoimentos de alunas reais. Resultados individuais podem variar. O conteúdo é educacional e não substitui orientação profissional.
        </p>
      </div>
    </section>
  )
}
