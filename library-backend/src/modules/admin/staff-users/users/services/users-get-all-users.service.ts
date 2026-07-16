import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { User } from '@/core/entities/user.entity';
import { UsersGetUsersQueryDto } from '../dto/get-users-query.dto';

@Injectable()
export class UsersGetAllService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(
    queryDto: UsersGetUsersQueryDto,
  ): Promise<{ items: User[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      search,
      sortOrder = 'DESC',
      sortBy = 'createdAt',
    } = queryDto;

    const where: FindOptionsWhere<User> = search
      ? { name: ILike(`%${search}%`) }
      : {};

    const [items, total] = await this.userRepository.findAndCount({
      where,
      relations: { role: true, branch: true },
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
