import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/entities/user.entity';
import { UserNotFoundException } from '../exceptions/users.exceptions';

@Injectable()
export class GetUserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(id: string): Promise<User> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new UserNotFoundException();
    return existing;
  }
}
