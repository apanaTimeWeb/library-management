import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSlot } from '@/core/entities/student-slot.entity';

import { StudentSlotsCreateStudentSlotController } from './controllers/create-student-slot.controller';
import { StudentSlotsUpdateStudentSlotController } from './controllers/update-student-slot.controller';
import { StudentSlotsDeleteStudentSlotController } from './controllers/delete-student-slot.controller';
import { StudentSlotsGetAllController } from './controllers/get-all-student-slots.controller';
import { StudentSlotsGetStudentSlotController } from './controllers/get-student-slot.controller';

import { StudentSlotsCreateStudentSlotService } from './services/create-student-slot.service';
import { StudentSlotsUpdateStudentSlotService } from './services/update-student-slot.service';
import { StudentSlotsDeleteStudentSlotService } from './services/delete-student-slot.service';
import { StudentSlotsGetAllService } from './services/get-all-student-slots.service';
import { StudentSlotsGetStudentSlotService } from './services/get-student-slot.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSlot])],
  controllers: [StudentSlotsCreateStudentSlotController, StudentSlotsUpdateStudentSlotController, StudentSlotsDeleteStudentSlotController, StudentSlotsGetAllController, StudentSlotsGetStudentSlotController, ],
  providers: [StudentSlotsCreateStudentSlotService, StudentSlotsUpdateStudentSlotService, StudentSlotsDeleteStudentSlotService, StudentSlotsGetAllService, StudentSlotsGetStudentSlotService, ],
  exports: [StudentSlotsGetStudentSlotService],
})
export class StudentSlotsAdminModule {}
