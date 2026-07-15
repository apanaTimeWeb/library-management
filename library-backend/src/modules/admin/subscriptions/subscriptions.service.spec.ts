import { Test, TestingModule } from '@nestjs/testing';
import { AdminSubscriptionsService } from './subscriptions.service';

describe('AdminSubscriptionsService', () => {
  let service: AdminSubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminSubscriptionsService],
    }).compile();

    service = module.get<AdminSubscriptionsService>(AdminSubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
