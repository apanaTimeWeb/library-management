import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminComplaintsController } from './complaints.controller';

describe('SuperadminComplaintsController', () => {
  let controller: SuperadminComplaintsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminComplaintsController],
    }).compile();

    controller = module.get<SuperadminComplaintsController>(
      SuperadminComplaintsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
