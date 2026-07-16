import { Module } from '@nestjs/common';
import { PermissionsAdminService } from './permissions.service';
import { PermissionsAdminController } from './permissions.controller';

@Module({
  providers: [PermissionsAdminService],
  controllers: [PermissionsAdminController],
})
export class PermissionsAdminModule {}
