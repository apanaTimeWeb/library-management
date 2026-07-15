import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { AdminAuditLogsService } from './audit-logs.service';
import { JwtAuthGuard } from '@/modules/auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/auth/guards/roles.guard';
import { Roles } from '@/modules/auth/auth/decorators/roles.decorator';

@ApiTags('Audit Logs')
@ApiBearerAuth()
@Controller('api/admin/audit-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin')
export class AdminAuditLogsController {
  constructor(private readonly auditLogsService: AdminAuditLogsService) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated audit logs (superadmin only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'tenantId', required: false, type: String })
  @ApiQuery({ name: 'entity', required: false, type: String })
  @ApiQuery({ name: 'action', required: false, type: String })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('tenantId') tenantId?: string,
    @Query('entity') entity?: string,
    @Query('action') action?: string,
  ): Promise<any> {
    // Cap limit to 100 max to prevent large data dumps
    const safeLimit = Math.min(limit, 100);
    return this.auditLogsService.findAll(
      page,
      safeLimit,
      tenantId,
      entity,
      action,
    );
  }
}
