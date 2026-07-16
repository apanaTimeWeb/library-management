import { Test, TestingModule } from '@nestjs/testing';
import { GetAllAuditLogsController } from './get-all-audit-logs.controller';
import { GetAllAuditLogsService } from '../services/get-all-audit-logs.service';

describe('GetAllAuditLogsController', () => {
  let controller: GetAllAuditLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllAuditLogsController],
      providers: [
        {
          provide: GetAllAuditLogsService,
          useValue: { execute: jest.fn() },
        }
      ],
    }).compile();

    controller = module.get<GetAllAuditLogsController>(GetAllAuditLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
