import { Test, TestingModule } from '@nestjs/testing';
import { AuthLogoutController } from './auth-logout.controller';
import { AuthLogoutService } from '../services/auth-logout.service';

describe('AuthLogoutController', () => {
  let controller: AuthLogoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthLogoutController],
      providers: [
        {
          provide: AuthLogoutService,
          useValue: {
            logout: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthLogoutController>(AuthLogoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
