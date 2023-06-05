export const info = (...rest: unknown[]): void => {
  console.info(...rest);
};

export const log = (...rest: unknown[]): void => {
  console.info(...rest);
};

export const warn = (...rest: unknown[]): void => {
  console.warn(...rest);
};

export const error = (...rest: unknown[]): void => {
  console.error(...rest);
};

const loggerFunctions = {
  info,
  log,
  warn,
  error,
};

export const logger = (level: 'info' | 'log' | 'warn' | 'error', ...rest: unknown[]) => loggerFunctions[level](...rest);