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
      role: createUserDto.roleId ? { id: createUserDto.roleId } : undefined,
      branch: createUserDto.branchId
        ? { id: createUserDto.branchId }
        : undefined,
      tenantId: createUserDto.tenantId,
    });
    return this.userRepository.save(user);
  }
}
