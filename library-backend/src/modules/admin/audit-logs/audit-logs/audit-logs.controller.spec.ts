import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogsAdminController } from './audit-logs.controller';

describe('AdminController', () => {
  let controller: AuditLogsAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditLogsAdminController],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
