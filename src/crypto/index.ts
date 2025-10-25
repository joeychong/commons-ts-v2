export async function hmacSign(alg: string, secret: Uint8Array, data: Uint8Array) : Promise<ArrayBuffer>  {
  // const keyData = new TextEncoder().encode(secret); // Encode as Uint8Array
  const key = await crypto.subtle.importKey(
    'raw',             // Format of the key
    secret,           // Key data
    { name: 'HMAC', hash: { name: alg } }, // Algorithm settings
    false,             // Not exportable
    ['sign']           // Usage: signing only
  );
  const hmac = await crypto.subtle.sign('HMAC', key, data);
  return hmac; 
}

export async function hmacVerify(alg: string, secret: Uint8Array, data: Uint8Array, signature: ArrayBuffer) : Promise<boolean>  {
  // const keyData = new TextEncoder().encode(secret); // Encode as Uint8Array
  const key = await crypto.subtle.importKey(
    'raw',             // Format of the key
    secret,           // Key data
    { name: 'HMAC', hash: { name: alg } }, // Algorithm settings
    false,             // Not exportable
    ['verify']           // Usage: signing only
  );
  const hmac = await crypto.subtle.verify('HMAC', key, signature, data);
  return hmac; 
}

type DeriveKeyConfig = {
  name: string;
  iterations: number;
  hash: string;
  keyAlg: string;
  keyLen: number;
}

const DEFAULT_DERIVE_CONFIG:DeriveKeyConfig = {
  name: 'PBKDF2',
  iterations: 100_000,
  hash: 'SHA-256',
  keyAlg: 'AES-GCM',
  keyLen: 256
};

export async function deriveKey(password: string, salt: Uint8Array, config?: Partial<DeriveKeyConfig>) {
  const { name, iterations, hash, keyAlg, keyLen } = { ...DEFAULT_DERIVE_CONFIG, ...config };
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw', 
    enc.encode(password), 
    {
      name
    },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey({
    name,
    salt,
    iterations,
    hash,
  }, keyMaterial, {
    name: keyAlg, 
    length: keyLen,
  }, false, ['encrypt', 'decrypt']);
}

export async function encrypt(
  rawDataToEncrypt: Uint8Array,
  key: CryptoKey,
  alg: string = 'AES-GCM'
): Promise<{ iv: Uint8Array; encrypted: Uint8Array }> {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM standard IV size

  const encrypted = await crypto.subtle.encrypt({
    name: alg,
    iv,
  }, key, rawDataToEncrypt);

  return {
    iv,
    encrypted: new Uint8Array(encrypted),
  };
}

export async function decrypt(
  encryptedBytes: Uint8Array,
  iv: Uint8Array,
  key: CryptoKey,
  alg: string = 'AES-GCM'
): Promise<Uint8Array> {
  const decrypted = await crypto.subtle.decrypt({
    name: alg,
    iv,
  }, key, encryptedBytes);

  return new Uint8Array(decrypted);
}

export async function importKey(raw: Uint8Array): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    'raw', raw, { 
      name: 'AES-GCM' 
    }, true, [
      'encrypt', 
      'decrypt'
    ]
  );
}

export async function generateKey() {
  return await crypto.subtle.generateKey({
    name: 'AES-GCM',
    length: 256,
  }, true, [
    'encrypt', 
    'decrypt'
  ]);
}

export async function sha256(message:string): Promise<ArrayBuffer> {
  // Encode as UTF-8
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // Hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  return hashBuffer;
}