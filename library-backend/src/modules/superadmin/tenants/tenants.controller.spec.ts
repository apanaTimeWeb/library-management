import { Test, TestingModule } from '@nestjs/testing';
import { SuperadminTenantsController } from './tenants.controller';

describe('SuperadminTenantsController', () => {
  let controller: SuperadminTenantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperadminTenantsController],
    }).compile();

    controller = module.get<SuperadminTenantsController>(SuperadminTenantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
