import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminStudentsController } from './students.controller';

describe('SuperadminStudentsController', () => {
  let controller: SuperadminStudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminStudentsController],
    }).compile();

    controller = module.get<SuperadminStudentsController>(SuperadminStudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
