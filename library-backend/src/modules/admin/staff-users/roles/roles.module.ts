import { Module } from '@nestjs/common';
import { AdminRolesService } from './roles.service';
import { AdminRolesController } from './roles.controller';

@Module({
  providers: [AdminRolesService],
  controllers: [AdminRolesController]
})
export class AdminRolesModule {}
