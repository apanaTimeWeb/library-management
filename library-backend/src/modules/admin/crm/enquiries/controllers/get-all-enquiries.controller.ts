import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllEnquiriesService } from '../services/get-all-enquiries.service';

@ApiTags('Admin Enquiries')
@Controller('api/admin/enquiries')
export class GetAllEnquiriesController {
  constructor(private readonly service: GetAllEnquiriesService) {}

  // SLA: FAST
  @Get()
  async execute(): Promise<any> {
    return this.service.execute();
  }
}
