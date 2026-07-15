import { Test, TestingModule } from '@nestjs/testing';
import { ManagerSeatsController } from './seats.controller';

describe('ManagerSeatsController', () => {
  let controller: ManagerSeatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerSeatsController],
    }).compile();

    controller = module.get<ManagerSeatsController>(ManagerSeatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
