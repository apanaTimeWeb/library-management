import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locker } from '@/core/entities/locker.entity';

import { LockersCreateLockerController } from './controllers/create-locker.controller';
import { LockersUpdateLockerController } from './controllers/update-locker.controller';
import { LockersDeleteLockerController } from './controllers/delete-locker.controller';
import { LockersGetAllController } from './controllers/get-all-lockers.controller';
import { LockersGetLockerController } from './controllers/get-locker.controller';

import { LockersCreateLockerService } from './services/create-locker.service';
import { LockersUpdateLockerService } from './services/update-locker.service';
import { LockersDeleteLockerService } from './services/delete-locker.service';
import { LockersGetAllService } from './services/get-all-lockers.service';
import { LockersGetLockerService } from './services/get-locker.service';

@Module({
  imports: [TypeOrmModule.forFeature([Locker])],
  controllers: [LockersCreateLockerController, LockersUpdateLockerController, LockersDeleteLockerController, LockersGetAllController, LockersGetLockerController, ],
  providers: [LockersCreateLockerService, LockersUpdateLockerService, LockersDeleteLockerService, LockersGetAllService, LockersGetLockerService, ],
  exports: [LockersGetLockerService],
})
export class LockersAdminModule {}
