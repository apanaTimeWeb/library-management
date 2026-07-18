import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '@/core/entities/tenant.entity';
import { CreateTenantDto } from '../dto/create-tenant.dto';

@Injectable()
export class CreateTenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly repository: Repository<Tenant>,
  ) {}

  async execute(dto: CreateTenantDto): Promise<Tenant> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
