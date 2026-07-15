import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { Student } from '../../../../core/entities/student.entity';
import { Seat } from '../../../../core/entities/seat.entity';
import { Subscription } from '../../../../core/entities/subscription.entity';
import { Enquiry } from '../../../../core/entities/enquiry.entity';
import { Complaint } from '../../../../core/entities/complaint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Seat, Subscription, Enquiry, Complaint])],
  providers: [ManagerService],
  controllers: [ManagerController]
})
export class ManagerModule {}
