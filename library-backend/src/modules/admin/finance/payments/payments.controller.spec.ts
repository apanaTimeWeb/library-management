import { Test, TestingModule } from '@nestjs/testing';
import { AdminPaymentsController } from './payments.controller';

describe('AdminPaymentsController', () => {
  let controller: AdminPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPaymentsController],
    }).compile();

    controller = module.get<AdminPaymentsController>(AdminPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
