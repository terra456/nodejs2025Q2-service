import { appendFile } from 'node:fs/promises';
import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements LoggerService {
  constructor() {}
  log(message: any, context?: string) {
    const now = new Date();
    const fileDate = `data/log.${now.toLocaleDateString('ru-RU')}.txt`;
    console.log(fileDate);
    appendFile(
      fileDate,
      `[LOG - ${now.toLocaleString('en-GB', { timeZone: 'UTC' })}] [Request ID: ${context ? `[${context}] ` : ''}] \n${JSON.stringify(message)}\n\n`,
    );
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any) {
    const now = new Date();
    appendFile(
      'data/log-error.txt',
      `[FATAL - ${now.toLocaleString('en-GB', { timeZone: 'UTC' })}]\n${JSON.stringify(message)}\n\n`,
    );
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any) {
    const now = new Date();
    appendFile(
      'data/log-error.txt',
      `[ERROR - ${now.toLocaleString('en-GB', { timeZone: 'UTC' })}]\n${JSON.stringify(message)}\n\n`,
    );
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any) {
    const now = new Date();
    appendFile(
      'data/log-error.txt',
      `[WARN - ${now.toLocaleString('en-GB', { timeZone: 'UTC' })}]\n${JSON.stringify(message)}\n\n`,
    );
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any) {
    const now = new Date();
    appendFile(
      'data/log-debug.txt',
      `[DEBUG - ${now.toLocaleString('en-GB', { timeZone: 'UTC' })}]\n${JSON.stringify(message)}\n\n`,
    );
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any) {
    const now = new Date();
    appendFile(
      'data/log-debug.txt',
      `[VEBROSE - ${now.toLocaleString('en-GB', { timeZone: 'UTC' })}]\n${JSON.stringify(message)}\n\n`,
    );
  }
}
