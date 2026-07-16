import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsAdminController } from './permissions.controller';

describe('AdminController', () => {
  let controller: PermissionsAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsAdminController],
    }).compile();

    controller = module.get<AdminController>(
      AdminController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
