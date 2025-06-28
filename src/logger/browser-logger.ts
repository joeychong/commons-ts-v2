import AbstractLogger, { LEVEL, BaseLogConfig } from './logger.js';

const LOG_LEVEL = [
  {
    label: 'TRACE',
  }, {
    label: 'DEBUG',
  }, {
    label: 'INFO',
  }, {
    label: 'WARN',
  }, {
    label: 'ERROR',
  },  {
    label: 'FATAL',
  }];

const DEFAULT:BaseLogConfig = {
  level: 'INFO',
  showDate: true,
  showColor: false
};

export default class BrowserLogger extends AbstractLogger<BaseLogConfig> {
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

    const logLevel = LOG_LEVEL[Math.floor(level / 10)];
    line = this.tag + ' - ' + line;
    line = '[' + logLevel.label + '] ' + line;

    if (this.config.showDate) {
      // need to show date
      const now = new Date();
      const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ` +
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:` +
        `${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      line = date + ' ' + line;
    }

    if (this.config.showColor) {
      if (level === LEVEL.TRACE) {
        // eslint-disable-next-line no-console
        console.log('%c' + line, 'color: gray; font-style: italic;');
      } else if (level === LEVEL.DEBUG) {
        // eslint-disable-next-line no-console
        console.debug('%c' + line, 'color: green;');
      } else if (level === LEVEL.INFO) {
        // eslint-disable-next-line no-console
        console.info(line);
      } else if (level === LEVEL.WARN) {
        console.warn(line);
      } else if (level === LEVEL.ERROR) {
        console.error(line);
      } else if (level === LEVEL.FATAL) {
        console.error('%c' + line, 'color: red;', '');
      }
    } else {
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
}
