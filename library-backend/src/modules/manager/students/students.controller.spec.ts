import { Test, TestingModule } from '@nestjs/testing';
import { ManagerStudentsController } from './students.controller';

describe('ManagerStudentsController', () => {
  let controller: ManagerStudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerStudentsController],
    }).compile();

    controller = module.get<ManagerStudentsController>(ManagerStudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
