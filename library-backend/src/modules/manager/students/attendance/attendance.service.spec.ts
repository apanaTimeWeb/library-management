import { Test, TestingModule } from '@nestjs/testing';
import { ManagerAttendanceService } from './attendance.service';

describe('ManagerAttendanceService', () => {
  let service: ManagerAttendanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerAttendanceService],
    }).compile();

    service = module.get<ManagerAttendanceService>(ManagerAttendanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
