import { Controller, Get } from '@nestjs/common';
import { FinancialReportsGetAllReportsService } from '../services/financial-reports-get-all-reports.service';

@Controller('admin/accounting/financial-reports')
export class FinancialReportsGetAllReportsController {
  constructor(private readonly service: FinancialReportsGetAllReportsService) {}

  @Get()
  async execute() {
    return this.service.execute();
  }
}