import { Test, TestingModule } from '@nestjs/testing';
import { AdminSeatsController } from './seats.controller';

describe('AdminSeatsController', () => {
  let controller: AdminSeatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminSeatsController],
    }).compile();

    controller = module.get<AdminSeatsController>(AdminSeatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
