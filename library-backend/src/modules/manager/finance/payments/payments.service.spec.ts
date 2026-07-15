import { Test, TestingModule } from '@nestjs/testing';
import { ManagerPaymentsService } from './payments.service';

describe('ManagerPaymentsService', () => {
  let service: ManagerPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerPaymentsService],
    }).compile();

    service = module.get<ManagerPaymentsService>(ManagerPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
