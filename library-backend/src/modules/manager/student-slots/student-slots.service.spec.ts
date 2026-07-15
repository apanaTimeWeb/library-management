import { Test, TestingModule } from '@nestjs/testing';
import { ManagerStudentSlotsService } from './student-slots.service';

describe('ManagerStudentSlotsService', () => {
  let service: ManagerStudentSlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerStudentSlotsService],
    }).compile();

    service = module.get<ManagerStudentSlotsService>(ManagerStudentSlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
