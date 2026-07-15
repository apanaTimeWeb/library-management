import { Controller } from '@nestjs/common';
import { ManagerStudentReportsService } from './student-reports.service';

@Controller('api/manager/student-reports')
export class ManagerStudentReportsController {
  constructor(private readonly service: ManagerStudentReportsService) {}
}
