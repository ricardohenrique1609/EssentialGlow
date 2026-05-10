// Netlify Serverless Function - cria link de checkout InfinitePay.
// Chamado pelo frontend via POST /.netlify/functions/checkout

const DEFAULT_SITE_URL = 'https://essentialglow.netlify.app'
const INFINITEPAY_HANDLE = process.env.INFINITEPAY_HANDLE || 'henrique-ricardo-d94'
const WEBHOOK_URL = process.env.INFINITEPAY_WEBHOOK_URL

const plans = {
  mensal: {
    name: 'Mensal',
    priceInCents: 999,
    description: 'Essential Glow - Plano Mensal',
  },
}

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  },
  body: JSON.stringify(body),
})

function getRequestOrigin(headers = {}) {
  const origin = headers.origin || headers.Origin

  if (origin) {
    return origin.replace(/\/$/, '')
  }

  const referer = headers.referer || headers.Referer

  if (referer) {
    try {
      return new URL(referer).origin
    } catch {
      return DEFAULT_SITE_URL
    }
  }

  return process.env.URL || DEFAULT_SITE_URL
}

async function readJsonBody(event) {
  if (!event.body) {
    return {}
  }

  return JSON.parse(event.body)
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(204, {})
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  try {
    const { planId } = await readJsonBody(event)
    const plan = plans[planId]

    if (!plan) {
      return json(400, { error: 'Plano invalido' })
    }

    const orderNsu = `EG_${planId}_${Date.now()}`
    const redirectUrl = `${getRequestOrigin(event.headers)}/sucesso.html`

    const payload = {
      handle: INFINITEPAY_HANDLE,
      redirect_url: redirectUrl,
      order_nsu: orderNsu,
      items: [
        {
          quantity: 1,
          price: plan.priceInCents,
          description: plan.description,
        },
      ],
    }

    if (WEBHOOK_URL) {
      payload.webhook_url = WEBHOOK_URL
    }

    console.log('Creating InfinitePay checkout:', JSON.stringify({
      order_nsu: payload.order_nsu,
      redirect_url: payload.redirect_url,
      handle: payload.handle,
      items: payload.items,
      has_webhook: Boolean(payload.webhook_url),
    }))

    const response = await fetch('https://api.checkout.infinitepay.io/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok || !data.url) {
      console.error('InfinitePay checkout failed:', JSON.stringify({
        status: response.status,
        data,
      }))

      return json(response.status || 502, {
        error: 'Erro na InfinitePay',
        details: data,
      })
    }

    return json(200, {
      url: data.url,
      order_nsu: orderNsu,
    })
  } catch (err) {
    console.error('Checkout error:', err)
    return json(500, {
      error: 'Erro interno',
      message: err.message,
    })
  }
}
