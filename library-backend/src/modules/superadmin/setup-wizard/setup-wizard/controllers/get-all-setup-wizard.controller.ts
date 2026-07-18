import { Controller, Get, Query } from '@nestjs/common';
import { GetAllSetupWizardsService } from '../services/get-all-setup-wizard.service';
import { GetSetupWizardsQueryDto } from '../dto/get-setup-wizard-query.dto';

@Controller('api/v1/superadmin/setup-wizard')
export class GetAllSetupWizardsController {
  constructor(private readonly service: GetAllSetupWizardsService) {}

  @Get()
  async handle(@Query() query: GetSetupWizardsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'SetupWizards retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
