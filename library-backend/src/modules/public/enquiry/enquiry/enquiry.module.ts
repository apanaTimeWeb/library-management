import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';

// Micro-Services
import { EnquiryCreateService } from '@/modules/public/enquiry/enquiry/services/enquiry-create.service';

// Micro-Controllers
import { EnquiryCreateController } from '@/modules/public/enquiry/enquiry/controllers/enquiry-create.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Enquiry])],
  providers: [EnquiryCreateService],
  controllers: [EnquiryCreateController],
})
export class PublicEnquiryModule {}
