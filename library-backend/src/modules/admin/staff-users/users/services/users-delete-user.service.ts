import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/entities/user.entity';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class UsersDeleteUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    await this.userRepository.softRemove(user);
  }
}
