import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '@/core/entities/permission.entity';
import { PermissionNotFoundException } from '../exceptions/permissions.exceptions';

@Injectable()
export class DeletePermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new PermissionNotFoundException();
    await this.repository.remove(existing);
  }
}
