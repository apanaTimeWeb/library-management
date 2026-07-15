import { Controller } from '@nestjs/common';
import { SuperadminSystemHealthService } from './system-health.service';

@Controller('api/superadmin/system-health')
export class SuperadminSystemHealthController {
  constructor(private readonly service: SuperadminSystemHealthService) {}
}
