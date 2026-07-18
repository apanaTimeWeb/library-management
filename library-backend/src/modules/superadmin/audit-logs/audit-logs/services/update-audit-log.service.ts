import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '@/core/entities/audit-log.entity';
import { UpdateAuditLogDto } from '../dto/update-audit-log.dto';
import { AuditLogNotFoundException } from '../exceptions/audit-logs.exceptions';

@Injectable()
export class UpdateAuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly repository: Repository<AuditLog>,
  ) {}

  async execute(id: string, dto: UpdateAuditLogDto): Promise<AuditLog> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new AuditLogNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
