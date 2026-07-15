import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminAuditLogsService } from './audit-logs.service';

describe('SuperadminAuditLogsService', () => {
  let service: SuperadminAuditLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminAuditLogsService],
    }).compile();

    service = module.get<SuperadminAuditLogsService>(SuperadminAuditLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
