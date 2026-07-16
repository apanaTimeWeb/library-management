import { Module } from '@nestjs/common';
import { RolesAdminService } from './roles.service';
import { RolesAdminController } from './roles.controller';

@Module({
  providers: [RolesAdminService],
  controllers: [RolesAdminController],
})
export class RolesAdminModule {}
