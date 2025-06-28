import AbstractLogger, { LEVEL, BaseLogConfig } from './logger.js';

const LOG_LEVEL = [
  {
    label: 'TRACE',
    color: '\u001b[90m',
    fill: true 
  }, {
    label: 'DEBUG',
    color: '\u001b[32m',
    fill: false
  }, {
    label: 'INFO',
    color: '\u001b[97m',
    fill: false
  }, {
    label: 'WARN',
    color: '\u001b[93m',
    fill: true
  }, {
    label: 'ERROR',
    color: '\u001b[91m',
    fill: true
  },  {
    label: 'FATAL',
    color: '\u001b[93;101m',
    fill: true
  }];

const LOG_END = '\u001b[0m';

const DEFAULT:BaseLogConfig = {
  level: 'INFO',
  showColor: false,
  showDate: true
} as const;

export default class ConsoleLogger extends AbstractLogger<BaseLogConfig> {
  constructor(tag: string, config?: BaseLogConfig) {
    super(tag, {... DEFAULT, ... config});
  }

  /* config(config: BaseLogConfig = DEFAULT): BaseLogParams {
    const c = {
      ... DEFAULT, ... config 
    };

    const params:BaseLogParams = {
      level: LEVEL[config.level],
      show: (c.showColor ? SHOW.COLOR : 0) | (c.showDate ? SHOW.DATE : 0)
    };

    return params;
  } */

  print(level: number, values: unknown[]): void {
    let line = '';
    const logLevel = LOG_LEVEL[Math.floor(level / 10)];
    for (const v of values) {
      const type = typeof(v);
      if (type === 'object') {
        if (v instanceof Error) {
          line += '\n' + v.stack;
        } else {
          line += JSON.stringify(v);
        }
      } else if (type === 'string') {
        line += v;
      } else {
        line += String(v);
      }
    }

    line = this.tag + ' - ' + line;

    if (this.config.showColor && !logLevel.fill) {
      line = ' [' + logLevel.color + logLevel.label + LOG_END + '] ' + line;
    } else {
      line = ' [' + logLevel.label + '] ' + line;
    }

    if (this.config.showDate) {
      // need to show date
      const now = new Date();
      const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ` +
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:` +
        `${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      line = date + line;
    }

    if (this.config.showColor && logLevel.fill) {
      line = logLevel.color + line + LOG_END;
    }
    if (level === LEVEL.TRACE) {
      // eslint-disable-next-line no-console
      console.log(line);
    } else if (level === LEVEL.DEBUG) {
      // eslint-disable-next-line no-console
      console.debug(line);
    } else if (level === LEVEL.INFO) {
      // eslint-disable-next-line no-console
      console.info(line);
    } else if (level === LEVEL.WARN) {
      console.warn(line);
    } else if (level === LEVEL.ERROR) {
      console.error(line);
    } else if (level === LEVEL.FATAL) {
      console.error(line);
    }
  }
}
