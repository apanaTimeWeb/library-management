import { Test, TestingModule } from '@nestjs/testing';
import { ManagerPaymentsController } from './payments.controller';

describe('ManagerPaymentsController', () => {
  let controller: ManagerPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerPaymentsController],
    }).compile();

    controller = module.get<ManagerPaymentsController>(
      ManagerPaymentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
