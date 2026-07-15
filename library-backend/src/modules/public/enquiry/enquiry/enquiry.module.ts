import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';

// Micro-Services
import { CreateEnquiryService } from './services/create-enquiry.service';

// Micro-Controllers
import { CreateEnquiryController } from './controllers/create-enquiry.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enquiry]),
  ],
  providers: [
    CreateEnquiryService,
  ],
  controllers: [
    CreateEnquiryController,
  ],
})
export class PublicEnquiryModule {}
