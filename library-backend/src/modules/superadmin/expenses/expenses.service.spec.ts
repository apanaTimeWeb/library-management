import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminExpensesService } from './expenses.service';

describe('SuperadminExpensesService', () => {
  let service: SuperadminExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminExpensesService],
    }).compile();

    service = module.get<SuperadminExpensesService>(SuperadminExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
