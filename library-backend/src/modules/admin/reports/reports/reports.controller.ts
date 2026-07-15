import { Controller } from '@nestjs/common';
import { AdminReportsService } from './reports.service';

@Controller('api/admin/reports')
export class AdminReportsController {
  constructor(private readonly service: AdminReportsService) {}
}
