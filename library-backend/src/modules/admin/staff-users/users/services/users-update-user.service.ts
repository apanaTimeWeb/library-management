import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/entities/user.entity';
import { UsersUpdateUserDto } from '../dto/users-update-user.dto';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class UsersUpdateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async update(id: string, updateUserDto: UsersUpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }

    Object.assign(user, {
      ...updateUserDto,
      role: updateUserDto.roleId ? { id: updateUserDto.roleId } : user.role,
      branch: updateUserDto.branchId
        ? { id: updateUserDto.branchId }
        : user.branch,
      tenantId: updateUserDto.tenantId ? updateUserDto.tenantId : user.tenantId,
    });

    return this.userRepository.save(user);
  }
}
