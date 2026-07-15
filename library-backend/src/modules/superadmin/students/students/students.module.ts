import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../../../core/entities/student.entity';

import { Branch } from '../../../../core/entities/branch.entity';
import { Shift } from '../../../../core/entities/shift.entity';
import { Seat } from '../../../../core/entities/seat.entity';
import { Locker } from '../../../../core/entities/locker.entity';
import { Plan } from '../../../../core/entities/plan.entity';
import { StudentSlot } from '../../../../core/entities/student-slot.entity';
import { Subscription } from '../../../../core/entities/subscription.entity';
import { Payment } from '../../../../core/entities/payment.entity';

// Micro-Services
import { GetAllStudentsService } from './services/get-all-students.service';
import { GetStudentService } from './services/get-student.service';
import { CreateStudentService } from './services/create-student.service';
import { UpdateStudentService } from './services/update-student.service';
import { DeleteStudentService } from './services/delete-student.service';

// Micro-Controllers
import { GetAllStudentsController } from './controllers/get-all-students.controller';
import { GetStudentController } from './controllers/get-student.controller';
import { CreateStudentController } from './controllers/create-student.controller';
import { UpdateStudentController } from './controllers/update-student.controller';
import { DeleteStudentController } from './controllers/delete-student.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    Student, Branch, Shift, Seat, Locker, Plan, StudentSlot, Subscription, Payment
  ])],
  providers: [
    GetAllStudentsService,
    GetStudentService,
    CreateStudentService,
    UpdateStudentService,
    DeleteStudentService,
  ],
  controllers: [
    GetAllStudentsController,
    GetStudentController,
    CreateStudentController,
    UpdateStudentController,
    DeleteStudentController,
  ]
})
export class SuperadminStudentsModule {}
