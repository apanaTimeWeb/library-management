import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountLockedException extends HttpException {
  constructor(remainingMinutes: number) {
    super(
      `Account is locked due to too many failed attempts. Try again in ${remainingMinutes} minute(s).`,
      HttpStatus.FORBIDDEN,
    );
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor(attemptsLeft?: number) {
    const message =
      attemptsLeft !== undefined && attemptsLeft > 0
        ? `Invalid phone or password. ${attemptsLeft} attempt(s) remaining.`
        : 'Invalid phone or password';
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
