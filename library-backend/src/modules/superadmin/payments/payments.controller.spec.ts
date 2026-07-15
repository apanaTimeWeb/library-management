import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminPaymentsController } from './payments.controller';

describe('SuperadminPaymentsController', () => {
  let controller: SuperadminPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminPaymentsController],
    }).compile();

    controller = module.get<SuperadminPaymentsController>(SuperadminPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
