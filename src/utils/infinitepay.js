/**
 * InfinitePay Checkout via Netlify Function
 * 
 * Chama a serverless function que cria o link de checkout
 * via API da InfinitePay (server-side, sem CORS).
 */

/**
 * Cria um link de checkout via API InfinitePay
 * @param {object} options
 * @param {string} options.planId - ID do plano
 * @returns {Promise<string>} URL do checkout
 */
export async function createCheckoutLink({ planId }) {
  const response = await fetch('/.netlify/functions/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planId }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('Checkout error:', errorData)
    throw new Error(`Erro ao criar checkout: ${response.status}`)
  }

  const data = await response.json()

  if (!data.url) {
    throw new Error('URL de checkout não retornada')
  }

  return data.url
}
