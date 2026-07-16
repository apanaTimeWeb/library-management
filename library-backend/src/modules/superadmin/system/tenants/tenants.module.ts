import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from '@/core/entities/tenant.entity';

import { CreateTenantController } from './controllers/create-tenant.controller';
import { UpdateTenantController } from './controllers/update-tenant.controller';
import { DeleteTenantController } from './controllers/delete-tenant.controller';
import { GetAllTenantsController } from './controllers/get-all-tenants.controller';
import { GetTenantController } from './controllers/get-tenant.controller';

import { CreateTenantService } from './services/create-tenant.service';
import { UpdateTenantService } from './services/update-tenant.service';
import { DeleteTenantService } from './services/delete-tenant.service';
import { GetAllTenantsService } from './services/get-all-tenants.service';
import { GetTenantService } from './services/get-tenant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  controllers: [
    CreateTenantController,
    UpdateTenantController,
    DeleteTenantController,
    GetAllTenantsController,
    GetTenantController,
  ],
  providers: [
    CreateTenantService,
    UpdateTenantService,
    DeleteTenantService,
    GetAllTenantsService,
    GetTenantService,
  ],
  exports: [GetTenantService],
})
export class SuperadminTenantsModule {}
