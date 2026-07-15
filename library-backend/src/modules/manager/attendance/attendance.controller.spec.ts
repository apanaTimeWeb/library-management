import { Test, TestingModule } from '@nestjs/testing';
import { ManagerAttendanceController } from './attendance.controller';

describe('ManagerAttendanceController', () => {
  let controller: ManagerAttendanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerAttendanceController],
    }).compile();

    controller = module.get<ManagerAttendanceController>(ManagerAttendanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
