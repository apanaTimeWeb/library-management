import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerStudentSlotsService } from './student-slots.service';
import { ManagerStudentSlotsController } from './student-slots.controller';
import { StudentSlot } from '../../../core/entities/student-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSlot])],
  providers: [ManagerStudentSlotsService],
  controllers: [ManagerStudentSlotsController]
})
export class ManagerStudentSlotsModule {}
