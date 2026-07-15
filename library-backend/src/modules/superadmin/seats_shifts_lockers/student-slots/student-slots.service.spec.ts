import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminStudentSlotsService } from './student-slots.service';

describe('SuperadminStudentSlotsService', () => {
  let service: SuperadminStudentSlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperadminStudentSlotsService],
    }).compile();

    service = module.get<SuperadminStudentSlotsService>(
      SuperadminStudentSlotsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
