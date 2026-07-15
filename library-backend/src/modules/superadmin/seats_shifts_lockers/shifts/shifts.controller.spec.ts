import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminShiftsController } from './shifts.controller';

describe('SuperadminShiftsController', () => {
  let controller: SuperadminShiftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminShiftsController],
    }).compile();

    controller = module.get<SuperadminShiftsController>(
      SuperadminShiftsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
