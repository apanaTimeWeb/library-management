import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '@/core/entities/permission.entity';

import { CreatePermissionController } from './controllers/create-permission.controller';
import { UpdatePermissionController } from './controllers/update-permission.controller';
import { DeletePermissionController } from './controllers/delete-permission.controller';
import { GetAllPermissionsController } from './controllers/get-all-permissions.controller';
import { GetPermissionController } from './controllers/get-permission.controller';

import { CreatePermissionService } from './services/create-permission.service';
import { UpdatePermissionService } from './services/update-permission.service';
import { DeletePermissionService } from './services/delete-permission.service';
import { GetAllPermissionsService } from './services/get-all-permissions.service';
import { GetPermissionService } from './services/get-permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [
    CreatePermissionController,
    UpdatePermissionController,
    DeletePermissionController,
    GetAllPermissionsController,
    GetPermissionController,
  ],
  providers: [
    CreatePermissionService,
    UpdatePermissionService,
    DeletePermissionService,
    GetAllPermissionsService,
    GetPermissionService,
  ],
  exports: [GetPermissionService],
})
export class SuperadminPermissionsModule {}
