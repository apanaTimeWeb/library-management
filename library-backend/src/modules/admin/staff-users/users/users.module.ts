import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

// Micro-Services
import { UsersCreateUserService } from './services/users-create-user.service';
import { UsersUpdateUserService } from './services/users-update-user.service';
import { UsersDeleteUserService } from './services/users-delete-user.service';
import { UsersGetUserService } from './services/users-get-user.service';
import { UsersGetAllService } from './services/users-get-all-users.service';

// Micro-Controllers
import { UsersCreateUserController } from './controllers/users-create-user.controller';
import { UsersUpdateUserController } from './controllers/users-update-user.controller';
import { UsersDeleteUserController } from './controllers/users-delete-user.controller';
import { UsersGetUserController } from './controllers/users-get-user.controller';
import { UsersGetAllController } from './controllers/users-get-all-users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersCreateUserService, UsersUpdateUserService, UsersDeleteUserService, UsersGetUserService, UsersGetAllService, ],
  controllers: [UsersCreateUserController, UsersUpdateUserController, UsersDeleteUserController, UsersGetUserController, UsersGetAllController, ],
})
export class UsersAdminModule {}
