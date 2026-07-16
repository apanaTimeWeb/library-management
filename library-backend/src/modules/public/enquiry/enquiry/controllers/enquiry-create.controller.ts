import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { EnquiryCreateService } from '@/modules/public/enquiry/enquiry/services/enquiry-create.service';
import { EnquiryCreateDto } from '@/modules/public/enquiry/enquiry/dto/enquiry-create.dto';
import { Enquiry } from '@/core/entities/enquiry.entity';

@ApiTags('Public Enquiry')
@Controller('api/v1/public/enquiry')
export class EnquiryCreateController {
  constructor(private readonly enquiryCreateService: EnquiryCreateService) {}

  // SLA: FAST
  @Post()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Submit a new enquiry' })
  // SLA: STANDARD
  async create(@Body() enquiryCreateDto: EnquiryCreateDto): Promise<Enquiry> {
    return this.enquiryCreateService.create(enquiryCreateDto);
  }
}
