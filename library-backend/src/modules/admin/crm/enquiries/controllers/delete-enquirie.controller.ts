import { Controller, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteEnquirieService } from '../services/delete-enquirie.service';

@ApiTags('Admin Enquiries')
@Controller('api/admin/enquiries')
export class DeleteEnquirieController {
  constructor(private readonly service: DeleteEnquirieService) {}

  // SLA: FAST
  @Delete()
  async execute(): Promise<any> {
    return this.service.execute();
  }
}
