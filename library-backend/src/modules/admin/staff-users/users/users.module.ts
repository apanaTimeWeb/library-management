import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

// Micro-Services
import { UsersCreateUserService } from './services/create-user.service';
import { UsersUpdateUserService } from './services/update-user.service';
import { UsersDeleteUserService } from './services/delete-user.service';
import { UsersGetUserService } from './services/get-user.service';
import { UsersGetAllService } from './services/get-all-users.service';

// Micro-Controllers
import { UsersCreateUserController } from './controllers/create-user.controller';
import { UsersUpdateUserController } from './controllers/update-user.controller';
import { UsersDeleteUserController } from './controllers/delete-user.controller';
import { UsersGetUserController } from './controllers/get-user.controller';
import { UsersGetAllController } from './controllers/get-all-users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersCreateUserService, UsersUpdateUserService, UsersDeleteUserService, UsersGetUserService, UsersGetAllService, ],
  controllers: [UsersCreateUserController, UsersUpdateUserController, UsersDeleteUserController, UsersGetUserController, UsersGetAllController, ],
})
export class UsersAdminModule {}
