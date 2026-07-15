import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminShiftsService } from './shifts.service';

describe('SuperadminShiftsService', () => {
  let service: SuperadminShiftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminShiftsService],
    }).compile();

    service = module.get<SuperadminShiftsService>(SuperadminShiftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
