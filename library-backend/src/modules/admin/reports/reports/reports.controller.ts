import { Controller } from '@nestjs/common';
import { ReportsAdminService } from './reports.service';

@Controller('admin/reports')
export class ReportsAdminController {
  constructor(private readonly service: ReportsAdminService) {}
}
