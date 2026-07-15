import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminSubscriptionsService } from './subscriptions.service';

describe('SuperadminSubscriptionsService', () => {
  let service: SuperadminSubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminSubscriptionsService],
    }).compile();

    service = module.get<SuperadminSubscriptionsService>(
      SuperadminSubscriptionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
