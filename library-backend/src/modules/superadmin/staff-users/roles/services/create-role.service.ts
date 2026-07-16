import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@/core/entities/role.entity';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class CreateRoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async execute(dto: CreateRoleDto): Promise<Role> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
