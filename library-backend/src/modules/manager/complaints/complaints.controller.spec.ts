import { Test, TestingModule } from '@nestjs/testing';
import { ManagerComplaintsController } from './complaints.controller';

describe('ManagerComplaintsController', () => {
  let controller: ManagerComplaintsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerComplaintsController],
    }).compile();

    controller = module.get<ManagerComplaintsController>(ManagerComplaintsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
