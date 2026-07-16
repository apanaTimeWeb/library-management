import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSlot } from '@/core/entities/student-slot.entity';

import { StudentSlotsCreateController } from '@/modules/manager/seats_shifts_lockers/student-slots/controllers/student-slots-create.controller';
import { StudentSlotsUpdateController } from '@/modules/manager/seats_shifts_lockers/student-slots/controllers/student-slots-update.controller';
import { StudentSlotsDeleteController } from '@/modules/manager/seats_shifts_lockers/student-slots/controllers/student-slots-delete.controller';
import { StudentSlotsGetAllController } from '@/modules/manager/seats_shifts_lockers/student-slots/controllers/student-slots-get-all.controller';
import { StudentSlotsGetController } from '@/modules/manager/seats_shifts_lockers/student-slots/controllers/student-slots-get.controller';

import { StudentSlotsCreateService } from '@/modules/manager/seats_shifts_lockers/student-slots/services/student-slots-create.service';
import { StudentSlotsUpdateService } from '@/modules/manager/seats_shifts_lockers/student-slots/services/student-slots-update.service';
import { StudentSlotsDeleteService } from '@/modules/manager/seats_shifts_lockers/student-slots/services/student-slots-delete.service';
import { StudentSlotsGetAllService } from '@/modules/manager/seats_shifts_lockers/student-slots/services/student-slots-get-all.service';
import { StudentSlotsGetService } from '@/modules/manager/seats_shifts_lockers/student-slots/services/student-slots-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSlot])],
  controllers: [
    StudentSlotsCreateController,
    StudentSlotsUpdateController,
    StudentSlotsDeleteController,
    StudentSlotsGetAllController,
    StudentSlotsGetController,
  ],
  providers: [
    StudentSlotsCreateService,
    StudentSlotsUpdateService,
    StudentSlotsDeleteService,
    StudentSlotsGetAllService,
    StudentSlotsGetService,
  ],
  exports: [StudentSlotsGetService],
})
export class ManagerStudentSlotsModule {}
