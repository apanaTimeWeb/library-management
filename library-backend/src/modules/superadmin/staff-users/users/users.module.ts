import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

import { CreateUserController } from './controllers/create-user.controller';
import { UpdateUserController } from './controllers/update-user.controller';
import { DeleteUserController } from './controllers/delete-user.controller';
import { GetAllUsersController } from './controllers/get-all-users.controller';
import { GetUserController } from './controllers/get-user.controller';

import { CreateUserService } from './services/create-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { GetAllUsersService } from './services/get-all-users.service';
import { GetUserService } from './services/get-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    GetAllUsersController,
    GetUserController,
  ],
  providers: [
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    GetAllUsersService,
    GetUserService,
  ],
  exports: [GetUserService],
})
export class SuperadminUsersModule {}
