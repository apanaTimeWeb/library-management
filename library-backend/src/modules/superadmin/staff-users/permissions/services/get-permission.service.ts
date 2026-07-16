import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '@/core/entities/permission.entity';
import { PermissionNotFoundException } from '../exceptions/permissions.exceptions';

@Injectable()
export class GetPermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {}

  async execute(id: string): Promise<Permission> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new PermissionNotFoundException();
    return existing;
  }
}
