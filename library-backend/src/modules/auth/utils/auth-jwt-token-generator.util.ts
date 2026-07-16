import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@/core/entities/user.entity';
import {
  JwtPayload,
  AuthTokens,
} from '@/modules/auth/interfaces/auth.interfaces';
import { AUTH_ERRORS } from '@/modules/auth/constants/auth.constants';

@Injectable()
export class AuthJwtTokenGeneratorUtil {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(
    user: User & { role?: any; branch?: any },
  ): Promise<AuthTokens> {
    const payload: JwtPayload = {
      sub: user.id,
      phone: user.phone,
      name: user.name,
      role: user.role?.name,
      tenantId: user.tenantId,
      branchId: user.branch?.id || null,
    };

    const accessSecret = this.configService.get<string>('JWT_SECRET');
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!accessSecret || !refreshSecret) {
      throw new InternalServerErrorException(AUTH_ERRORS.JWT_SECRETS_MISSING);
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: accessSecret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshSecret,
        expiresIn: '30d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
