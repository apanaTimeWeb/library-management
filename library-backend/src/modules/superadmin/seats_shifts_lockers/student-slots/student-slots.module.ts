import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSlot } from '@/core/entities/student-slot.entity';

import { CreateStudentSlotController } from './controllers/create-student-slot.controller';
import { UpdateStudentSlotController } from './controllers/update-student-slot.controller';
import { DeleteStudentSlotController } from './controllers/delete-student-slot.controller';
import { GetAllStudentSlotsController } from './controllers/get-all-student-slots.controller';
import { GetStudentSlotController } from './controllers/get-student-slot.controller';

import { CreateStudentSlotService } from './services/create-student-slot.service';
import { UpdateStudentSlotService } from './services/update-student-slot.service';
import { DeleteStudentSlotService } from './services/delete-student-slot.service';
import { GetAllStudentSlotsService } from './services/get-all-student-slots.service';
import { GetStudentSlotService } from './services/get-student-slot.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSlot])],
  controllers: [
    CreateStudentSlotController,
    UpdateStudentSlotController,
    DeleteStudentSlotController,
    GetAllStudentSlotsController,
    GetStudentSlotController,
  ],
  providers: [
    CreateStudentSlotService,
    UpdateStudentSlotService,
    DeleteStudentSlotService,
    GetAllStudentSlotsService,
    GetStudentSlotService,
  ],
  exports: [GetStudentSlotService],
})
export class SuperadminStudentSlotsModule {}
