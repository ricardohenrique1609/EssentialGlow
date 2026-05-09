import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const faqs = [
    {
      q: 'Preciso ter experiência com skincare?',
      a: 'Não! O conteúdo foi criado para qualquer nível. Ensinamos tudo do zero — passo a passo, sem pressupor nenhum conhecimento anterior de skincare.',
    },
    {
      q: 'Quanto tempo por dia precisarei dedicar?',
      a: 'A rotina de skincare sugerida leva em torno de 5 a 10 minutos por dia. Dá pra encaixar facilmente na sua rotina matinal ou noturna.',
    },
    {
      q: 'Precisa comprar produtos de skincare caros?',
      a: 'Não. Ensinamos a montar uma rotina eficiente com produtos acessíveis, encontrados em farmácias. O programa foca em hábitos e técnicas, não em marcas específicas.',
    },
    {
      q: 'O conteúdo substitui acompanhamento dermatológico?',
      a: 'Não, e nunca prometemos isso. O Essential Glow é um conteúdo educacional com dicas gerais de skincare e autocuidado. Se você tem condições de pele específicas, recomendamos sempre consultar um dermatologista.',
    },
    {
      q: 'As dicas funcionam para qualquer idade?',
      a: 'As dicas são gerais e aplicáveis para qualquer mulher adulta. Dito isso, cada pele é diferente, e os resultados podem variar conforme tipo de pele, rotina e características individuais.',
    },
    {
      q: 'E se eu não gostar? Tem garantia?',
      a: 'Sim! 7 dias de garantia total. Se por qualquer motivo você não ficar satisfeita dentro desse período, devolvemos 100% do investimento — sem burocracia.',
    },
    {
      q: 'Qual a diferença entre os planos?',
      a: 'O conteúdo é o mesmo em todos os planos. A diferença é o período de acesso: no Mensal você paga todo mês e pode cancelar quando quiser; no Anual paga uma vez por ano; no Vitalício paga uma única vez e acessa para sempre — além de levar os bônus exclusivos.',
    },
    {
      q: 'Como funciona o acesso ao programa?',
      a: 'Após a compra, você recebe acesso imediato à área de membros, disponível pelo navegador em qualquer dispositivo — computador, tablet ou celular. Todo o conteúdo fica disponível para consumir no seu ritmo.',
    },
  ]

  return (
    <section className="py-14 sm:py-16 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="hidden md:block absolute top-20 right-10 w-32 h-32 bg-rose-100/30 morph-blob blur-2xl" />
      <div className="hidden md:block absolute bottom-20 left-10 w-28 h-28 bg-pink-100/30 morph-blob blur-2xl" style={{ animationDelay: '5s' }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-5 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-14 reveal">
          <p className="text-xs font-medium text-rose-400 tracking-widest uppercase mb-2 sm:mb-3">Dúvidas frequentes</p>
          <h2 className="font-display text-[1.65rem] leading-tight sm:text-4xl font-medium text-gray-800">
            Perguntas <span className="italic text-gradient text-glow">&amp; respostas</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-2 sm:space-y-3 reveal">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl sm:rounded-2xl border transition-all duration-500 overflow-hidden ${
                open === i
                  ? 'border-rose-200 bg-gradient-to-br from-rose-50/80 to-pink-50/50 shadow-md sm:shadow-lg shadow-rose-100/20'
                  : 'border-gray-100 bg-white hover:border-rose-100 hover:shadow-sm'
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-4 py-3.5 sm:px-5 sm:py-5 text-left gap-3 sm:gap-4 min-h-[56px] sm:min-h-[64px] group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`text-[13px] sm:text-sm font-medium leading-snug transition-colors duration-300 ${
                  open === i ? 'text-rose-600' : 'text-gray-700 group-hover:text-rose-500'
                }`}>
                  {faq.q}
                </span>
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  open === i
                    ? 'bg-rose-400 rotate-180'
                    : 'bg-rose-50 group-hover:bg-rose-100'
                }`}>
                  <ChevronDown
                    size={13}
                    className={`transition-colors duration-300 ${
                      open === i ? 'text-white' : 'text-rose-400'
                    }`}
                  />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  open === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                  <div className="w-8 h-[2px] bg-gradient-to-r from-rose-300 to-pink-400 rounded-full mb-2 sm:mb-3" />
                  <p className="text-[12px] sm:text-sm font-light text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
