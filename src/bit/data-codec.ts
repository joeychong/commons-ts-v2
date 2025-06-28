/**
 * Converts a Uint8Array to a hex string.
 *
 * @param {Uint8Array} buffer The input buffer to encode.
 * @returns {string} The hex encoded string.
 */
export function toHex(buffer: Uint8Array) {
  return Array.from(buffer).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Converts a Uint8Array to a base64 string.
 *
 * @param {Uint8Array} buffer The input buffer to encode.
 * @returns {string} The base64 encoded string.
 */

export function toBase64(buffer: Uint8Array) {
  let s = '';
  for (let i = 0; i < buffer.length; i ++) {
    s += String.fromCharCode(buffer[i]);
  }

  return btoa(s);
}

/**
 * Converts a base64 string to a Uint8Array.
 *
 * @param {string} base64 The base64 string to decode.
 * @returns {Uint8Array} The decoded Uint8Array.
 */
export function base64Decode(base64: string): Uint8Array {
  const binary = atob(base64);
  const length = binary.length;
  const uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i ++) {
    uint8Array[i] = binary.charCodeAt(i);
  }

  return uint8Array;
}

/**
 * Converts a hex string to a Uint8Array.
 *
 * @param {string} hex
 * @returns {Uint8Array}
 * @throws {Error} If the hex string has an odd length.
 */
export function base16Decode(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error('Hex string must have an even length');
  }
  
  const length = hex.length / 2;
  const uint8Array = new Uint8Array(length);
  
  for (let i = 0; i < length; i++) {
    const offset = i * 2;
    uint8Array[i] = parseInt(hex.substring(offset, offset + 2), 16);
  }
  
  return uint8Array;
}