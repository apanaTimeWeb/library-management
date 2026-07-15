import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/entities/user.entity';

@Injectable()
export class GetAllUsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<{ items: User[]; total: number }> {
    const [items, total] = await this.userRepository.findAndCount({
      relations: ['role', 'branch', 'tenant'],
    });
    return { items, total };
  }
}
