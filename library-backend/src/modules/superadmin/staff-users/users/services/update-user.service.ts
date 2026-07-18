import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserNotFoundException } from '../exceptions/users.exceptions';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<User> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new UserNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
