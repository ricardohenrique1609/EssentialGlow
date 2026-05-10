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
    id: 'mensal',
    name: 'Mensal',
    tagline: 'Comece sua jornada de skincare',
    price: '9,99',
    amount: 9.99,
    priceInCents: 999,
    billing: 'por mês · cancele quando quiser',
    accessNote: 'Acesso imediato a todo o conteúdo',
    highlight: true,
    badge: 'Mais popular',
    extras: [],
    cta: 'Quero começar agora ✨',
    icon: Sparkles,
  },
]


const guarantees = [
  { icon: Shield, text: '7 dias de garantia' },
  { icon: Clock, text: 'Acesso imediato' },
  { icon: Sparkles, text: 'Cancele quando quiser' },
]

function PaymentModal({ plan, onClose }) {
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // PIX payload (fallback)
  const pixPayload = useMemo(() => {
    return generatePixPayload({
      pixKey: PIX_KEY,
      merchantName: MERCHANT_NAME,
      merchantCity: MERCHANT_CITY,
      amount: plan.amount,
      txid: `EG${plan.id.toUpperCase()}`,
    })
  }, [plan])

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = await createCheckoutLink({
        planId: plan.id,
      })
      window.location.href = url
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Não foi possível gerar o link de pagamento. Use o PIX abaixo.')
      setLoading(false)
    }
  }

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

        {/* InfinitePay Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-medium text-sm transition-all mb-3 cursor-pointer ${
            loading
              ? 'bg-gray-300 text-gray-500 cursor-wait'
              : 'active:scale-95 bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-200/40 hover:shadow-rose-300/50'
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Gerando link seguro...
            </>
          ) : (
            <>
              <CreditCard size={16} />
              Pagar com Pix ou Cartão
              <ExternalLink size={12} className="opacity-60" />
            </>
          )}
        </button>

        <p className="text-[10px] text-gray-400 font-light mb-4">
          Você será redirecionado para o checkout seguro da InfinitePay
        </p>

        {/* Error message + PIX fallback */}
        {error && (
          <div className="mb-4">
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
              {error}
            </p>

            <div className="bg-white border-2 border-rose-100 rounded-2xl p-4 mb-4 inline-block mx-auto">
              <QRCodeSVG
                value={pixPayload}
                size={160}
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

            <div className="bg-rose-50/80 border border-rose-100 rounded-2xl p-3 mb-3">
              <p className="text-[10px] text-rose-400 font-medium tracking-widest uppercase mb-1.5">Pix Copia e Cola</p>
              <p className="text-[10px] font-mono text-gray-500 break-all leading-relaxed select-all line-clamp-2 overflow-hidden">
                {pixPayload}
              </p>
            </div>

            <button
              onClick={handleCopyPix}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-medium text-sm transition-all active:scale-95 ${
                copied
                  ? 'bg-green-500 text-white shadow-lg shadow-green-200/50'
                  : 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-200/40'
              }`}
            >
              {copied ? <><Check size={14} /> Copiado!</> : <><Copy size={14} /> Copiar código Pix</>}
            </button>
          </div>
        )}

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
      </div>
    </div>
  )
}


export default function Pricing() {
  // Mobile: show the Anual (highlight) plan first
  const [activePlanMobile] = useState('mensal')
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
          <p className="text-xs font-medium text-rose-400 tracking-widest uppercase mb-2 sm:mb-3">Acesso completo</p>
          <h2 className="font-display text-[1.65rem] leading-tight sm:text-4xl md:text-5xl font-medium text-gray-800 mb-3 sm:mb-4">
            Comece sua{' '}
            <span className="italic text-gradient text-glow">jornada de skincare</span>
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2 sm:px-0">
            Acesso a todas as dicas, rotinas e conteúdos exclusivos
            por menos de R$ 0,33 por dia.
          </p>
        </div>

        {/* Single plan — centered */}
        <div className="max-w-md mx-auto mb-8 md:mb-14 reveal-scale">
          {plans.map((plan) => {
            const PlanIcon = plan.icon
            return (
              <div
                key={plan.id}
                className="relative rounded-3xl bg-gradient-to-b from-rose-400 to-pink-500 shadow-2xl shadow-rose-300/30"
              >
                <div className="p-6 sm:p-8">
                  {plan.badge && (
                    <div className="mb-5 flex justify-center">
                      <span className="inline-flex items-center justify-center bg-white/95 text-rose-500 text-xs font-medium px-4 py-1.5 rounded-full shadow-lg border border-white/60 whitespace-nowrap shimmer-text">
                        ✨ {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-1.5">
                    <PlanIcon size={14} className="text-rose-100" />
                    <p className="text-xs font-medium tracking-widest uppercase text-rose-100">
                      {plan.name}
                    </p>
                  </div>
                  <p className="text-sm font-light mb-5 leading-relaxed text-rose-100">
                    {plan.tagline}
                  </p>

                  <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-light text-white">R$</span>
                      <span className="font-display text-5xl md:text-6xl font-medium text-white">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-xs font-light mt-0.5 text-rose-200">
                      {plan.billing}
                    </p>
                  </div>

                  <p className="text-xs mb-6 font-medium text-rose-100">
                    {plan.accessNote}
                  </p>

                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className="w-full text-center text-sm font-medium py-4 rounded-2xl transition-all mb-6 min-h-[52px] flex items-center justify-center active:scale-95 bg-white text-rose-500 hover:bg-rose-50 shadow-xl cursor-pointer"
                  >
                    <span>{plan.cta}</span>
                  </button>

                  <div className="h-px mb-5 bg-rose-300/50" />

                  <ul className="space-y-3">
                    {features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-rose-300/30">
                          <Check size={10} className="text-rose-100" />
                        </div>
                        <span className="text-sm font-light leading-relaxed text-rose-50">
                          {f}
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
