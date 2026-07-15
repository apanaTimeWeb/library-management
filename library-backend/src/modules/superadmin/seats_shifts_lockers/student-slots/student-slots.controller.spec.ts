import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminStudentSlotsController } from './student-slots.controller';

describe('SuperadminStudentSlotsController', () => {
  let controller: SuperadminStudentSlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminStudentSlotsController],
    }).compile();

    controller = module.get<SuperadminStudentSlotsController>(
      SuperadminStudentSlotsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
