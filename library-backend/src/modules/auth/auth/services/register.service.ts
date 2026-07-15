import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@/core/entities/user.entity';
import { Role } from '@/core/entities/role.entity';
import { Branch } from '@/core/entities/branch.entity';
import { RegisterDto } from '@/modules/auth/auth/dto/register.dto';
import { AUTH_CONSTANTS, AUTH_ERRORS } from '@/modules/auth/auth/constants/auth.constants';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(Branch)
    private readonly branchRepo: Repository<Branch>,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userRepo.findOne({ where: { phone: dto.phone } });
    if (existing) {
      throw new ConflictException(AUTH_ERRORS.USER_ALREADY_EXISTS);
    }

    const role = await this.roleRepo.findOne({ where: { name: dto.roleName } });
    if (!role) {
      throw new BadRequestException(AUTH_ERRORS.ROLE_NOT_FOUND);
    }

    let branch: Branch | null = null;
    if (dto.branchId) {
      branch = await this.branchRepo.findOne({ where: { id: dto.branchId } });
      if (!branch) {
        throw new BadRequestException(AUTH_ERRORS.BRANCH_NOT_FOUND);
      }
    }

    const passwordHash = await bcrypt.hash(dto.password, AUTH_CONSTANTS.BCRYPT_COST);

    const user = this.userRepo.create({
      phone: dto.phone,
      name: dto.name,
      email: dto.email ?? undefined,
      password: passwordHash,
      tenantId: dto.tenantId ?? undefined,
      role,
      branch: branch ?? undefined,
      isActive: true,
      failedLoginAttempts: 0,
    });

    const saved = await this.userRepo.save(user);
    const { password, refreshTokenHash, ...result } = saved as any;
    return result;
  }
}
