import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/core/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
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
