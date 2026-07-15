import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/core/entities/user.entity';

// Micro-Services
import { CreateUserService } from './services/create-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { GetUserService } from './services/get-user.service';
import { GetAllUsersService } from './services/get-all-users.service';

// Micro-Controllers
import { CreateUserController } from './controllers/create-user.controller';
import { UpdateUserController } from './controllers/update-user.controller';
import { DeleteUserController } from './controllers/delete-user.controller';
import { GetUserController } from './controllers/get-user.controller';
import { GetAllUsersController } from './controllers/get-all-users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    GetUserService,
    GetAllUsersService,
  ],
  controllers: [
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    GetUserController,
    GetAllUsersController,
  ],
})
export class AdminUsersModule {}
