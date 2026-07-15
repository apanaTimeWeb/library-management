import { Test, TestingModule } from '@nestjs/testing';
import { AdminShiftsService } from './shifts.service';

describe('AdminShiftsService', () => {
  let service: AdminShiftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminShiftsService],
    }).compile();

    service = module.get<AdminShiftsService>(AdminShiftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
