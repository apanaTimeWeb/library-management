import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...createUserDto,
      role: createUserDto.roleId ? { id: createUserDto.roleId } as any : undefined,
      branch: createUserDto.branchId ? { id: createUserDto.branchId } as any : undefined,
      tenant: createUserDto.tenantId ? { id: createUserDto.tenantId } as any : undefined,
    });
    return this.userRepository.save(user);
  }
}
