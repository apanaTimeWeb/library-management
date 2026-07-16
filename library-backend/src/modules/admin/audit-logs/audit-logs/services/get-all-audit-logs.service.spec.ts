import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetAllAuditLogsService } from './get-all-audit-logs.service';
import { AuditLog } from '@/core/entities/audit-log.entity';

describe('GetAllAuditLogsService', () => {
  let service: GetAllAuditLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllAuditLogsService,
        {
          provide: getRepositoryToken(AuditLog),
          useValue: { findAndCount: jest.fn() },
        }
      ],
    }).compile();

    service = module.get<GetAllAuditLogsService>(GetAllAuditLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
