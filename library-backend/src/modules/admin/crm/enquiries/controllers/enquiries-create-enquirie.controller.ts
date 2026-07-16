import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnquiriesCreateEnquirieService } from '../services/create-enquirie.service';

@ApiTags('Admin Enquiries')
@Controller('admin/enquiries')
export class EnquiriesCreateEnquirieController {
  constructor(private readonly service: EnquiriesCreateEnquirieService) {}

  // SLA: FAST
  @Post()
  async execute(): Promise<any> {
    return this.service.execute();
  }
}
