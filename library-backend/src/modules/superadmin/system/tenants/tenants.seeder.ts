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
    const existing = await this.tenantRepository.findOne({ where: { domain: 'demo.library.com' } });
    if (!existing) {
      const tenant = this.tenantRepository.create({
        name: 'Demo Library',
        domain: 'demo.library.com',
        adminEmail: 'admin@demo.library.com',
        status: 'active',
      });
      await this.tenantRepository.save(tenant);
      this.logger.log('Demo Tenant seeded successfully.');
    } else {
      this.logger.log('Demo Tenant already seeded.');
    }
  }
}
