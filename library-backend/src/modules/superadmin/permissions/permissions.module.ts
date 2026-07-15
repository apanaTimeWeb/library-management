import { Module } from '@nestjs/common';
import { SuperadminPermissionsService } from './permissions.service';
import { SuperadminPermissionsController } from './permissions.controller';

@Module({
  providers: [SuperadminPermissionsService],
  controllers: [SuperadminPermissionsController]
})
export class SuperadminPermissionsModule {}
