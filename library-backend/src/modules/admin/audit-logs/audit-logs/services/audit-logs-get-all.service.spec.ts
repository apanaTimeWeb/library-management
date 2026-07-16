import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuditLogsGetAllService } from './audit-logs-get-all.service';
import { AuditLog } from '@/core/entities/audit-log.entity';

describe('AuditLogsGetAllService', () => {
  let service: AuditLogsGetAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditLogsGetAllService,
        {
          provide: getRepositoryToken(AuditLog),
          useValue: { findAndCount: jest.fn() },
        }
      ],
    }).compile();

    service = module.get<AuditLogsGetAllService>(AuditLogsGetAllService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
