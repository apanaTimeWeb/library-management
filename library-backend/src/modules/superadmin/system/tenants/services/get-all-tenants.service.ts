import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '@/core/entities/tenant.entity';

@Injectable()
export class GetAllTenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async findAll(): Promise<{ items: Tenant[]; total: number }> {
    const [items, total] = await this.tenantRepository.findAndCount();
    return { items, total };
  }
}
