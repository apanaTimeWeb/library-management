import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '@/core/entities/tenant.entity';

@Injectable()
export class TenantsSeeder {
  private readonly logger = new Logger(TenantsSeeder.name);

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async seed() {
    this.logger.log('Seeding Superadmin System Tenants...');
    const existing = await this.tenantRepository.findOne({
      where: { name: 'Demo Library' },
    });
    if (!existing) {
      const tenant = this.tenantRepository.create({
        name: 'Demo Library',
        ownerEmail: 'admin@demo.library.com',
        isActive: true,
      });
      await this.tenantRepository.save(tenant);
      this.logger.log('Demo Tenant seeded successfully.');
    } else {
      this.logger.log('Demo Tenant already seeded.');
    }
  }
}
