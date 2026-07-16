import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnquiriesGetAllService } from '../services/get-all-enquiries.service';

@ApiTags('Admin Enquiries')
@Controller('admin/enquiries')
export class EnquiriesGetAllController {
  constructor(private readonly service: EnquiriesGetAllService) {}

  // SLA: FAST
  @Get()
  async execute(): Promise<any> {
    return this.service.execute();
  }
}
