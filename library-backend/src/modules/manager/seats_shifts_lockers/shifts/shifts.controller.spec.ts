import { Test, TestingModule } from '@nestjs/testing';
import { ManagerShiftsController } from './shifts.controller';

describe('ManagerShiftsController', () => {
  let controller: ManagerShiftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerShiftsController],
    }).compile();

    controller = module.get<ManagerShiftsController>(ManagerShiftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
