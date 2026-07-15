import { Test, TestingModule } from '@nestjs/testing';
import { ManagerExpensesController } from './expenses.controller';

describe('ManagerExpensesController', () => {
  let controller: ManagerExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerExpensesController],
    }).compile();

    controller = module.get<ManagerExpensesController>(ManagerExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
