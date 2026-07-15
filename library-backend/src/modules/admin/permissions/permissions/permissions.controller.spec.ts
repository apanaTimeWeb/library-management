import { Test, TestingModule } from '@nestjs/testing';
import { AdminPermissionsController } from './permissions.controller';

describe('AdminPermissionsController', () => {
  let controller: AdminPermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPermissionsController],
    }).compile();

    controller = module.get<AdminPermissionsController>(
      AdminPermissionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
