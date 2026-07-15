import { Controller } from '@nestjs/common';
import { SuperadminBillingService } from './billing.service';

@Controller('api/superadmin/billing')
export class SuperadminBillingController {
  constructor(private readonly service: SuperadminBillingService) {}
}
