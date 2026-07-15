import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetEnquirieService } from '../services/get-enquirie.service';

@ApiTags('Admin Enquiries')
@Controller('api/admin/enquiries')
export class GetEnquirieController {
  constructor(private readonly service: GetEnquirieService) {}

  // SLA: FAST
  @Get()
  async execute(): Promise<any> {
    return this.service.execute();
  }
}
