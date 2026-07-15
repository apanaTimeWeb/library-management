import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminStudentSlotsService } from './student-slots.service';
import { SuperadminStudentSlotsController } from './student-slots.controller';
import { StudentSlot } from '../../../core/entities/student-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSlot])],
  providers: [SuperadminStudentSlotsService],
  controllers: [SuperadminStudentSlotsController]
})
export class SuperadminStudentSlotsModule {}
