import { Test, TestingModule } from '@nestjs/testing';
import { AdminStudentSlotsService } from './student-slots.service';

describe('AdminStudentSlotsService', () => {
  let service: AdminStudentSlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminStudentSlotsService],
    }).compile();

    service = module.get<AdminStudentSlotsService>(AdminStudentSlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
