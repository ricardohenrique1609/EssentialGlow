/**
 * InfinitePay Checkout - Links diretos
 * 
 * Cada plano tem um link de checkout fixo criado no painel da InfinitePay.
 */

const CHECKOUT_LINKS = {
  mensal: 'https://checkout.infinitepay.io/henrique-ricardo-d94/47gHsiFvIK',
}

/**
 * Retorna a URL de checkout do plano
 * @param {string} planId - ID do plano (mensal)
 * @returns {string|null} URL do checkout ou null se não configurado
 */
export function getCheckoutUrl(planId) {
  return CHECKOUT_LINKS[planId] || null
}
