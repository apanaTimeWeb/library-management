import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminSeatsController } from './seats.controller';

describe('SuperadminSeatsController', () => {
  let controller: SuperadminSeatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminSeatsController],
    }).compile();

    controller = module.get<SuperadminSeatsController>(
      SuperadminSeatsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
