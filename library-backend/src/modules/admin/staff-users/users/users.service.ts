import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../core/entities/user.entity';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async findOne(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }
}
