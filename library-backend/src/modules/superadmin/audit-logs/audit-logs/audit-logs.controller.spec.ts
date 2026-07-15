import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminAuditLogsController } from './audit-logs.controller';

describe('SuperadminAuditLogsController', () => {
  let controller: SuperadminAuditLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminAuditLogsController],
    }).compile();

    controller = module.get<SuperadminAuditLogsController>(
      SuperadminAuditLogsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
