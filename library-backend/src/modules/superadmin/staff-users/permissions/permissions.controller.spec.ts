import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminPermissionsController } from './permissions.controller';

describe('SuperadminPermissionsController', () => {
  let controller: SuperadminPermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminPermissionsController],
    }).compile();

    controller = module.get<SuperadminPermissionsController>(
      SuperadminPermissionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
