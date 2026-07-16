import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnquiriesGetEnquirieService } from '../services/get-enquirie.service';

@ApiTags('Admin Enquiries')
@Controller('admin/enquiries')
export class EnquiriesGetEnquirieController {
  constructor(private readonly service: EnquiriesGetEnquirieService) {}

  // SLA: FAST
  @Get()
  async execute(): Promise<any> {
    return this.service.execute();
  }
}
