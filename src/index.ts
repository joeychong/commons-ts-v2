import { PlatformUtils } from './utils/platform-utils.js';
import BrowserLogger from './logger/browser-logger.js';
import ConsoleLogger from './logger/console-logger.js';
import AbstractLogger, { LogConfig, LogLevel, LEVEL as LOG_LEVEL, BaseLogConfig } from './logger/logger.js';

type Constructor<T extends AbstractLogger<C>, C extends LogConfig> = new (tag:string, params?: C) => T;

export class LogFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static Cls: Constructor<AbstractLogger<any>, any> | null = null;
  // static config: LogConfig;

  static getLogger<C extends LogConfig = BaseLogConfig>(tag: string, config?: C) : AbstractLogger<LogConfig> {
    let log: AbstractLogger<LogConfig> | null = null;
    if (this.Cls) {
      if (PlatformUtils.isBrowser()) {
        const _config = { level: localStorage.getItem('LOG_LEVEL') as LogLevel , ...config };
        // console.log(_config);
        log = new this.Cls(tag, _config);
      } else {
        const _config = { level: process.env.LOG_LEVEL as LogLevel , ...config };
        // console.log(_config);
        log = new this.Cls(tag, _config);
      }
    }

    if (!log) {
      if (PlatformUtils.isBrowser()) {
        const _config = { level: localStorage.getItem('LOG_LEVEL') as LogLevel , ...config };
        // console.log(_config);
        log = new BrowserLogger(tag, _config);
      } else {
        const _config = { level: process.env.LOG_LEVEL as LogLevel , ...config };
        // console.log(_config);
        log = new ConsoleLogger(tag, _config);
      }
    }
    return log;
  }

  /* static init<C extends LogConfig = BaseLogConfig>(config: C) {
    this.config = config;
  } */

  static setup<T extends AbstractLogger<C>, C extends LogConfig>(Cls: Constructor<T, C>) {
    this.Cls = Cls;
  }
}

export { AbstractLogger, LogConfig, PlatformUtils, LOG_LEVEL };
export { is } from './bit/logic.js';
export { DateUtils } from './date/date-utils.js';
export { toId } from './utils';
export { Lock } from './utils/lock';
export { Queue } from './collections/fifo.js';
export { base16Decode, base64Decode, toBase64, toHex } from './bit/data-codec.js';
export { generateKey, importKey, encrypt, decrypt, hmacSign, hmacVerify, deriveKey, sha256 } from './crypto';
