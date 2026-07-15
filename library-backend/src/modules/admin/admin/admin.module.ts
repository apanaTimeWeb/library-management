import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Student } from '../../../core/entities/student.entity';
import { Payment } from '../../../core/entities/payment.entity';
import { Seat } from '../../../core/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Payment, Seat])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
