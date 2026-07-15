import { Module } from '@nestjs/common';
import { SuperadminRolesService } from './roles.service';
import { SuperadminRolesController } from './roles.controller';

@Module({
  providers: [SuperadminRolesService],
  controllers: [SuperadminRolesController],
})
export class SuperadminRolesModule {}
