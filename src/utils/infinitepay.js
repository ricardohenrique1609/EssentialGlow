/**
 * InfinitePay Checkout - Links diretos
 * 
 * Cada plano tem um link de checkout fixo criado no painel da InfinitePay.
 * Mais simples, mais rápido, sem chamadas de API.
 */

const CHECKOUT_LINKS = {
  mensal: 'https://checkout.infinitepay.io/henrique-ricardo-d94/47gHsiFvIK',
  // ⚠️ Crie os links abaixo no painel da InfinitePay e cole aqui:
  anual: '',    // TODO: criar link do plano Anual (R$39,90)
  vitalicio: '', // TODO: criar link do plano Vitalício (R$59,90)
}

/**
 * Retorna a URL de checkout do plano
 * @param {string} planId - ID do plano (mensal, anual, vitalicio)
 * @returns {string|null} URL do checkout ou null se não configurado
 */
export function getCheckoutUrl(planId) {
  return CHECKOUT_LINKS[planId] || null
}
