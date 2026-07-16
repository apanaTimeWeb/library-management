import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogsAdminService } from './audit-logs.service';

describe('AdminService', () => {
  let service: AuditLogsAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditLogsAdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
