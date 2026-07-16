import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '@/core/entities/audit-log.entity';
import { CreateAuditLogDto } from '../dto/create-audit-log.dto';

@Injectable()
export class CreateAuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly repository: Repository<AuditLog>,
  ) {}

  async execute(dto: CreateAuditLogDto): Promise<AuditLog> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
