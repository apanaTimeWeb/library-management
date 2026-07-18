import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locker } from '@/core/entities/locker.entity';

import { LockersCreateLockerController } from './controllers/lockers-create-locker.controller';
import { LockersUpdateLockerController } from './controllers/lockers-update-locker.controller';
import { LockersDeleteLockerController } from './controllers/lockers-delete-locker.controller';
import { LockersGetAllController } from './controllers/lockers-get-all-lockers.controller';
import { LockersGetLockerController } from './controllers/lockers-get-locker.controller';

import { LockersCreateLockerService } from './services/lockers-create-locker.service';
import { LockersUpdateLockerService } from './services/lockers-update-locker.service';
import { LockersDeleteLockerService } from './services/lockers-delete-locker.service';
import { LockersGetAllService } from './services/lockers-get-all-lockers.service';
import { LockersGetLockerService } from './services/lockers-get-locker.service';

@Module({
  imports: [TypeOrmModule.forFeature([Locker])],
  controllers: [LockersCreateLockerController, LockersUpdateLockerController, LockersDeleteLockerController, LockersGetAllController, LockersGetLockerController, ],
  providers: [LockersCreateLockerService, LockersUpdateLockerService, LockersDeleteLockerService, LockersGetAllService, LockersGetLockerService, ],
  exports: [LockersGetLockerService],
})
export class LockersAdminModule {}
