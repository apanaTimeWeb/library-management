import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { User } from '@/core/entities/user.entity';
import { AuthAuthModule } from '@/modules/auth/auth/auth.module';

// Micro-Services
import { GetAllEnquiriesService } from './services/get-all-enquiries.service';
import { GetEnquiryService } from './services/get-enquiry.service';
import { UpdateEnquiryStatusService } from './services/update-enquiry-status.service';
import { AddFollowUpService } from './services/add-follow-up.service';

// Micro-Controllers
import { GetAllEnquiriesController } from './controllers/get-all-enquiries.controller';
import { GetEnquiryController } from './controllers/get-enquiry.controller';
import { UpdateEnquiryStatusController } from './controllers/update-enquiry-status.controller';
import { AddFollowUpController } from './controllers/add-follow-up.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Enquiry, User]), AuthAuthModule],
  providers: [
    GetAllEnquiriesService,
    GetEnquiryService,
    UpdateEnquiryStatusService,
    AddFollowUpService,
  ],
  controllers: [
    GetAllEnquiriesController,
    GetEnquiryController,
    UpdateEnquiryStatusController,
    AddFollowUpController,
  ],
})
export class ManagerEnquiriesModule {}
