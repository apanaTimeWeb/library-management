import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { User } from '@/core/entities/user.entity';

// Micro-Services
import { EnquiriesGetAllService } from './services/get-all-enquiries.service';
import { EnquiriesGetEnquiryService } from './services/get-enquiry.service';
import { EnquiriesUpdateEnquiryStatusService } from './services/update-enquiry-status.service';
import { EnquiriesAddFollowUpService } from './services/add-follow-up.service';

// Micro-Controllers
import { EnquiriesGetAllController } from './controllers/get-all-enquiries.controller';
import { EnquiriesGetEnquiryController } from './controllers/get-enquiry.controller';
import { EnquiriesUpdateEnquiryStatusController } from './controllers/update-enquiry-status.controller';
import { EnquiriesAddFollowUpController } from './controllers/add-follow-up.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Enquiry, User])],
  providers: [EnquiriesGetAllService, EnquiriesGetEnquiryService, EnquiriesUpdateEnquiryStatusService, EnquiriesAddFollowUpService, ],
  controllers: [EnquiriesGetAllController, EnquiriesGetEnquiryController, EnquiriesUpdateEnquiryStatusController, EnquiriesAddFollowUpController, ],
})
export class EnquiriesAdminModule {}
