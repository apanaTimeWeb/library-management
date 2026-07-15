import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { Role } from '../core/entities/role.entity';
import { Permission } from '../core/entities/permission.entity';
import { Tenant } from '../core/entities/tenant.entity';
import { Branch } from '../core/entities/branch.entity';
import { User } from '../core/entities/user.entity';
import { Shift } from '../core/entities/shift.entity';
import { Seat } from '../core/entities/seat.entity';
import { Plan } from '../core/entities/plan.entity';
import { Student } from '../core/entities/student.entity';
import { Subscription } from '../core/entities/subscription.entity';
import { Payment } from '../core/entities/payment.entity';
import { Expense } from '../core/entities/expense.entity';
import { StudentSlot } from '../core/entities/student-slot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      Permission,
      Tenant,
      Branch,
      User,
      Shift,
      Seat,
      Plan,
      Student,
      Subscription,
      Payment,
      Expense,
      StudentSlot,
    ]),
  ],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
