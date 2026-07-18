import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@/core/entities/role.entity';

import { CreateRoleController } from './controllers/create-role.controller';
import { UpdateRoleController } from './controllers/update-role.controller';
import { DeleteRoleController } from './controllers/delete-role.controller';
import { GetAllRolesController } from './controllers/get-all-roles.controller';
import { GetRoleController } from './controllers/get-role.controller';

import { CreateRoleService } from './services/create-role.service';
import { UpdateRoleService } from './services/update-role.service';
import { DeleteRoleService } from './services/delete-role.service';
import { GetAllRolesService } from './services/get-all-roles.service';
import { GetRoleService } from './services/get-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [
    CreateRoleController,
    UpdateRoleController,
    DeleteRoleController,
    GetAllRolesController,
    GetRoleController,
  ],
  providers: [
    CreateRoleService,
    UpdateRoleService,
    DeleteRoleService,
    GetAllRolesService,
    GetRoleService,
  ],
  exports: [GetRoleService],
})
export class SuperadminRolesModule {}
