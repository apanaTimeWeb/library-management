import { Test, TestingModule } from '@nestjs/testing';
import { AdminShiftsController } from './shifts.controller';

describe('AdminShiftsController', () => {
  let controller: AdminShiftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminShiftsController],
    }).compile();

    controller = module.get<AdminShiftsController>(AdminShiftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
