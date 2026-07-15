import { Test, TestingModule } from '@nestjs/testing';
import { ManagerExpensesService } from './expenses.service';

describe('ManagerExpensesService', () => {
  let service: ManagerExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerExpensesService],
    }).compile();

    service = module.get<ManagerExpensesService>(ManagerExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
