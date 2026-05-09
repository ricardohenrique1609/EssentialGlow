import React from 'react'
import { Sparkles, Instagram, Youtube, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const links = {
    Programa: ['O Método', 'Skincare', 'Autocuidado', 'Resultados'],
    Empresa: ['Sobre nós', 'Blog', 'Afiliados', 'Imprensa'],
    Suporte: ['FAQ', 'Contato', 'Comunidade', 'Aulas ao vivo'],
    Legal: ['Termos de uso', 'Privacidade', 'Cookies', 'Reembolsos'],
  }

  return (
    <footer className="bg-gradient-to-b from-white to-rose-50/50 border-t border-rose-50 relative overflow-hidden">
      <div className="hidden md:block absolute bottom-0 right-0 w-64 h-64 bg-rose-100/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-5 py-10 sm:py-12 md:py-16 relative z-10">
        {/* Brand + Social */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center shadow-lg shadow-rose-200/30">
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="font-display text-base sm:text-lg font-medium text-rose-700">
              Essential <span className="italic text-pink-500">Glow</span>
            </span>
          </div>
          <p className="text-[13px] sm:text-sm font-light text-gray-400 leading-relaxed mb-4 sm:mb-5 max-w-xs">
            Dicas de skincare e autocuidado para uma pele com glow natural. Cuide da sua essência.
          </p>
          <div className="flex gap-2.5 sm:gap-3">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Youtube, label: 'YouTube' },
              { Icon: Mail, label: 'Email' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-rose-400 hover:border-rose-200 transition-all hover:scale-110 hover:shadow-lg hover:shadow-rose-100/30"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Links — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-[10px] sm:text-xs font-medium text-gray-600 tracking-widest uppercase mb-3 sm:mb-4">{category}</p>
              <ul className="space-y-2 sm:space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[13px] sm:text-sm font-light text-gray-400 hover:text-rose-400 transition-colors relative group">
                      {item}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-rose-300 transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-7 mb-6 sm:mb-8">
          <p className="text-[13px] sm:text-sm font-medium text-gray-700 mb-0.5 sm:mb-1">Receba dicas de glow toda semana</p>
          <p className="text-[11px] sm:text-xs font-light text-gray-400 mb-3 sm:mb-4">Skincare, autocuidado e bem-estar no seu e-mail, de graça.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="seu@email.com"
              className="text-sm font-light border border-rose-100 rounded-xl px-4 py-3 flex-1 min-w-0 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all bg-white"
            />
            <button className="text-sm font-medium bg-gradient-to-r from-rose-400 to-pink-500 text-white px-6 py-3 rounded-xl transition-all flex-shrink-0 active:scale-95 hover:shadow-lg hover:shadow-rose-200/40 hover:-translate-y-0.5">
              Quero!
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 pt-5 sm:pt-6 border-t border-rose-100/50">
          <p className="text-[11px] sm:text-xs font-light text-gray-400">
            © 2025 Essential Glow. Todos os direitos reservados.
          </p>
          <p className="text-[11px] sm:text-xs font-light text-gray-300 flex items-center gap-1">
            Feito com <Heart size={9} className="text-rose-400 fill-rose-400" /> e muito glow ✨
          </p>
        </div>
      </div>
    </footer>
  )
}
