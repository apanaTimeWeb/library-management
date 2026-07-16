import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@/core/entities/role.entity';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleNotFoundException } from '../exceptions/roles.exceptions';

@Injectable()
export class UpdateRoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async execute(id: string, dto: UpdateRoleDto): Promise<Role> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new RoleNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
