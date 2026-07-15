import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminPlansController } from './plans.controller';

describe('SuperadminPlansController', () => {
  let controller: SuperadminPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminPlansController],
    }).compile();

    controller = module.get<SuperadminPlansController>(
      SuperadminPlansController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
