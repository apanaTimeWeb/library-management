import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';
import { Branch } from '@/core/entities/branch.entity';
import { Shift } from '@/core/entities/shift.entity';
import { Seat } from '@/core/entities/seat.entity';
import { Locker } from '@/core/entities/locker.entity';
import { Plan } from '@/core/entities/plan.entity';
import { StudentSlot } from '@/core/entities/student-slot.entity';
import { Subscription } from '@/core/entities/subscription.entity';
import { Payment } from '@/core/entities/payment.entity';
import { AuthModule } from '@/modules/auth/auth.module';

// Micro-Services
import { StudentsGetAllService } from './services/students-get-all-students.service';
import { StudentsGetStudentService } from './services/students-get-student.service';
import { StudentsCreateStudentService } from './services/students-create-student.service';
import { StudentsUpdateStudentService } from './services/students-update-student.service';
import { StudentsDeleteStudentService } from './services/students-delete-student.service';

// Micro-Controllers
import { StudentsGetAllController } from './controllers/students-get-all-students.controller';
import { StudentsGetStudentController } from './controllers/students-get-student.controller';
import { StudentsCreateStudentController } from './controllers/students-create-student.controller';
import { StudentsUpdateStudentController } from './controllers/students-update-student.controller';
import { StudentsDeleteStudentController } from './controllers/students-delete-student.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student, Branch, Shift, Seat, Locker, Plan, StudentSlot, Subscription, Payment,
    ]),
    AuthModule,
  ],
  providers: [
    StudentsGetAllService,
    StudentsGetStudentService,
    StudentsCreateStudentService,
    StudentsUpdateStudentService,
    StudentsDeleteStudentService,
  ],
  controllers: [
    StudentsGetAllController,
    StudentsGetStudentController,
    StudentsCreateStudentController,
    StudentsUpdateStudentController,
    StudentsDeleteStudentController,
  ],
  exports: [StudentsGetStudentService],
})
export class StudentsModule {}
