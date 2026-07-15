import { Test, TestingModule } from '@nestjs/testing';
import { AuthAuthController } from './auth.controller';

describe('AuthAuthController', () => {
  let controller: AuthAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthAuthController],
    }).compile();

    controller = module.get<AuthAuthController>(AuthAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
