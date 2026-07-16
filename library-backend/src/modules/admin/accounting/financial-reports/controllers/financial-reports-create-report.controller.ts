import { Controller, Post } from '@nestjs/common';
import { FinancialReportsCreateReportService } from '../services/financial-reports-create-report.service';

@Controller('admin/accounting/financial-reports')
export class FinancialReportsCreateReportController {
  constructor(private readonly service: FinancialReportsCreateReportService) {}

  @Post()
  async execute() {
    return this.service.execute();
  }
}