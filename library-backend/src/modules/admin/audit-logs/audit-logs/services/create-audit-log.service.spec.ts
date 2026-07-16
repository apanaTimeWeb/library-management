import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateAuditLogService } from './create-audit-log.service';
import { AuditLog } from '@/core/entities/audit-log.entity';

describe('CreateAuditLogService', () => {
  let service: CreateAuditLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAuditLogService,
        {
          provide: getRepositoryToken(AuditLog),
          useValue: { create: jest.fn(), save: jest.fn() },
        }
      ],
    }).compile();

    service = module.get<CreateAuditLogService>(CreateAuditLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
