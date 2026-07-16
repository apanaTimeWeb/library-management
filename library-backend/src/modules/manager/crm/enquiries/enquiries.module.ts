import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';

import { EnquiriesCreateEnquiryController } from '@/modules/manager/crm/enquiries/controllers/enquiries-create-enquiry.controller';
import { EnquiriesUpdateEnquiryController } from '@/modules/manager/crm/enquiries/controllers/enquiries-update-enquiry.controller';
import { EnquiriesDeleteEnquiryController } from '@/modules/manager/crm/enquiries/controllers/enquiries-delete-enquiry.controller';
import { EnquiriesGetAllController } from '@/modules/manager/crm/enquiries/controllers/enquiries-get-all.controller';
import { EnquiriesGetEnquiryController } from '@/modules/manager/crm/enquiries/controllers/enquiries-get-enquiry.controller';

import { EnquiriesCreateEnquiryService } from '@/modules/manager/crm/enquiries/services/enquiries-create-enquiry.service';
import { EnquiriesUpdateEnquiryService } from '@/modules/manager/crm/enquiries/services/enquiries-update-enquiry.service';
import { EnquiriesDeleteEnquiryService } from '@/modules/manager/crm/enquiries/services/enquiries-delete-enquiry.service';
import { EnquiriesGetAllService } from '@/modules/manager/crm/enquiries/services/enquiries-get-all.service';
import { EnquiriesGetEnquiryService } from '@/modules/manager/crm/enquiries/services/enquiries-get-enquiry.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enquiry])],
  controllers: [
    EnquiriesCreateEnquiryController,
    EnquiriesUpdateEnquiryController,
    EnquiriesDeleteEnquiryController,
    EnquiriesGetAllController,
    EnquiriesGetEnquiryController,
  ],
  providers: [
    EnquiriesCreateEnquiryService,
    EnquiriesUpdateEnquiryService,
    EnquiriesDeleteEnquiryService,
    EnquiriesGetAllService,
    EnquiriesGetEnquiryService,
  ],
  exports: [EnquiriesGetEnquiryService],
})
export class ManagerEnquiriesModule {}
