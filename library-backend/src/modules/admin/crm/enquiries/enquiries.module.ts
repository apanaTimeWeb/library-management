import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { User } from '@/core/entities/user.entity';

// Micro-Services
import { EnquiriesGetAllService } from './services/enquiries-get-all-enquiries.service';
import { EnquiriesGetEnquiryService } from './services/enquiries-get-enquiry.service';
import { EnquiriesUpdateEnquiryStatusService } from './services/enquiries-update-enquiry-status.service';
import { EnquiriesAddFollowUpService } from './services/enquiries-add-follow-up.service';

// Micro-Controllers
import { EnquiriesGetAllController } from './controllers/enquiries-get-all-enquiries.controller';
import { EnquiriesGetEnquiryController } from './controllers/enquiries-get-enquiry.controller';
import { EnquiriesUpdateEnquiryStatusController } from './controllers/enquiries-update-enquiry-status.controller';
import { EnquiriesAddFollowUpController } from './controllers/enquiries-add-follow-up.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Enquiry, User])],
  providers: [EnquiriesGetAllService, EnquiriesGetEnquiryService, EnquiriesUpdateEnquiryStatusService, EnquiriesAddFollowUpService, ],
  controllers: [EnquiriesGetAllController, EnquiriesGetEnquiryController, EnquiriesUpdateEnquiryStatusController, EnquiriesAddFollowUpController, ],
})
export class EnquiriesAdminModule {}
