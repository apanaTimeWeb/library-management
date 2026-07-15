import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminStudentSlotsService } from './student-slots.service';
import { AdminStudentSlotsController } from './student-slots.controller';
import { StudentSlot } from '@/core/entities/student-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSlot])],
  providers: [AdminStudentSlotsService],
  controllers: [AdminStudentSlotsController],
})
export class AdminStudentSlotsModule {}
