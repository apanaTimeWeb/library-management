import { Module } from '@nestjs/common';
import { AdminPermissionsService } from './permissions.service';
import { AdminPermissionsController } from './permissions.controller';

@Module({
  providers: [AdminPermissionsService],
  controllers: [AdminPermissionsController]
})
export class AdminPermissionsModule {}
