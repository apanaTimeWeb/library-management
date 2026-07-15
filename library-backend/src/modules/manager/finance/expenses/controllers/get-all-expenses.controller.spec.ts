import { Test, TestingModule } from '@nestjs/testing';
import { GetAllExpensesController } from './get-all-expenses.controller';
import { GetAllExpensesService } from '../services/get-all-expenses.service';

describe('GetAllExpensesController', () => {
  let controller: GetAllExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllExpensesController],
      providers: [
        {
          provide: GetAllExpensesService,
          useValue: {
            findAllByBranch: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GetAllExpensesController>(GetAllExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
