import { Test, TestingModule } from '@nestjs/testing';
import { AdminStudentsController } from './students.controller';

describe('AdminStudentsController', () => {
  let controller: AdminStudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminStudentsController],
    }).compile();

    controller = module.get<AdminStudentsController>(AdminStudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
