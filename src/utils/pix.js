/**
 * Generates a PIX "Copia e Cola" payload following the BRCode/EMV standard.
 * This payload can be used to generate a QR Code for PIX payments.
 */

function tlv(id, value) {
  const len = value.length.toString().padStart(2, '0')
  return `${id}${len}${value}`
}

function crc16ccitt(str) {
  let crc = 0xffff
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021
      } else {
        crc <<= 1
      }
      crc &= 0xffff
    }
  }
  return crc
}

/**
 * @param {object} options
 * @param {string} options.pixKey - The PIX key (phone, CPF, email, or random key)
 * @param {string} options.merchantName - Name of the merchant (max 25 chars)
 * @param {string} options.merchantCity - City of the merchant (max 15 chars)
 * @param {number} [options.amount] - Transaction amount (optional for static PIX)
 * @param {string} [options.txid] - Transaction ID / reference (optional, max 25 chars)
 * @returns {string} The PIX "Copia e Cola" payload
 */
export function generatePixPayload({
  pixKey,
  merchantName,
  merchantCity,
  amount,
  txid = '***',
}) {
  const gui = 'br.gov.bcb.pix'

  // Merchant Account Information (ID 26)
  const merchantAccountInfo = tlv('00', gui) + tlv('01', pixKey)

  let payload = ''
  payload += tlv('00', '01')                    // Payload Format Indicator
  payload += tlv('01', '12')                    // Point of Initiation Method (12 = one-time)
  payload += tlv('26', merchantAccountInfo)     // Merchant Account Information
  payload += tlv('52', '0000')                  // Merchant Category Code
  payload += tlv('53', '986')                   // Transaction Currency (986 = BRL)

  if (amount && amount > 0) {
    payload += tlv('54', amount.toFixed(2))     // Transaction Amount
  }

  payload += tlv('58', 'BR')                    // Country Code
  payload += tlv('59', merchantName.substring(0, 25)) // Merchant Name
  payload += tlv('60', merchantCity.substring(0, 15)) // Merchant City
  payload += tlv('62', tlv('05', txid))         // Additional Data Field

  // CRC16 placeholder (ID 63, length 04)
  payload += '6304'

  // Calculate and append CRC16
  const crc = crc16ccitt(payload)
  payload += crc.toString(16).toUpperCase().padStart(4, '0')

  return payload
}
