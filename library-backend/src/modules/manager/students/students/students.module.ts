import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerStudentsService } from './students.service';
import { ManagerStudentsController } from './students.controller';
import { Student } from '../../../../core/entities/student.entity';

import { Branch } from '../../../../core/entities/branch.entity';
import { Shift } from '../../../../core/entities/shift.entity';
import { Seat } from '../../../../core/entities/seat.entity';
import { Locker } from '../../../../core/entities/locker.entity';
import { Plan } from '../../../../core/entities/plan.entity';
import { StudentSlot } from '../../../../core/entities/student-slot.entity';
import { Subscription } from '../../../../core/entities/subscription.entity';
import { Payment } from '../../../../core/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Student, Branch, Shift, Seat, Locker, Plan, StudentSlot, Subscription, Payment
  ])],
  providers: [ManagerStudentsService],
  controllers: [ManagerStudentsController]
})
export class ManagerStudentsModule {}
