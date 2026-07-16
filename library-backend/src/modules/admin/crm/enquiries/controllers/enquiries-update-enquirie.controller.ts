import { Controller, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnquiriesUpdateEnquirieService } from '../services/update-enquirie.service';

@ApiTags('Admin Enquiries')
@Controller('admin/enquiries')
export class EnquiriesUpdateEnquirieController {
  constructor(private readonly service: EnquiriesUpdateEnquirieService) {}

  // SLA: FAST
  @Patch()
  async execute(): Promise<any> {
    return this.service.execute();
  }
}
