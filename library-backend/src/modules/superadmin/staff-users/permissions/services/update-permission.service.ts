import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '@/core/entities/permission.entity';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionNotFoundException } from '../exceptions/permissions.exceptions';

@Injectable()
export class UpdatePermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {}

  async execute(id: string, dto: UpdatePermissionDto): Promise<Permission> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new PermissionNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
