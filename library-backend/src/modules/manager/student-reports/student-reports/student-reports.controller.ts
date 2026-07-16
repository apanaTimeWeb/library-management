import { Controller } from '@nestjs/common';
import { StudentReportsService } from './student-reports.service';

@Controller('api/manager/student-reports')
export class StudentReportsController {
  constructor(private readonly service: StudentReportsService) {}
}
