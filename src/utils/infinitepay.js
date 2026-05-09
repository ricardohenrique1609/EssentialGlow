/**
 * InfinitePay Checkout Integration
 * 
 * Creates payment links via InfinitePay's Checkout API.
 * The user is redirected to InfinitePay's secure checkout page
 * where they can pay via PIX or credit card.
 */

const INFINITEPAY_API = 'https://api.checkout.infinitepay.io/links'

// InfiniteTag da conta InfinitePay
const INFINITE_TAG = 'henrique-ricardo-d94'

// Where to redirect after successful payment
const REDIRECT_URL = window.location.origin + '/sucesso.html'

/**
 * Creates a checkout link via InfinitePay API
 * @param {object} options
 * @param {string} options.planName - Name of the plan
 * @param {number} options.priceInCents - Price in centavos (e.g., 990 for R$9,90)
 * @param {string} options.planId - Plan identifier for tracking
 * @returns {Promise<string>} The checkout URL
 */
export async function createCheckoutLink({ planName, priceInCents, planId }) {
  const orderNsu = `EG_${planId}_${Date.now()}`

  const payload = {
    handle: INFINITE_TAG,
    redirect_url: REDIRECT_URL,
    order_nsu: orderNsu,
    items: [
      {
        description: `Essential Glow - Plano ${planName}`,
        price: priceInCents,
        quantity: 1,
      },
    ],
  }

  try {
    const response = await fetch(INFINITEPAY_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('InfinitePay error:', errorData)
      throw new Error(`Erro ao criar link de pagamento: ${response.status}`)
    }

    const data = await response.json()
    return data.checkout_url || data.url || data.link
  } catch (error) {
    console.error('Checkout error:', error)
    throw error
  }
}
