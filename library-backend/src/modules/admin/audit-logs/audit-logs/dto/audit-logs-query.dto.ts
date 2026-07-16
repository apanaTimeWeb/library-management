import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AUDIT_LOGS_CONSTANTS } from '@/modules/admin/audit-logs/audit-logs/constants/audit-logs.constants';

export class AuditLogsQueryDto {
  @ApiProperty({ required: false, description: 'Page number for pagination', example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = AUDIT_LOGS_CONSTANTS.DEFAULT_PAGE;

  @ApiProperty({ required: false, description: 'Items per page', example: 50 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = AUDIT_LOGS_CONSTANTS.DEFAULT_LIMIT;

  @ApiProperty({ required: false, description: 'Filter by Tenant ID', example: 'tenant-123' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ required: false, description: 'Filter by Entity name', example: 'User' })
  @IsOptional()
  @IsString()
  entity?: string;

  @ApiProperty({ required: false, description: 'Filter by Action', example: 'CREATE' })
  @IsOptional()
  @IsString()
  action?: string;
}
