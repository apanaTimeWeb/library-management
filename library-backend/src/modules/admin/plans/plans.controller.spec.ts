import { Test, TestingModule } from '@nestjs/testing';
import { AdminPlansController } from './plans.controller';

describe('AdminPlansController', () => {
  let controller: AdminPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPlansController],
    }).compile();

    controller = module.get<AdminPlansController>(AdminPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
