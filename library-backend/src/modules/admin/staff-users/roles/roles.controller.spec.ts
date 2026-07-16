import { Test, TestingModule } from '@nestjs/testing';
import { RolesAdminController } from './roles.controller';

describe('AdminController', () => {
  let controller: RolesAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesAdminController],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
