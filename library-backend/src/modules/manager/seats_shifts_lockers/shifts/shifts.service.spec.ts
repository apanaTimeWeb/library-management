import { Test, TestingModule } from '@nestjs/testing';
import { ManagerShiftsService } from './shifts.service';

describe('ManagerShiftsService', () => {
  let service: ManagerShiftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerShiftsService],
    }).compile();

    service = module.get<ManagerShiftsService>(ManagerShiftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
