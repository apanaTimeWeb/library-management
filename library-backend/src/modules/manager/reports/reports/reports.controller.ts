import { Controller } from '@nestjs/common';
import { ManagerReportsService } from './reports.service';

@Controller('api/manager/reports')
export class ManagerReportsController {
  constructor(private readonly service: ManagerReportsService) {}
}
