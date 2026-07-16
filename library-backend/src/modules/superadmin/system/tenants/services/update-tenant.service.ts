import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '@/core/entities/tenant.entity';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { TenantNotFoundException } from '../exceptions/tenants.exceptions';

@Injectable()
export class UpdateTenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly repository: Repository<Tenant>,
  ) {}

  async execute(id: string, dto: UpdateTenantDto): Promise<Tenant> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new TenantNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
