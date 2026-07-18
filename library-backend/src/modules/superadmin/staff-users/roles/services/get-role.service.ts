import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@/core/entities/role.entity';
import { RoleNotFoundException } from '../exceptions/roles.exceptions';

@Injectable()
export class GetRoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async execute(id: string): Promise<Role> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new RoleNotFoundException();
    return existing;
  }
}
