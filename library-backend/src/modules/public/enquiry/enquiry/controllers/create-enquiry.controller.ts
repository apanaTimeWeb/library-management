import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateEnquiryService } from '../services/create-enquiry.service';
import { CreateEnquiryDto } from '../dto/create-enquiry.dto';

@ApiTags('Public Enquiry')
@Controller('api/public/enquiry')
export class CreateEnquiryController {
  constructor(private readonly createEnquiryService: CreateEnquiryService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new enquiry' })
  async create(@Body() createEnquiryDto: CreateEnquiryDto) {
    return this.createEnquiryService.create(createEnquiryDto);
  }
}
