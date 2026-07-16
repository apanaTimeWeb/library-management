import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locker } from '@/core/entities/locker.entity';

import { CreateLockerController } from './controllers/create-locker.controller';
import { UpdateLockerController } from './controllers/update-locker.controller';
import { DeleteLockerController } from './controllers/delete-locker.controller';
import { GetAllLockersController } from './controllers/get-all-lockers.controller';
import { GetLockerController } from './controllers/get-locker.controller';

import { CreateLockerService } from './services/create-locker.service';
import { UpdateLockerService } from './services/update-locker.service';
import { DeleteLockerService } from './services/delete-locker.service';
import { GetAllLockersService } from './services/get-all-lockers.service';
import { GetLockerService } from './services/get-locker.service';

@Module({
  imports: [TypeOrmModule.forFeature([Locker])],
  controllers: [
    CreateLockerController,
    UpdateLockerController,
    DeleteLockerController,
    GetAllLockersController,
    GetLockerController,
  ],
  providers: [
    CreateLockerService,
    UpdateLockerService,
    DeleteLockerService,
    GetAllLockersService,
    GetLockerService,
  ],
  exports: [GetLockerService],
})
export class SuperadminLockersModule {}
