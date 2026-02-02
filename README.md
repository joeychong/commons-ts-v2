Sure! Based on the provided `index.ts` file, here's a suggested `README.md`:

# @ebizzone/commons

This is a package that provides common utilities and functionality for various modules.

## Features

- Logging: Provides a logging framework with support for different log levels (TRACE, DEBUG, INFO, WARN, ERROR, FATAL) and customizable log configurations.
- Date Utilities: Offers a set of functions for working with dates, including formatting, parsing, and manipulation.
- Platform Utilities: Provides functions for detecting the current platform (browser or Node.js) and accessing platform-specific features.
- Crypto Utilities: Offers functions for cryptographic operations, including encryption, decryption, hashing, and key generation.
- Data Encoding: Provides functions for encoding and decoding data in different formats, such as base16 and base64.
- Utilities: Offers various utility functions, including generating IDs, working with collections, and more.

## Installation

To install the `@ebizzone/commons` package, run the following command:

```bash
npm install @ebizzone/commons
```

## Usage

### Logging

To use the logging functionality, follow these steps:

1. Import the `LogFactory` class from `@ebizzone/commons`:
   ```typescript
   import { LogFactory } from '@ebizzone/commons';
   ```

2. Set up the logging framework by calling the `setup` method and providing the desired logger class:
   ```typescript
   LogFactory.setup(BrowserLogger); // or LogFactory.setup(ConsoleLogger)
   ```

3. Get a logger instance by calling the `getLogger` method and providing a tag and optional configuration:
   ```typescript
   const log = LogFactory.getLogger('my-module', {
     level: 'INFO',
     showColor: true,
     showDate: false
   });
   ```

4. Use the logger to log messages at different log levels:
   ```typescript
   log.trace('This is a trace message');
   log.debug('This is a debug message');
   log.info('This is an info message');
   log.warn('This is a warning message');
   log.error('This is an error message');
   log.fatal('This is a fatal message');
   ```

### Date Utilities

To use the date utilities, follow these steps:

1. Import the `DateUtils` class from `@ebizzone/commons`:
   ```typescript
   import { DateUtils } from '@ebizzone/commons';
   ```

2. Use the date utility functions, such as `formatDate`, `parseDate`, and `getNow`:
   ```typescript
   const formattedDate = DateUtils.formatDate(new Date(), 'YYYY-MM-DD');
   const parsedDate = DateUtils.parseDate('2022-01-01', 'YYYY-MM-DD');
   const currentDate = DateUtils.getNow();
   ```

### Platform Utilities

To use the platform utilities, follow these steps:

1. Import the `PlatformUtils` class from `@ebizzone/commons`:
   ```typescript
   import { PlatformUtils } from '@ebizzone/commons';
   ```

2. Use the platform utility functions, such as `isBrowser`:
   ```typescript
   if (PlatformUtils.isBrowser()) {
     // Code specific to the browser
   } else {
     // Code specific to Node.js
   }
   ```

### Crypto

This module provides functions for cryptographic operations, including:

- HMAC signing and verification
- Key derivation using PBKDF2
- Encryption and decryption using AES-GCM

### HMAC Signing

To sign a message using HMAC, use the `hmacSign` function:

```typescript
import { hmacSign } from '@ebizzone/commons';

const message = 'Hello, world!';
const secret = new TextEncoder().encode('my-secret-key');
const signature = await hmacSign('SHA-256', secret, new TextEncoder().encode(message));

console.log(signature);
```

### HMAC Verification

To verify an HMAC signature, use the `hmacVerify` function:

```typescript
import { hmacVerify } from '@ebizzone/commons';

const message = 'Hello, world!';
const secret = new TextEncoder().encode('my-secret-key');
const signature = new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0]);
const isValid = await hmacVerify('SHA-256', secret, new TextEncoder().encode(message), signature);

console.log(isValid);
```

### Key Derivation

To derive a key from a password using PBKDF2, use the `deriveKey` function:

```typescript
import { deriveKey } from '@ebizzone/commons';

const password = 'my-password';
const salt = new TextEncoder().encode('my-salt');
const config = { iterations: 100000 };
const key = await deriveKey(password, salt, config);

console.log(key);
```

### Encryption

To encrypt a message using AES-GCM, use the `encrypt` function:

```typescript
import { encrypt } from '@ebizzone/commons';

const message = 'Hello, world!';
const key = await deriveKey('my-password', new TextEncoder().encode('my-salt'), { iterations: 100000 });
const { iv, encrypted } = await encrypt(new TextEncoder().encode(message), key);

console.log(iv);
console.log(encrypted);
```

### Decryption

To decrypt a message using AES-GCM, use the `decrypt` function:

```typescript
import { decrypt } from '@ebizzone/commons';

const message = 'Hello, world!';
const key = await deriveKey('my-password', new TextEncoder().encode('my-salt'), { iterations: 100000 });
const { iv, encrypted } = await encrypt(new TextEncoder().encode(message), key);
const decrypted = await decrypt(encrypted, iv, key);

console.log(decrypted);
```

Sure, here's a suggested `README.md` for each of the files you mentioned:

## data-codec.ts

This module provides functions for encoding and decoding data in different formats, including base16, base64, and hexadecimal.

### Installation

To install the `@ebizzone/commons/data-codec` package, run the following command:

```bash
npm install @ebizzone/commons/data-codec
```

### Usage

#### Base16 Encoding

To encode data in base16, use the `base16Encode` function:

```typescript
import { base16Encode } from '@ebizzone/commons/data-codec';

const data = Buffer.from('Hello, world!', 'utf8');
const encoded = base16Encode(data);

console.log(encoded);
```

#### Base16 Decoding

To decode base16-encoded data, use the `base16Decode` function:

```typescript
import { base16Decode } from '@ebizzone/commons/data-codec';

const encoded = '48656c6c6f2c20776f726c64';
const data = base16Decode(encoded);

console.log(data.toString('utf8'));
```

#### Base64 Encoding

To encode data in base64, use the `toBase64` function:

```typescript
import { toBase64 } from '@ebizzone/commons/data-codec';

const data = Buffer.from('Hello, world!', 'utf8');
const encoded = toBase64(data);

console.log(encoded);
```

#### Base64 Decoding

To decode base64-encoded data, use the `base64Decode` function:

```typescript
import { base64Decode } from '@ebizzone/commons/data-codec';

const encoded = 'SGVsbG8sIHdvcmxkIQ==';
const data = base64Decode(encoded);

console.log(data.toString('utf8'));
```

#### Hexadecimal Encoding

To encode data in hexadecimal, use the `toHex` function:

```typescript
import { toHex } from '@ebizzone/commons/data-codec';

const data = Buffer.from('Hello, world!', 'utf8');
const encoded = toHex(data);

console.log(encoded);
```

#### Hexadecimal Decoding

To decode hexadecimal-encoded data, use the `hexDecode` function:

```typescript
import { hexDecode } from '@ebizzone/commons/data-codec';

const encoded = '48656c6c6f2c20776f726c64';
const data = hexDecode(encoded);

console.log(data.toString('utf8'));
```

## logic.ts

This module provides functions for working with logic operations, including bitwise operations and logical operations.

### Installation

To install the `@ebizzone/commons/logic` package, run the following command:

```bash
npm install @ebizzone/commons/logic
```

### Usage

#### Bitwise Operations

The `is` function can be used to check if a given value has a certain set of bits:

```typescript
import { is } from '@ebizzone/commons/logic';

const value = 0b101010;
const result = is(value, 0b110);

console.log(result); // true
```

## fifo.ts

This module provides a first-in, first-out (FIFO) queue implementation.

### Installation

To install the `@ebizzone/commons/fifo` package, run the following command:

```bash
npm install @ebizzone/commons/fifo
```

### Usage

To create a new FIFO queue, use the `Queue` class:

```typescript
import Queue from '@ebizzone/commons/fifo/Queue';

const queue = new Queue<string>();

queue.enqueue('Hello');
queue.enqueue('world!');

console.log(queue.dequeue()); // 'Hello'
console.log(queue.dequeue()); // 'world!'
```

To create a stream of values from the queue, use the `stream` method:

```typescript
import Queue from '@ebizzone/commons/fifo/Queue';

const queue = new Queue<string>();

queue.enqueue('Hello');
queue.enqueue('world!');

for await (const value of queue.stream()) {
  console.log(value);
}
```

## lock.ts

This module provides a simple locking mechanism using a mutex.

### Installation

To install the `@ebizzone/commons/lock` package, run the following command:

```bash
npm install @ebizzone/commons/lock
```

### Usage

To create a new lock, use the `Lock` class:

```typescript
import Lock from '@ebizzone/commons/lock/Lock';

const lock = new Lock();

async function doSomething() {
  await lock.acquire();

  try {
    // Do something that requires exclusive access
  } finally {
    lock.release();
  }
}

doSomething().catch(console.error);
```

To create a lock with a timeout, use the `Lock` constructor with an optional `timeout` parameter:

```typescript
import Lock from '@ebizzone/commons/lock/Lock';

const lock = new Lock({ timeout: 5000 });

async function doSomething() {
  await lock.acquire();

  try {
    // Do something that requires exclusive access
  } finally {
    lock.release();
  }
}

doSomething().catch(console.error);
```

To create a lock with a custom logger, use the `Lock` constructor with an optional `logger` parameter:

```typescript
import Lock from '@ebizzone/commons/lock/Lock';

const logger = {
  info: console.log,
  warn: console.warn,
  error: console.error,
};

const lock = new Lock({ logger });

async function doSomething() {
  await lock.acquire();

  try {
    // Do something that requires exclusive access
  } finally {
    lock.release();
  }
}

doSomething().catch(console.error);
```

To create a lock with a custom name, use the `Lock` constructor with an optional `name` parameter:

```typescript
import Lock from '@ebizzone/commons/lock/Lock';

const lock = new Lock({ name: 'my-lock' });

async function doSomething() {
  await lock.acquire();

  try {
    // Do something that requires exclusive access
  } finally {
    lock.release();
  }
}

doSomething().catch(console.error);
```

To create a lock with a custom name and timeout, use the `Lock` constructor with both the `name` and `timeout` parameters:

```typescript
import Lock from '@ebizzone/commons/lock/Lock';

const lock = new Lock({ name: 'my-lock', timeout: 5000 });

async function doSomething() {
  await lock.acquire();

  try {
    // Do something that requires exclusive access
  } finally {
    lock.release();
  }
}

doSomething().catch(console.error);
```

To create a lock with a custom name and logger, use the `Lock` constructor with both the `name` and `logger` parameters:

```typescript
import Lock from '@ebizzone/commons/lock/Lock';

const logger = {
  info: console.log,
  warn: console.warn,
  error: console.error,
};

const lock = new Lock({ name: 'my-lock', logger });

async function doSomething() {
  await lock.acquire();

  try {
    // Do something that requires exclusive access
  } finally {
    lock.release();
  }
}

doSomething().catch(console.error);
```

# `@ebizzone/commons/utils`

This module provides utility functions for various tasks.

## `toId(value, config)`

This function generates a unique ID from a given input string. It removes any non-alphanumeric characters and converts the string to lowercase.

### Parameters

- `value` (string): The input string to generate the ID from.
- `config` (object): An optional configuration object with the following properties:
  - `maxLength` (number): The maximum length of the generated ID. Defaults to `0`.

### Returns

- (string): The generated ID.

### Example

```typescript
import { toId } from '@ebizzone/commons/utils';

const value = 'Hello, World!';
const config = { maxLength: 10 };
const id = toId(value, config);

console.log(id); // 'hello_world'
```

