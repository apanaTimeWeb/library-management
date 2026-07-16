import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';

import { CreateEnquiryController } from './controllers/create-enquiry.controller';
import { UpdateEnquiryController } from './controllers/update-enquiry.controller';
import { DeleteEnquiryController } from './controllers/delete-enquiry.controller';
import { GetAllEnquiriesController } from './controllers/get-all-enquiries.controller';
import { GetEnquiryController } from './controllers/get-enquiry.controller';

import { CreateEnquiryService } from './services/create-enquiry.service';
import { UpdateEnquiryService } from './services/update-enquiry.service';
import { DeleteEnquiryService } from './services/delete-enquiry.service';
import { GetAllEnquiriesService } from './services/get-all-enquiries.service';
import { GetEnquiryService } from './services/get-enquiry.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enquiry])],
  controllers: [
    CreateEnquiryController,
    UpdateEnquiryController,
    DeleteEnquiryController,
    GetAllEnquiriesController,
    GetEnquiryController,
  ],
  providers: [
    CreateEnquiryService,
    UpdateEnquiryService,
    DeleteEnquiryService,
    GetAllEnquiriesService,
    GetEnquiryService,
  ],
  exports: [GetEnquiryService],
})
export class ManagerEnquiriesModule {}
