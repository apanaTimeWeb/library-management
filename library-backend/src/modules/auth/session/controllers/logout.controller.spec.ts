import { ApiTags } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthLogoutController } from '@/modules/auth/session/controllers/auth-logout.controller';
import { AuthLogoutService } from '@/modules/auth/session/services/auth-logout.service';

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
