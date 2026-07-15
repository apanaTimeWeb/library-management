import { Module } from '@nestjs/common';
import { SuperadminTenantsService } from './tenants.service';
import { SuperadminTenantsController } from './tenants.controller';

@Module({
  providers: [SuperadminTenantsService],
  controllers: [SuperadminTenantsController]
})
export class SuperadminTenantsModule {}
