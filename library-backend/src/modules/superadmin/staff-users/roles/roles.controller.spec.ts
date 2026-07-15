import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminRolesController } from './roles.controller';

describe('SuperadminRolesController', () => {
  let controller: SuperadminRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminRolesController],
    }).compile();

    controller = module.get<SuperadminRolesController>(SuperadminRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
