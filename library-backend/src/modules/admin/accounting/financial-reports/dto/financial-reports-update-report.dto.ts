import { PartialType } from '@nestjs/swagger';
import { FinancialReportsCreateReportDto } from './financial-reports-create-report.dto';
export class FinancialReportsUpdateReportDto extends PartialType(FinancialReportsCreateReportDto) {}