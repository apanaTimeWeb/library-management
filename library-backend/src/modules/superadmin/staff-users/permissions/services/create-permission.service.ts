import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '@/core/entities/permission.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';

@Injectable()
export class CreatePermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {}

  async execute(dto: CreatePermissionDto): Promise<Permission> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
