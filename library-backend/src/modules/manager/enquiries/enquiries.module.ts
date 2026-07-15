import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enquiry } from '../../../core/entities/enquiry.entity';
import { ManagerEnquiriesController } from './enquiries.controller';
import { ManagerEnquiriesService } from './enquiries.service';
import { User } from '../../../core/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enquiry, User])],
  controllers: [ManagerEnquiriesController],
  providers: [ManagerEnquiriesService],
})
export class ManagerEnquiriesModule {}
