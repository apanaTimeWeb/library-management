import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { SecurityDepositsDeleteService } from '@/modules/manager/finance/security-deposits/services/security-deposits-delete.service';

@ApiTags('Security-deposits')
@Controller('api/v1/manager/security-deposits')
export class SecurityDepositsDeleteController {
  constructor(private readonly service: SecurityDepositsDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
