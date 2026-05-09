import React, { useState, useMemo, useCallback } from 'react'
import { Check, Sparkles, Shield, Clock, Infinity, ChevronRight, Copy, X, QrCode, Smartphone, ExternalLink, CreditCard, Loader2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { generatePixPayload } from '../utils/pix'
import { createCheckoutLink } from '../utils/infinitepay'

const features = [
  'Dicas completas de skincare para o dia a dia',
  'Rotinas práticas para todos os tipos de pele',
  'Guia de ingredientes naturais e acessíveis',
  'Técnicas de massagem facial (5 min/dia)',
  'Dicas de proteção solar e hidratação',
  'Conteúdo de autocuidado e bem-estar',
  'Comunidade privada de alunas',
  'Suporte via e-mail',
]

const PIX_KEY = '+5511972280314'
const MERCHANT_NAME = 'Essential Glow'
const MERCHANT_CITY = 'SAO PAULO'

const plans = [
  {
    id: 'anual',
    name: 'Anual',
    tagline: 'Economize com o plano anual',
    price: '39,90',
    amount: 39.90,
    priceInCents: 3990,
    billing: 'por ano · ~R$ 3,30/mês',
    accessNote: 'Acesso garantido por 12 meses',
    highlight: false,
    badge: null,
    extras: [
      'Bônus: Guia de colágeno natural',
    ],
    cta: 'Assinar por 1 ano',
    icon: Clock,
  },
  {
    id: 'mensal',
    name: 'Mensal',
    tagline: 'O mais escolhido pelas alunas',
    price: '9,99',
    amount: 9.99,
    priceInCents: 999,
    billing: 'por mês · cancele quando quiser',
    accessNote: 'Acesso ativo enquanto a assinatura estiver ativa',
    highlight: true,
    badge: 'Mais popular',
    extras: [],
    cta: 'Assinar agora ✨',
    icon: Sparkles,
  },
  {
    id: 'vitalicio',
    name: 'Vitalício',
    tagline: 'Pague uma vez, acesse para sempre',
    price: '59,90',
    amount: 59.90,
    priceInCents: 5990,
    billing: 'pagamento único',
    accessNote: 'Acesso ilimitado para sempre',
    highlight: false,
    badge: null,
    extras: [
      'Bônus: Desafio de 21 dias',
      'Todas as atualizações incluídas',
    ],
    cta: 'Quero acesso vitalício',
    icon: Infinity,
  },
]


const guarantees = [
  { icon: Shield, text: '7 dias de garantia' },
  { icon: Clock, text: 'Acesso imediato' },
  { icon: Sparkles, text: 'Cancele quando quiser' },
]

function PaymentModal({ plan, onClose }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)

  // Fallback PIX payload (used if InfinitePay fails)
  const pixPayload = useMemo(() => {
    return generatePixPayload({
      pixKey: PIX_KEY,
      merchantName: MERCHANT_NAME,
      merchantCity: MERCHANT_CITY,
      amount: plan.amount,
      txid: `EG${plan.id.toUpperCase()}`,
    })
  }, [plan])

  const handleInfinitePayCheckout = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const checkoutUrl = await createCheckoutLink({
        planName: plan.name,
        priceInCents: plan.priceInCents,
        planId: plan.id,
      })
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err) {
      console.error('InfinitePay checkout failed:', err)
      setError(true)
      setLoading(false)
    }
  }, [plan])

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixPayload)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 sm:p-8 text-center max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInUp 0.3s ease' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <X size={14} className="text-gray-500" />
        </button>

        {/* Header */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-200/50">
          <CreditCard size={24} className="text-white" />
        </div>

        <h3 className="font-display text-xl font-medium text-gray-800 mb-1">
          Finalizar pagamento
        </h3>
        <p className="text-sm text-gray-400 font-light mb-1">
          Plano <span className="font-medium text-rose-500">{plan.name}</span>
        </p>
        <p className="text-2xl font-display font-medium text-gray-800 mb-6">
          R$ {plan.price}
        </p>

        {!error ? (
          <>
            {/* InfinitePay Checkout Button */}
            <button
              onClick={handleInfinitePayCheckout}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-medium text-sm transition-all active:scale-95 bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-200/40 hover:shadow-rose-300/50 disabled:opacity-70 disabled:cursor-not-allowed mb-3"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Preparando checkout...
                </>
              ) : (
                <>
                  <CreditCard size={16} />
                  Pagar com Pix ou Cartão
                  <ExternalLink size={12} className="opacity-60" />
                </>
              )}
            </button>

            <p className="text-[10px] text-gray-400 font-light mb-5">
              Você será redirecionado para o checkout seguro da InfinitePay
            </p>

            {/* Security badges */}
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="flex items-center gap-1.5">
                <Shield size={12} className="text-green-500" />
                <span className="text-[10px] text-gray-400">Pagamento seguro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={12} className="text-green-500" />
                <span className="text-[10px] text-gray-400">Dados protegidos</span>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Fallback: PIX QR Code (shown when InfinitePay fails) */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3 mb-4">
              <p className="text-[11px] text-amber-600 font-medium">
                Checkout temporariamente indisponível. Use o Pix abaixo:
              </p>
            </div>

            {/* QR Code */}
            <div className="bg-white border-2 border-rose-100 rounded-2xl p-4 mb-4 inline-block mx-auto">
              <QRCodeSVG
                value={pixPayload}
                size={180}
                level="M"
                includeMargin={false}
                bgColor="#ffffff"
                fgColor="#1f2937"
              />
            </div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <Smartphone size={14} className="text-rose-400" />
              <p className="text-xs text-gray-400 font-light">
                Escaneie o QR Code com o app do seu banco
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[10px] text-gray-300 font-medium tracking-widest uppercase">ou</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Pix Copia e Cola */}
            <div className="bg-rose-50/80 border border-rose-100 rounded-2xl p-3 mb-4">
              <p className="text-[10px] text-rose-400 font-medium tracking-widest uppercase mb-1.5">Pix Copia e Cola</p>
              <p className="text-[10px] font-mono text-gray-500 break-all leading-relaxed select-all line-clamp-2 overflow-hidden">
                {pixPayload}
              </p>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopyPix}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-medium text-sm transition-all active:scale-95 mb-3 ${
                copied
                  ? 'bg-green-500 text-white shadow-lg shadow-green-200/50'
                  : 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-200/40 hover:shadow-rose-300/50'
              }`}
            >
              <Copy size={14} />
              {copied ? 'Código copiado! ✓' : 'Copiar código Pix'}
            </button>

            {/* Retry InfinitePay */}
            <button
              onClick={handleInfinitePayCheckout}
              className="w-full text-xs text-rose-400 hover:text-rose-500 font-medium py-2 transition-colors"
            >
              Tentar checkout online novamente →
            </button>

            <p className="text-[11px] text-gray-400 font-light mt-3 leading-relaxed">
              Após o pagamento via Pix, envie o comprovante por WhatsApp para receber seu acesso.
            </p>
          </>
        )}
      </div>
    </div>
  )
}


export default function Pricing() {
  // Mobile: show the Anual (highlight) plan first
  const [activePlanMobile, setActivePlanMobile] = useState('mensal')
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <>
    {selectedPlan && <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}

    <section id="planos" className="py-14 sm:py-16 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />

      <div className="hidden md:block absolute top-10 left-10 w-32 h-32 bg-rose-200/20 morph-blob blur-2xl" />
      <div className="hidden md:block absolute bottom-10 right-10 w-40 h-40 bg-pink-200/20 morph-blob blur-2xl" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-5">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-14 reveal">
          <p className="text-xs font-medium text-rose-400 tracking-widest uppercase mb-2 sm:mb-3">Planos & preços</p>
          <h2 className="font-display text-[1.65rem] leading-tight sm:text-4xl md:text-5xl font-medium text-gray-800 mb-3 sm:mb-4">
            Escolha como{' '}
            <span className="italic text-gradient text-glow">você quer começar</span>
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2 sm:px-0">
            Todos os planos dão acesso ao programa completo.
            A diferença é só o período de acesso.
          </p>
        </div>

        {/* Mobile plan selector tabs */}
        <div className="flex md:hidden gap-2 mb-4 overflow-x-auto pb-1">
          {plans.map(plan => (
            <button
              key={plan.id}
              onClick={() => setActivePlanMobile(plan.id)}
              className={`flex-1 min-w-0 text-xs font-medium py-2.5 px-3 rounded-xl transition-all ${
                activePlanMobile === plan.id
                  ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-200/40'
                  : 'bg-white/80 text-gray-500 border border-rose-100'
              }`}
            >
              {plan.name}
              {plan.badge && <span className="block text-[9px] mt-0.5 opacity-80">✨ Popular</span>}
            </button>
          ))}
        </div>

        {/* Mobile: single plan card */}
        <div className="md:hidden mb-6">
          {plans.filter(p => p.id === activePlanMobile).map(plan => {
            const PlanIcon = plan.icon
            return (
              <div
                key={plan.id}
                className={`rounded-2xl transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-rose-400 to-pink-500 shadow-xl shadow-rose-200/30'
                    : 'glass-card'
                }`}
              >
                <div className="p-5">
                  {/* Icon + Name */}
                  <div className="flex items-center gap-2 mb-1">
                    <PlanIcon size={13} className={plan.highlight ? 'text-rose-100' : 'text-rose-300'} />
                    <p className={`text-[10px] font-medium tracking-widest uppercase ${plan.highlight ? 'text-rose-100' : 'text-rose-400'}`}>
                      {plan.name}
                    </p>
                  </div>
                  <p className={`text-[13px] font-light mb-4 ${plan.highlight ? 'text-rose-100' : 'text-gray-400'}`}>
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-sm font-light ${plan.highlight ? 'text-white' : 'text-gray-500'}`}>R$</span>
                      <span className={`font-display text-4xl font-medium ${plan.highlight ? 'text-white' : 'text-gray-800'}`}>
                        {plan.price}
                      </span>
                    </div>
                    <p className={`text-[11px] font-light mt-0.5 ${plan.highlight ? 'text-rose-200' : 'text-gray-400'}`}>
                      {plan.billing}
                    </p>
                  </div>

                  {/* Access note */}
                  <p className={`text-[11px] mb-5 font-medium ${plan.highlight ? 'text-rose-100' : 'text-rose-400'}`}>
                    {plan.accessNote}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full block text-center text-sm font-medium py-3.5 rounded-xl transition-all mb-5 active:scale-95 cursor-pointer ${
                      plan.highlight
                        ? 'bg-white text-rose-500 shadow-lg'
                        : 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md shadow-rose-200/30'
                    }`}
                  >
                    {plan.cta}
                  </button>

                  <div className={`h-px mb-4 ${plan.highlight ? 'bg-rose-300/50' : 'bg-rose-100'}`} />

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight ? 'bg-rose-300/30' : 'bg-rose-50'}`}>
                          <Check size={9} className={plan.highlight ? 'text-rose-100' : 'text-rose-400'} />
                        </div>
                        <span className={`text-[13px] font-light leading-relaxed ${plan.highlight ? 'text-rose-50' : 'text-gray-500'}`}>
                          {f}
                        </span>
                      </li>
                    ))}
                    {plan.extras.map((e, j) => (
                      <li key={`extra-${j}`} className="flex items-start gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight ? 'bg-rose-200/30' : 'bg-pink-50'}`}>
                          <Sparkles size={8} className={plan.highlight ? 'text-rose-200' : 'text-pink-300'} />
                        </div>
                        <span className={`text-[13px] font-medium leading-relaxed ${plan.highlight ? 'text-white' : 'text-rose-500'}`}>
                          {e}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 md:gap-6 mb-8 md:mb-14 perspective-container">
          {plans.map((plan) => {
            const PlanIcon = plan.icon
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl transition-all duration-500 card-3d reveal ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-rose-400 to-pink-500 shadow-2xl shadow-rose-300/30 md:scale-105 z-10'
                    : 'glass-card'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-white text-rose-500 text-xs font-medium px-4 py-1.5 rounded-full shadow-lg border border-rose-100 whitespace-nowrap shimmer-text">
                      ✨ {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-1.5">
                    <PlanIcon size={14} className={plan.highlight ? 'text-rose-100' : 'text-rose-300'} />
                    <p className={`text-xs font-medium tracking-widest uppercase ${plan.highlight ? 'text-rose-100' : 'text-rose-400'}`}>
                      {plan.name}
                    </p>
                  </div>
                  <p className={`text-sm font-light mb-5 leading-relaxed ${plan.highlight ? 'text-rose-100' : 'text-gray-400'}`}>
                    {plan.tagline}
                  </p>

                  <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-sm font-light ${plan.highlight ? 'text-white' : 'text-gray-500'}`}>R$</span>
                      <span className={`font-display text-4xl md:text-5xl font-medium ${plan.highlight ? 'text-white' : 'text-gray-800'}`}>
                        {plan.price}
                      </span>
                    </div>
                    <p className={`text-xs font-light mt-0.5 ${plan.highlight ? 'text-rose-200' : 'text-gray-400'}`}>
                      {plan.billing}
                    </p>
                  </div>

                  <p className={`text-xs mb-6 font-medium ${plan.highlight ? 'text-rose-100' : 'text-rose-400'}`}>
                    {plan.accessNote}
                  </p>

                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full text-center text-sm font-medium py-4 rounded-2xl transition-all mb-6 min-h-[52px] flex items-center justify-center active:scale-95 relative overflow-hidden group cursor-pointer ${
                      plan.highlight
                        ? 'bg-white text-rose-500 hover:bg-rose-50 shadow-xl'
                        : 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-200/30 hover:shadow-rose-300/40'
                    }`}
                  >
                    <span className="relative z-10">{plan.cta}</span>
                    {!plan.highlight && (
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </button>

                  <div className={`h-px mb-5 ${plan.highlight ? 'bg-rose-300/50' : 'bg-rose-100'}`} />

                  <ul className="space-y-3">
                    {features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight ? 'bg-rose-300/30' : 'bg-rose-50'}`}>
                          <Check size={10} className={plan.highlight ? 'text-rose-100' : 'text-rose-400'} />
                        </div>
                        <span className={`text-sm font-light leading-relaxed ${plan.highlight ? 'text-rose-50' : 'text-gray-500'}`}>
                          {f}
                        </span>
                      </li>
                    ))}
                    {plan.extras.map((e, j) => (
                      <li key={`extra-${j}`} className="flex items-start gap-3">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight ? 'bg-rose-200/30' : 'bg-pink-50'}`}>
                          <Sparkles size={8} className={plan.highlight ? 'text-rose-200' : 'text-pink-300'} />
                        </div>
                        <span className={`text-sm font-medium leading-relaxed ${plan.highlight ? 'text-white' : 'text-rose-500'}`}>
                          {e}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Guarantees */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 reveal">
          {guarantees.map((g, i) => (
            <div key={i} className="flex items-center gap-1.5 sm:gap-2.5 glass-card rounded-full px-3 py-2 sm:px-5 sm:py-3">
              <g.icon size={13} className="text-rose-400 flex-shrink-0" />
              <span className="text-[11px] sm:text-sm text-gray-500 font-light">{g.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
