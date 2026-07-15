import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from '@/core/entities/tenant.entity';

// Micro-Services
import { CreateTenantService } from './services/create-tenant.service';
import { UpdateTenantService } from './services/update-tenant.service';
import { DeleteTenantService } from './services/delete-tenant.service';
import { GetTenantService } from './services/get-tenant.service';
import { GetAllTenantsService } from './services/get-all-tenants.service';

// Micro-Controllers
import { CreateTenantController } from './controllers/create-tenant.controller';
import { UpdateTenantController } from './controllers/update-tenant.controller';
import { DeleteTenantController } from './controllers/delete-tenant.controller';
import { GetTenantController } from './controllers/get-tenant.controller';
import { GetAllTenantsController } from './controllers/get-all-tenants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [
    CreateTenantService,
    UpdateTenantService,
    DeleteTenantService,
    GetTenantService,
    GetAllTenantsService,
  ],
  controllers: [
    CreateTenantController,
    UpdateTenantController,
    DeleteTenantController,
    GetTenantController,
    GetAllTenantsController,
  ],
})
export class SuperadminTenantsModule {}
