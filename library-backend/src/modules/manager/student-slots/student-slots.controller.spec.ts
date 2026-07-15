import { Test, TestingModule } from '@nestjs/testing';
import { ManagerStudentSlotsController } from './student-slots.controller';

describe('ManagerStudentSlotsController', () => {
  let controller: ManagerStudentSlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerStudentSlotsController],
    }).compile();

    controller = module.get<ManagerStudentSlotsController>(ManagerStudentSlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
