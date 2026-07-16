import { Controller, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnquiriesDeleteEnquirieService } from '../services/delete-enquirie.service';

@ApiTags('Admin Enquiries')
@Controller('api/admin/enquiries')
export class EnquiriesDeleteEnquirieController {
  constructor(private readonly service: EnquiriesDeleteEnquirieService) {}

  // SLA: FAST
  @Delete()
  async execute(): Promise<any> {
    return this.service.execute();
  }
}
