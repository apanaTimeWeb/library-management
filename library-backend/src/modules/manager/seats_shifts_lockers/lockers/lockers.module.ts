import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locker } from '@/core/entities/locker.entity';

import { LockersCreateController } from '@/modules/manager/seats_shifts_lockers/lockers/controllers/lockers-create.controller';
import { LockersUpdateController } from '@/modules/manager/seats_shifts_lockers/lockers/controllers/lockers-update.controller';
import { LockersDeleteController } from '@/modules/manager/seats_shifts_lockers/lockers/controllers/lockers-delete.controller';
import { LockersGetAllController } from '@/modules/manager/seats_shifts_lockers/lockers/controllers/lockers-get-all.controller';
import { LockersGetController } from '@/modules/manager/seats_shifts_lockers/lockers/controllers/lockers-get.controller';

import { LockersCreateService } from '@/modules/manager/seats_shifts_lockers/lockers/services/lockers-create.service';
import { LockersUpdateService } from '@/modules/manager/seats_shifts_lockers/lockers/services/lockers-update.service';
import { LockersDeleteService } from '@/modules/manager/seats_shifts_lockers/lockers/services/lockers-delete.service';
import { LockersGetAllService } from '@/modules/manager/seats_shifts_lockers/lockers/services/lockers-get-all.service';
import { LockersGetService } from '@/modules/manager/seats_shifts_lockers/lockers/services/lockers-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Locker])],
  controllers: [
    LockersCreateController,
    LockersUpdateController,
    LockersDeleteController,
    LockersGetAllController,
    LockersGetController,
  ],
  providers: [
    LockersCreateService,
    LockersUpdateService,
    LockersDeleteService,
    LockersGetAllService,
    LockersGetService,
  ],
  exports: [LockersGetService],
})
export class ManagerLockersModule {}
