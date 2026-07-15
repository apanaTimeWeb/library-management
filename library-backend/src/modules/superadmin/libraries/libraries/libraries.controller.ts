import { Controller } from '@nestjs/common';
import { SuperadminLibrariesService } from './libraries.service';

@Controller('api/superadmin/libraries')
export class SuperadminLibrariesController {
  constructor(private readonly service: SuperadminLibrariesService) {}
}
