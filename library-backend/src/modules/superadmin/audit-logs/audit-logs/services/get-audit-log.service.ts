import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '@/core/entities/audit-log.entity';
import { AuditLogNotFoundException } from '../exceptions/audit-logs.exceptions';

@Injectable()
export class GetAuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly repository: Repository<AuditLog>,
  ) {}

  async execute(id: string): Promise<AuditLog> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new AuditLogNotFoundException();
    return existing;
  }
}
