import { Test, TestingModule } from '@nestjs/testing';
import { AdminSubscriptionsController } from './subscriptions.controller';

describe('AdminSubscriptionsController', () => {
  let controller: AdminSubscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminSubscriptionsController],
    }).compile();

    controller = module.get<AdminSubscriptionsController>(
      AdminSubscriptionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
