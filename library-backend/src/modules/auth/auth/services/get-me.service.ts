import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../core/entities/user.entity';
import { AuthUserResponse } from '../interfaces/auth.interfaces';
import { AUTH_ERRORS } from '../constants/auth.constants';

@Injectable()
export class GetMeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getMe(userId: string): Promise<AuthUserResponse> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: { role: true, branch: true },
    });
    
    if (!user) {
      throw new UnauthorizedException(AUTH_ERRORS.USER_NOT_FOUND);
    }
    
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role?.name,
      tenantId: user.tenantId,
      branchId: user.branch?.id,
      lastLoginAt: user.lastLoginAt,
    };
  }
}
