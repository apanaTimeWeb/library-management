import { Controller } from '@nestjs/common';
import { ManagerStudentDashboardService } from './student-dashboard.service';

@Controller('api/manager/student-dashboard')
export class ManagerStudentDashboardController {
  constructor(private readonly service: ManagerStudentDashboardService) {}
}
