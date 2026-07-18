import { Controller, Get } from '@nestjs/common';
import { FinancialReportsGetReportService } from '../services/financial-reports-get-report.service';

@Controller('admin/accounting/financial-reports')
export class FinancialReportsGetReportController {
  constructor(private readonly service: FinancialReportsGetReportService) {}

  @Get()
  async execute() {
    return this.service.execute();
  }
}