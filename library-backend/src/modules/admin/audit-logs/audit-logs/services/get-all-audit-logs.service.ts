import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { AuditLog } from '@/core/entities/audit-log.entity';
import { GetAuditLogsQueryDto } from '../dto/get-audit-logs-query.dto';

@Injectable()
export class GetAllAuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly repository: Repository<AuditLog>,
  ) {}

  async execute(queryDto: GetAuditLogsQueryDto): Promise<{ items: AuditLog[]; total: number }> {
    const { page = 1, limit = 50, tenantId, entity, action } = queryDto;
    
    const where: FindOptionsWhere<AuditLog> = {};
    if (tenantId) where.tenantId = tenantId;
    if (entity) where.entity = entity;
    if (action) where.action = action;

    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    
    return { items, total };
  }
}
