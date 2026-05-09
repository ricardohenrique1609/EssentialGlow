import React from 'react'
import { Droplets, Sun, Hand, Sparkles, Heart, Leaf } from 'lucide-react'

export default function Method() {
  const part1 = [
    {
      icon: Droplets,
      title: 'Rotina de hidratação',
      desc: 'Dicas simples de hidratação para manter a pele saudável e com viço — passo a passo, do básico ao avançado.',
    },
    {
      icon: Sun,
      title: 'Proteção solar diária',
      desc: 'Entenda por que o protetor solar é a base de todo skincare e como escolher o ideal para seu tipo de pele.',
    },
    {
      icon: Sparkles,
      title: 'Limpeza e esfoliação',
      desc: 'Aprenda a limpar a pele corretamente sem agredir. Dicas de esfoliação suave para um glow natural.',
    },
  ]

  const part2 = [
    {
      icon: Hand,
      title: 'Massagens faciais',
      desc: 'Técnicas de 5 minutos que podem ajudar a ativar a circulação e deixar a pele com aparência mais iluminada.',
    },
    {
      icon: Leaf,
      title: 'Ingredientes naturais',
      desc: 'Conheça ativos naturais acessíveis encontrados em farmácias que podem contribuir para a saúde da pele.',
    },
    {
      icon: Heart,
      title: 'Autocuidado e bem-estar',
      desc: 'Dicas de hábitos simples do dia a dia que podem contribuir para uma pele mais saudável e bonita.',
    },
  ]

  return (
    <section id="programa" className="py-14 sm:py-16 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />

      <div className="hidden sm:block absolute top-20 right-0 w-48 h-48 md:w-72 md:h-72 bg-pink-200/20 morph-blob blur-2xl" />
      <div className="hidden sm:block absolute bottom-20 left-0 w-40 h-40 md:w-64 md:h-64 bg-rose-200/20 morph-blob blur-2xl" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-5">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-20 reveal">
          <p className="text-xs font-medium text-rose-400 tracking-widest uppercase mb-2 sm:mb-3">
            O programa completo
          </p>
          <h2 className="font-display text-[1.65rem] leading-tight sm:text-4xl md:text-5xl font-medium text-gray-800 mb-3 sm:mb-4">
            Sua rotina de{' '}
            <span className="italic text-gradient text-glow">skincare completa.</span>
          </h2>
          <p className="text-gray-500 font-light text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2 sm:px-0">
            Dicas práticas organizadas em um programa simples para você cuidar da pele no seu ritmo.
          </p>
        </div>

        {/* Two pillars with image in center on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-8 items-start">

          {/* Pillar 1 */}
          <div className="relative glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 overflow-hidden card-3d reveal-left">
            <div className="flex items-center gap-3 mb-5 sm:mb-6 md:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center shadow-lg shadow-rose-200/40 flex-shrink-0">
                <span className="text-white font-display font-semibold text-sm sm:text-base">1</span>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-rose-400 tracking-widest uppercase font-medium">Parte Um</p>
                <h3 className="font-display text-base sm:text-lg md:text-xl font-medium text-gray-800">Rotina Diária</h3>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {part1.map((item, i) => (
                <div key={i} className="flex gap-3 group">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center group-hover:from-rose-200 group-hover:to-pink-200 transition-all duration-300">
                    <item.icon size={15} className="text-rose-500" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[13px] sm:text-sm font-medium text-gray-700 mb-0.5">{item.title}</h4>
                    <p className="text-[12px] sm:text-sm font-light text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Corner decorations */}
            <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 rounded-tl-full bg-gradient-to-br from-rose-100/40 to-pink-100/40" />
          </div>

          {/* Center image - visible only on lg */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-6 reveal-scale">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-300 to-pink-400 rounded-3xl blur-2xl opacity-20 scale-110" />
              <div className="relative rounded-3xl overflow-hidden shine-overlay">
                <img
                  src="/ingredients.png"
                  alt="Ingredientes naturais"
                  className="w-72 h-96 object-cover rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-card rounded-xl px-4 py-3">
                    <p className="text-xs font-medium text-gray-700">🌿 Ingredientes 100% Naturais</p>
                    <p className="text-[10px] text-gray-400">Selecionados para nutrir a sua pele</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 opacity-40">
              <div className="w-px h-8 bg-gradient-to-b from-transparent to-rose-300" />
              <div className="w-2 h-2 rounded-full bg-rose-300" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="relative glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 overflow-hidden card-3d reveal-right">
            <div className="flex items-center gap-3 mb-5 sm:mb-6 md:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-200/40 flex-shrink-0">
                <span className="text-white font-display font-semibold text-sm sm:text-base">2</span>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-pink-400 tracking-widest uppercase font-medium">Parte Dois</p>
                <h3 className="font-display text-base sm:text-lg md:text-xl font-medium text-gray-800">Técnicas & Hábitos</h3>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {part2.map((item, i) => (
                <div key={i} className="flex gap-3 group">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center group-hover:from-pink-200 group-hover:to-rose-200 transition-all duration-300">
                    <item.icon size={15} className="text-pink-500" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[13px] sm:text-sm font-medium text-gray-700 mb-0.5">{item.title}</h4>
                    <p className="text-[12px] sm:text-sm font-light text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 rounded-tl-full bg-gradient-to-br from-pink-100/40 to-rose-100/40" />
          </div>
        </div>

        {/* Mobile image - visible only below lg */}
        <div className="lg:hidden flex justify-center my-6 sm:my-8 reveal-scale">
          <div className="relative w-full max-w-xs mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-300 to-pink-400 rounded-2xl blur-2xl opacity-15 scale-105" />
            <div className="relative rounded-2xl overflow-hidden shine-overlay">
              <img
                src="/ingredients.png"
                alt="Ingredientes naturais"
                className="w-full h-52 sm:h-64 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="glass-card rounded-xl px-3 py-2">
                  <p className="text-[11px] font-medium text-gray-700">🌿 Ingredientes 100% Naturais</p>
                  <p className="text-[9px] text-gray-400">Selecionados para nutrir a sua pele</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Magic combo */}
        <div className="mt-4 sm:mt-6 md:mt-14 reveal">
          <div className="bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 rounded-2xl sm:rounded-3xl p-[2px] shadow-xl sm:shadow-2xl shadow-rose-200/30">
            <div className="bg-white rounded-2xl sm:rounded-3xl px-5 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 mesh-gradient opacity-30" />
              <div className="relative z-10">
                <p className="text-[10px] sm:text-xs text-rose-400 tracking-widest uppercase font-medium mb-2 sm:mb-3">O combo mágico</p>
                <h3 className="font-display text-xl sm:text-2xl md:text-4xl font-medium text-gray-800 mb-3 sm:mb-4">
                  De dentro pra fora <span className="shimmer-text">✨</span>
                </h3>
                <p className="text-gray-500 font-light text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                  Cuidar da pele não precisa ser complicado nem caro.
                  Com as dicas certas e consistência, você pode{' '}
                  <span className="text-rose-500 font-medium">descobrir o glow natural da sua pele</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
