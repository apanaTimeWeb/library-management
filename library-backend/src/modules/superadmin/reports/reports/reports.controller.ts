import { Controller } from '@nestjs/common';
import { SuperadminReportsService } from './reports.service';

@Controller('api/superadmin/reports')
export class SuperadminReportsController {
  constructor(private readonly service: SuperadminReportsService) {}
}
