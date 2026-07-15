import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminPaymentsService } from './payments.service';

describe('SuperadminPaymentsService', () => {
  let service: SuperadminPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminPaymentsService],
    }).compile();

    service = module.get<SuperadminPaymentsService>(SuperadminPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
