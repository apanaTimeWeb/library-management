import { Controller, Patch } from '@nestjs/common';
import { FinancialReportsUpdateReportService } from '../services/financial-reports-update-report.service';

@Controller('admin/accounting/financial-reports')
export class FinancialReportsUpdateReportController {
  constructor(private readonly service: FinancialReportsUpdateReportService) {}

  @Patch()
  async execute() {
    return this.service.execute();
  }
}