import { Controller } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('api/manager/reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}
}
