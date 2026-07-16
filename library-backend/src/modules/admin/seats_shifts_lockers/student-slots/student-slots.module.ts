import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSlot } from '@/core/entities/student-slot.entity';

import { StudentSlotsCreateStudentSlotController } from './controllers/student-slots-create-student-slot.controller';
import { StudentSlotsUpdateStudentSlotController } from './controllers/student-slots-update-student-slot.controller';
import { StudentSlotsDeleteStudentSlotController } from './controllers/student-slots-delete-student-slot.controller';
import { StudentSlotsGetAllController } from './controllers/student-slots-get-all-student-slots.controller';
import { StudentSlotsGetStudentSlotController } from './controllers/student-slots-get-student-slot.controller';

import { StudentSlotsCreateStudentSlotService } from './services/student-slots-create-student-slot.service';
import { StudentSlotsUpdateStudentSlotService } from './services/student-slots-update-student-slot.service';
import { StudentSlotsDeleteStudentSlotService } from './services/student-slots-delete-student-slot.service';
import { StudentSlotsGetAllService } from './services/student-slots-get-all-student-slots.service';
import { StudentSlotsGetStudentSlotService } from './services/student-slots-get-student-slot.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSlot])],
  controllers: [StudentSlotsCreateStudentSlotController, StudentSlotsUpdateStudentSlotController, StudentSlotsDeleteStudentSlotController, StudentSlotsGetAllController, StudentSlotsGetStudentSlotController, ],
  providers: [StudentSlotsCreateStudentSlotService, StudentSlotsUpdateStudentSlotService, StudentSlotsDeleteStudentSlotService, StudentSlotsGetAllService, StudentSlotsGetStudentSlotService, ],
  exports: [StudentSlotsGetStudentSlotService],
})
export class StudentSlotsAdminModule {}
