import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminSubscriptionsController } from './subscriptions.controller';

describe('SuperadminSubscriptionsController', () => {
  let controller: SuperadminSubscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminSubscriptionsController],
    }).compile();

    controller = module.get<SuperadminSubscriptionsController>(
      SuperadminSubscriptionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
