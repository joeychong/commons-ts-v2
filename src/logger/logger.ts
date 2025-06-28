export const LEVEL = {
  TRACE: 0,
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40,
  FATAL: 50 
} as const;

export type LogLevel = keyof typeof LEVEL;
export interface LogConfig {
  level: LogLevel,
};

export interface BaseLogConfig extends LogConfig {
  showColor?: boolean,
  showDate?: boolean
}

export default abstract class AbstractLogger<C extends LogConfig> {
  tag: string;
  config: C;

  constructor(tag: string, config: C) {
    this.tag = tag;
    this.config = config;
  }

  trace(... values: unknown[]) {
    this.out(LEVEL.TRACE, values);
  }

  debug(... values: unknown[]) {
    this.out(LEVEL.DEBUG, values);
  }
  
  info(... values: unknown[]) {
    this.out(LEVEL.INFO, values);
  }

  warn(... values: unknown[]) {
    this.out(LEVEL.WARN, values);
  }

  error(... values: unknown[]) {
    this.out(LEVEL.ERROR, values);
  }

  fatal(... values: unknown[]) {
    this.out(LEVEL.FATAL, values);
  }

  out(level: number, values: unknown[]) {
    if (level >= LEVEL[this.config.level]) {
      this.print(level, values);
    }
  }

  abstract print(level: number, values: unknown[]) : void
}