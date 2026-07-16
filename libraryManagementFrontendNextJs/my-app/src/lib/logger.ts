// RESPONSIBILITY: Centralized logging utility providing sanitized, environment-aware log handling to prevent Log Injection vulnerabilities.
// DATA FLOW: Application Components -> logger -> Console / Monitoring Service

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

/**
 * Sanitizes input values to prevent log injection attacks (e.g. CRLF injection, raw unhandled object dumps).
 */
function sanitizeLogInput(input: unknown): string {
  if (typeof input === 'string') {
    // Strip control characters, newlines, and carriage returns to prevent log spoofing/injection
    return input.replace(/[\r\n\t]+/g, ' ').slice(0, 1000);
  }
  if (input instanceof Error) {
    const message = input.message ? input.message.replace(/[\r\n\t]+/g, ' ') : 'Unknown Error';
    return `[Error: ${message}]`;
  }
  if (typeof input === 'object' && input !== null) {
    try {
      const serialized = JSON.stringify(input);
      return serialized.replace(/[\r\n\t]+/g, ' ').slice(0, 1000);
    } catch {
      return '[Unserializable Object]';
    }
  }
  return String(input);
}

class Logger {
  private log(level: LogLevel, message: string, ...optionalParams: unknown[]): void {
    const isProd = process.env.NODE_ENV === 'production';

    if (isProd && level === 'debug') {
      return;
    }

    const sanitizedMessage = sanitizeLogInput(message);
    const sanitizedParams = optionalParams.map(sanitizeLogInput);

    if (isProd) {
      // In production, route to standardized telemetry/monitoring pipeline if needed,
      // or output sanitized structured JSON to stdout/stderr.
      const logPayload = {
        timestamp: new Date().toISOString(),
        level,
        message: sanitizedMessage,
        data: sanitizedParams.length > 0 ? sanitizedParams : undefined,
      };

      if (level === 'error') {
        // Safe structured error logging without raw unsanitized user dumps
        if (typeof console !== 'undefined' && console.error) {
          console.error(JSON.stringify(logPayload));
        }
      } else if (level === 'warn') {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn(JSON.stringify(logPayload));
        }
      } else {
        if (typeof console !== 'undefined' && console.log) {
          console.log(JSON.stringify(logPayload));
        }
      }
    } else {
      // In development, standard console output with sanitized inputs
      const timestamp = new Date().toLocaleTimeString();
      const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

      switch (level) {
        case 'error':
          console.error(prefix, sanitizedMessage, ...sanitizedParams);
          break;
        case 'warn':
          console.warn(prefix, sanitizedMessage, ...sanitizedParams);
          break;
        case 'info':
          console.info(prefix, sanitizedMessage, ...sanitizedParams);
          break;
        case 'debug':
          console.debug(prefix, sanitizedMessage, ...sanitizedParams);
          break;
      }
    }
  }

  public info(message: string, ...optionalParams: unknown[]): void {
    this.log('info', message, ...optionalParams);
  }

  public warn(message: string, ...optionalParams: unknown[]): void {
    this.log('warn', message, ...optionalParams);
  }

  public error(message: string, ...optionalParams: unknown[]): void {
    this.log('error', message, ...optionalParams);
  }

  public debug(message: string, ...optionalParams: unknown[]): void {
    this.log('debug', message, ...optionalParams);
  }
}

export const logger = new Logger();
export default logger;
