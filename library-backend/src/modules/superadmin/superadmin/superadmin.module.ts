import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminService } from './superadmin.service';
import { SuperadminController } from './superadmin.controller';
import { Tenant } from '../../../core/entities/tenant.entity';
import { Branch } from '../../../core/entities/branch.entity';
import { User } from '../../../core/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Branch, User])],
  controllers: [SuperadminController],
  providers: [SuperadminService],
})
export class SuperadminModule {}
