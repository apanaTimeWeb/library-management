import { Test, TestingModule } from '@nestjs/testing';
import { AdminAttendanceService } from './attendance.service';

describe('AdminAttendanceService', () => {
  let service: AdminAttendanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAttendanceService],
    }).compile();

    service = module.get<AdminAttendanceService>(AdminAttendanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
