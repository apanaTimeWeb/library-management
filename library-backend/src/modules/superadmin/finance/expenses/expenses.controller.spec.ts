import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminExpensesController } from './expenses.controller';

describe('SuperadminExpensesController', () => {
  let controller: SuperadminExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminExpensesController],
    }).compile();

    controller = module.get<SuperadminExpensesController>(
      SuperadminExpensesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
