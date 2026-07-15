import { Test, TestingModule } from '@nestjs/testing';
import { AdminPaymentsService } from './payments.service';

describe('AdminPaymentsService', () => {
  let service: AdminPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminPaymentsService],
    }).compile();

    service = module.get<AdminPaymentsService>(AdminPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
