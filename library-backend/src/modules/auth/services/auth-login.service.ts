import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@/core/entities/user.entity';
import { AuthLoginDto } from '@/modules/auth/dto/auth-login.dto';
import { AuthJwtTokenGeneratorUtil } from '@/modules/auth/utils/auth-jwt-token-generator.util';
import { AUTH_CONSTANTS } from '@/modules/auth/constants/auth.constants';
import {
  AccountLockedException,
  InvalidCredentialsException,
} from '@/modules/auth/exceptions/auth.exceptions';
import { LoginResponse } from '@/modules/auth/interfaces/auth.interfaces';

@Injectable()
export class AuthLoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtTokenGenerator: AuthJwtTokenGeneratorUtil,
  ) {}

  async login(
    dto: AuthLoginDto,
    ip: string,
    userAgent: string,
  ): Promise<LoginResponse> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.refreshTokenHash')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.branch', 'branch')
      .where('user.phone = :phone', { phone: dto.phone })
      .getOne();

    if (!user) {
      throw new InvalidCredentialsException();
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      const remaining = Math.ceil(
        (user.lockUntil.getTime() - Date.now()) / 60000,
      );
      throw new AccountLockedException(remaining);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      await this.handleFailedLogin(user);
      const attemptsLeft =
        AUTH_CONSTANTS.MAX_FAILED_ATTEMPTS -
        (user.failedLoginAttempts || 0) -
        1;
      throw new InvalidCredentialsException(attemptsLeft);
    }

    await this.userRepo.update(user.id, {
      failedLoginAttempts: 0,
      lockUntil: null,
      lastLoginAt: new Date(),
      lastLoginIp: ip,
    });

    const tokens = await this.jwtTokenGenerator.generateTokens(user);

    const hashedRt = await bcrypt.hash(
      tokens.refreshToken,
      AUTH_CONSTANTS.BCRYPT_COST,
    );
    await this.userRepo.update(user.id, { refreshTokenHash: hashedRt });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role?.name,
        tenantId: user.tenantId,
        branchId: user.branch?.id,
      },
    };
  }

  private async handleFailedLogin(user: User): Promise<void> {
    const newCount = (user.failedLoginAttempts || 0) + 1;
    const update: Partial<User> = { failedLoginAttempts: newCount };

    if (newCount >= AUTH_CONSTANTS.MAX_FAILED_ATTEMPTS) {
      const lockUntil = new Date();
      lockUntil.setMinutes(
        lockUntil.getMinutes() + AUTH_CONSTANTS.LOCK_DURATION_MINUTES,
      );
      update.lockUntil = lockUntil;
    }

    await this.userRepo.update(user.id, update);
  }
}
