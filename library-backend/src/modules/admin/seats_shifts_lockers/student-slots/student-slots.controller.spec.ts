import { Test, TestingModule } from '@nestjs/testing';
import { AdminStudentSlotsController } from './student-slots.controller';

describe('AdminStudentSlotsController', () => {
  let controller: AdminStudentSlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminStudentSlotsController],
    }).compile();

    controller = module.get<AdminStudentSlotsController>(
      AdminStudentSlotsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
