import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuditLogsCreateService } from './audit-logs-create.service';
import { AuditLog } from '@/core/entities/audit-log.entity';

describe('AuditLogsCreateService', () => {
  let service: AuditLogsCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditLogsCreateService,
        {
          provide: getRepositoryToken(AuditLog),
          useValue: { create: jest.fn(), save: jest.fn() },
        }
      ],
    }).compile();

    service = module.get<AuditLogsCreateService>(AuditLogsCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
