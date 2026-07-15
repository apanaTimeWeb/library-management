import { Test, TestingModule } from '@nestjs/testing';
import { GetAllExpensesService } from './get-all-expenses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Expense } from '@/core/entities/expense.entity';

describe('GetAllExpensesService', () => {
  let service: GetAllExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllExpensesService,
        {
          provide: getRepositoryToken(Expense),
          useValue: {
            findAndCount: jest.fn().mockResolvedValue([[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<GetAllExpensesService>(GetAllExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
