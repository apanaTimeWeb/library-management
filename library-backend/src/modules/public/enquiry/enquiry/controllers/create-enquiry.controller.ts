import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { CreateEnquiryService } from '../services/create-enquiry.service';
import { CreateEnquiryDto } from '../dto/create-enquiry.dto';
import { Enquiry } from '@/core/entities/enquiry.entity';

@ApiTags('Public Enquiry')
@Controller('api/public/enquiry')
export class CreateEnquiryController {
  constructor(private readonly createEnquiryService: CreateEnquiryService) {}

  // SLA: FAST
  @Post()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Submit a new enquiry' })
  // SLA: STANDARD
  async create(@Body() createEnquiryDto: CreateEnquiryDto): Promise<Enquiry> {
    return this.createEnquiryService.create(createEnquiryDto);
  }
}
