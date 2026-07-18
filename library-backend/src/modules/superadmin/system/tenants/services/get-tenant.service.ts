import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '@/core/entities/tenant.entity';
import { TenantNotFoundException } from '../exceptions/tenants.exceptions';

@Injectable()
export class GetTenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly repository: Repository<Tenant>,
  ) {}

  async execute(id: string): Promise<Tenant> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new TenantNotFoundException();
    return existing;
  }
}
