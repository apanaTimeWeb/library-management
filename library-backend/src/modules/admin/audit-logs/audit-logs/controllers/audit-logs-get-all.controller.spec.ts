import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogsGetAllController } from './audit-logs-get-all.controller';
import { AuditLogsGetAllService } from '../services/audit-logs-get-all.service';

describe('AuditLogsGetAllController', () => {
  let controller: AuditLogsGetAllController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditLogsGetAllController],
      providers: [
        {
          provide: AuditLogsGetAllService,
          useValue: { execute: jest.fn() },
        }
      ],
    }).compile();

    controller = module.get<AuditLogsGetAllController>(AuditLogsGetAllController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
