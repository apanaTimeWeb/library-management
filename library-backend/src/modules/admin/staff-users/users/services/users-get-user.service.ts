import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/entities/user.entity';
import { UserNotFoundException } from '../exceptions/users-user-not-found.exception';

@Injectable()
export class UsersGetUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { role: true, branch: true },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
