import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEnquirieService } from '../services/create-enquirie.service';

@ApiTags('Admin Enquiries')
@Controller('api/admin/enquiries')
export class CreateEnquirieController {
  constructor(private readonly service: CreateEnquirieService) {}

  // SLA: FAST
  @Post()
  async execute(): Promise<any> {
    return this.service.execute();
  }
}
