import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@/core/entities/user.entity';
import { JwtTokenGeneratorUtil } from '@/modules/auth/auth/utils/jwt-token-generator.util';
import { AUTH_CONSTANTS, AUTH_ERRORS } from '@/modules/auth/auth/constants/auth.constants';
import { AuthTokens } from '@/modules/auth/auth/interfaces/auth.interfaces';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtTokenGenerator: JwtTokenGeneratorUtil,
  ) {}

  async refreshTokens(userId: string, rawRefreshToken: string): Promise<AuthTokens> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.refreshTokenHash')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.branch', 'branch')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException(AUTH_ERRORS.ACCESS_DENIED);
    }

    const rtMatches = await bcrypt.compare(rawRefreshToken, user.refreshTokenHash);
    if (!rtMatches) {
      await this.userRepo.update(user.id, { refreshTokenHash: null });
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_REFRESH_TOKEN);
    }

    const tokens = await this.jwtTokenGenerator.generateTokens(user);
    const hashedRt = await bcrypt.hash(tokens.refreshToken, AUTH_CONSTANTS.BCRYPT_COST);
    await this.userRepo.update(user.id, { refreshTokenHash: hashedRt });

    return tokens;
  }
}
