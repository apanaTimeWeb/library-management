import { Controller, Delete } from '@nestjs/common';
import { FinancialReportsDeleteReportService } from '../services/financial-reports-delete-report.service';

@Controller('admin/accounting/financial-reports')
export class FinancialReportsDeleteReportController {
  constructor(private readonly service: FinancialReportsDeleteReportService) {}

  @Delete()
  async execute() {
    return this.service.execute();
  }
}