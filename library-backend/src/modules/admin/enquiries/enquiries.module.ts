import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enquiry } from '../../../core/entities/enquiry.entity';
import { AdminEnquiriesController } from './enquiries.controller';
import { AdminEnquiriesService } from './enquiries.service';
import { User } from '../../../core/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enquiry, User])],
  controllers: [AdminEnquiriesController],
  providers: [AdminEnquiriesService],
})
export class AdminEnquiriesModule {}
