import { Controller } from '@nestjs/common';
import { StudentDashboardService } from './student-dashboard.service';

@Controller('api/manager/student-dashboard')
export class StudentDashboardController {
  constructor(private readonly service: StudentDashboardService) {}
}
