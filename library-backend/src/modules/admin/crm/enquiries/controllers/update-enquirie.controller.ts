import { Controller, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateEnquirieService } from '../services/update-enquirie.service';

@ApiTags('Admin Enquiries')
@Controller('api/admin/enquiries')
export class UpdateEnquirieController {
  constructor(private readonly service: UpdateEnquirieService) {}

  // SLA: FAST
  @Patch()
  async execute(): Promise<any> {
    return this.service.execute();
  }
}
